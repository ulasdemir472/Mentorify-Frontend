export async function POST(request) {
  const reqdata = await request.json();

  const externalResponse = await fetch(
    process.env.SECRET_API + "/api/v1/mentees/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqdata),
    }
  );

  const data = await externalResponse.json();

  if (data.status === 200) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}
