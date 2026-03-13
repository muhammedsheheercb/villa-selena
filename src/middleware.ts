import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const allowedOrigins = [
    baseUrl,
    "http://localhost:3000",
    "http://localhost:3001",
  ];

  const isAllowedOrigin = !origin || allowedOrigins.includes(origin);

  if (!isAllowedOrigin) {
    return new NextResponse(null, {
      status: 403,
      statusText: "Forbidden",
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
