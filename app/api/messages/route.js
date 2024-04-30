export async function POST(request) {
  const reqdata = await request.json();
  const { searchParams } = new URL(request.url);
  const recieverId = searchParams.get("recieverId");
  console.log(recieverId);
  console.log(reqdata);
  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/messages/send/${recieverId}`,
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const recieverId = searchParams.get("recieverId");
  console.log(recieverId);
  const senderId = searchParams.get("senderId");
  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/messages/${recieverId}/${senderId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: String(request.headers.get("authorization")),
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
