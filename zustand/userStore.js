import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserInfo: async (id) => {
    if (!id) return set({ currentUser: null });

    try {
      const response = await fetch(
        `http://localhost:8800/api/v1/mentors/${id}`,
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
