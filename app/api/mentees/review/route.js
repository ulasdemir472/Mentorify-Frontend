export async function POST(request) {
  const reqdata = await request.json();
  const { searchParams } = new URL(request.url);

  const menteeId = searchParams.get("menteeId");
  const mentorId = searchParams.get("mentorId");

  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/mentees/${menteeId}/reviews/${mentorId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqdata),
    }
  );

  const data = await externalResponse.json();

  if (externalResponse.ok) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}
