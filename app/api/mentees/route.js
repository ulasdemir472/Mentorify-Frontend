export async function PATCH(request) {
  const reqdata = await request.formData();
  const { searchParams } = new URL(request.url);

  console.log(reqdata);

  const role = searchParams.get("role");
  const id = searchParams.get("id");

  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/${role}/update/${id}`,
    {
      method: "PATCH",
      body: reqdata,
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
    process.env.SECRET_API + "/api/v1/mentees",
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
