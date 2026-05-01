import { useUserStore } from "@/zustand/userStore";
export const authorizeMentee = async (credentials) => {
  const fetchUserInfo = useUserStore.getState().fetchUserInfo;

  const response = await fetch("/api/auth/login/mentee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (data.success) {
    const token = data.data;
    const session_user = {
      id: data.userId,
      role: data.userRole,
      data: data.data,
    };
    await fetchUserInfo(session_user.id, session_user.role);
    return { user: session_user, status: data.success, token };
  } else {
    // Hata objesini de dönüyoruz
    return { status: data.success, error: data.error };
  }
};

export const googleLogin = () => {
  window.open(
    "/api/v1/mentees/auth/google/callback",
    "_self"
  );

  // if (data.success) {
  //   const token = data.data;
  //   const session_user = {
  //     id: data.userId,
  //     role: data.userRole,
  //     data: data.data,
  //   };
  //   return { user: session_user, status: data.success, token };
  // } else {
  //   return { status: data.success };
  // }
};
