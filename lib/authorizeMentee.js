import { useUserStore } from "@/zustand/userStore";
export const authorizeMentee = async (credentials) => {
  const fetchUserInfo = useUserStore.getState().fetchUserInfo;

  const response = await fetch(`${process.env.SECRET_API}/api/v1/mentees/login`, {
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
    return { status: data.success };
  }
};

export const googleLogin = () => {
  window.open(
    `${process.env.SECRET_API}/api/v1/mentees/auth/google/callback`,
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
