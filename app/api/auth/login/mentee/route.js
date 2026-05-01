export async function POST(request) {
  const reqdata = await request.json();

  const externalResponse = await fetch(
    process.env.SECRET_API + "/api/v1/mentees/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqdata),
    }
  );

  const data = await externalResponse.json();
  return new Response(JSON.stringify(data), {
    status: externalResponse.status,
  });
}
