export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const menteeId = searchParams.get("menteeId");
  const mentorId = searchParams.get("mentorId");

  const externalResponse = await fetch(
    process.env.SECRET_API +
      `/api/v1/mentees/add-to-wishlist/${menteeId}/${mentorId}`,
    {
      method: "PUT",
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
  const menteeId = searchParams.get("menteeId");

  const externalResponse = await fetch(
    process.env.SECRET_API + `/api/v1/mentees/wishlist/${menteeId}`,
    {
      headers: {
        "Content-Type": "application/json",
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

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const menteeId = searchParams.get("menteeId");
  const mentorId = searchParams.get("mentorId");

  const externalResponse = await fetch(
    process.env.SECRET_API +
      `/api/v1/mentees/remove-from-wishlist/${menteeId}/${mentorId}`,
    {
      method: "DELETE",
    }
  );

  const data = await externalResponse.json();

  if (data.status === 200) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}
