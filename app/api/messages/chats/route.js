export async function GET(request) {
    const { searchParams } = new URL(request.url)
   
    const id = searchParams.get("id");
    const externalResponse = await fetch(
        process.env.SECRET_API + `/api/v1/messages/${id}`,
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