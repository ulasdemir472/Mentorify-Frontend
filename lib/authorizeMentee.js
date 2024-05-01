export const authorizeMentee = async (credentials) => {
  const response = await fetch(
    process.env.SECRET_API + `/api/v1/mentees/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );

  const data = await response.json();

  if (data.success) {
    const token = data.data;
    const session_user = {
      id: data.userId,
      role: data.userRole,
      data: data.data,
    };
    return { user: session_user, status: data.success, token };
  } else {
    return { status: data.success };
  }
};
