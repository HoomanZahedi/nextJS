import { NextRequest, NextResponse } from "next/server";
import * as Jose from "jose";
import jwt from "jsonwebtoken";

export async function middleware(req: NextResponse, res: NextRequest) {
  const bearerToken: string = req.headers.get("authorization") as string;
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "UnAuthorized User!" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];
  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "invalid token!" }),
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await Jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "invalid token!" }),
      { status: 401 }
    );
  }
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "UnAuthorized User!" }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
