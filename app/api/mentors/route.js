export async function PATCH(request) {
  const reqdata = await request.formData();
  const { searchParams } = new URL(request.url);

  const role = searchParams.get("role");
  const id = searchParams.get("id");

  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/${role}/${id}`,
    {
      method: "PATCH",
      body: reqdata,
    }
  );

  const data = await externalResponse.json();

  if (externalResponse.ok) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}

export async function GET(request) {
  const externalResponse = await fetch(
    process.env.SECRET_API + "/api/v1/mentors",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: String(request.headers.get("authorization")),
      },
    }
  );
  const data = await externalResponse.json();
  if (externalResponse.ok) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}
