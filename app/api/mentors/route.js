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

export async function PATCH(request) {
  const reqdata = await request.json();
  const { searchParams } = new URL(request.url);

  const externalResponse = await fetch(
    process.env.SECRET_API +
      "/api/admin/hotels/item/category?" +
      searchParams.toString(),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(request.headers.get("authorization")),
      },
      body: JSON.stringify(reqdata),
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
    process.env.SECRET_API +
      "/api/admin/hotels/item/category?" +
      searchParams.toString(),
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
