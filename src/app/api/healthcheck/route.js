export async function GET(req) {
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Website app is healthy and is running",
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}
