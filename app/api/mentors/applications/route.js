export async function POST(request) {
  const reqdata = await request.json();
  const { searchParams } = new URL(request.url);
  const menteeId = searchParams.get("menteeId");

  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/mentors/applications/${menteeId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mentorId = searchParams.get("mentorId");

  const externalResponse = await fetch(
    process.env.SECRET_API + "/api/v1/mentors/applicants/" + mentorId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await externalResponse.json();
  console.log(data);
  if (externalResponse.ok) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);

  const externalResponse = await fetch(
    process.env.SECRET_API + "/api" + searchParams.toString(),
    {
      method: "DELETE",
      headers: {
        Authorization: String(request.headers.get("authorization")),
      },
    }
  );

  const data = await externalResponse.json();

  return new Response(JSON.stringify(data));
}
