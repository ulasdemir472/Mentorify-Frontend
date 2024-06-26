import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserInfo: async (id, role) => {
    if (!id) return set({ currentUser: null });

    try {
      const response = await fetch(
        `${process.env.SECRET_API}/api/v1/${role}s/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();
      if (res.success) {
        return set({ currentUser: res.data });
      } else {
        return set({ currentUser: null });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null });
    }
  },
}));
