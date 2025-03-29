// middleware/auth.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  // add other fields if needed
}

export function verifyAuth(req: Request): TokenPayload | NextResponse {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    return decoded;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
