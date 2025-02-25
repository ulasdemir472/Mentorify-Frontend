export async function POST(request) {
  try {
    // Gelen JSON isteğini al
    const reqdata = await request.json();

    // Flask API'ye POST isteği gönder
    const externalResponse = await fetch(`${process.env.FLASK_API}/recommend`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqdata),
    });

    // Flask API'nin cevabını JSON olarak al
    const data = await externalResponse.json();

    // Eğer istek başarılıysa, veriyi döndür
    if (externalResponse.ok) {
      return new Response(JSON.stringify(data), {
        status: externalResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Flask API hata döndürdüyse, hata mesajını geri döndür
      return new Response(JSON.stringify({ error: "API error", details: data }), {
        status: externalResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    // Flask API'ye ulaşılamazsa veya başka bir hata olursa
    return new Response(JSON.stringify({ error: "Network error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
