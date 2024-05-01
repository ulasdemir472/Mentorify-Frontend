export const authorize = async (credentials) => {
  const response = await fetch(`http://localhost:8800/api/v1/mentors/login`, {
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
    return { user: session_user, status: data.success, token };
  } else {
    return { status: data.success };
  }
};
