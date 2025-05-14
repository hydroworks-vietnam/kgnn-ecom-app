import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const imageUrl = new URL(request.url).searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing URL", { status: 400 });
  }

  try {
    const remoteResponse = await fetch(imageUrl);
    if (!remoteResponse.ok) throw new Error("Failed to fetch remote image");

    const contentType = remoteResponse.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await remoteResponse.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Proxy fetch failed", { status: 500 });
  }
};
