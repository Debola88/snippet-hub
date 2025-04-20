import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export interface TokenPayload {
  userId: string;
}

export function verifyAuth(req: NextRequest): 
  | TokenPayload
  | { status: number; error: string } 
{
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return { status: 500, error: "Server configuration error" };
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { status: 401, error: "Missing or invalid Authorization header" };
  }

  const token = authHeader.split(" ")[1].trim();
  if (!token) {
    return { status: 401, error: "Token not found" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return { status: 401, error: "Invalid user ID format in token" };
    }

    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    
    let errorMessage = "Invalid token";
    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Invalid token signature";
    }

    return { status: 401, error: errorMessage };
  }
}