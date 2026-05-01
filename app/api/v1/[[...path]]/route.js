import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return proxyRequest(request, params, 'GET');
}

export async function POST(request, { params }) {
  return proxyRequest(request, params, 'POST');
}

export async function PUT(request, { params }) {
  return proxyRequest(request, params, 'PUT');
}

export async function PATCH(request, { params }) {
  return proxyRequest(request, params, 'PATCH');
}

export async function DELETE(request, { params }) {
  return proxyRequest(request, params, 'DELETE');
}

async function proxyRequest(request, params, method) {
  const path = params.path ? params.path.join('/') : '';
  const searchParams = new URL(request.url).search;
  const backendUrl = `${process.env.SECRET_API}/api/v1/${path}${searchParams}`;

  const headers = new Headers(request.headers);
  headers.delete('host'); // Let fetch handle the host header

  let body;
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      body = await request.text();
    } catch (e) {
      // No body or error reading body
    }
  }

  try {
    const response = await fetch(backendUrl, {
      method,
      headers,
      body,
      cache: 'no-store'
    });

    const data = await response.text();
    
    // Return the response with same status and headers
    const nextResponse = new NextResponse(data, {
      status: response.status,
      headers: response.headers
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 });
  }
}
