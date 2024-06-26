export async function POST(request) {
  const reqdata = await request.json();
  const externalResponse = await fetch("http://localhost:5000/recommend", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(reqdata),
  });
  const data = await externalResponse.json();
  if (externalResponse.ok) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify(data));
  }
}
