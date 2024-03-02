export const authorize = async (credentials) => {
  // const response = await fetch(`/api/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(credentials),
  // });

  // const data = await response.json();

  // if (data.status === 200) {
  //   const token = data.body.token;
  //   const session_user = data.body;
  //   return { user: session_user, status: response.status };
  // } else {
  //   return { status: data.status };
  // }
  return { user: { name: "ulas" }, status: 200 };
};
