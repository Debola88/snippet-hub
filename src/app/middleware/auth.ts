import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import { NextResponse } from "next/server";

export interface TokenPayload {
  userId: string;
}

export function verifyAuth(req: NextRequest): TokenPayload | { error: string } {
  // 1. Get token from Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing or invalid Authorization header" };
  }

  // 2. Extract token
  const token = authHeader.split(" ")[1].trim();
  if (!token) {
    return { error: "Token not found" };
  }

  try {
    // 3. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    
    // 4. Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return { error: "Invalid user ID format in token" };
    }

    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    return { error: "Invalid or expired token" };
  }
}