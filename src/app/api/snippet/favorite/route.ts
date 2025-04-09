import { TokenPayload, verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  await dbConnect();

  const authResult = verifyAuth(req);
  if ("error" in authResult) return authResult;

  const { userId } = authResult as TokenPayload;

  try {
    const favorites = await Snippet.find({ favoritedBy: userId }).sort({ updatedAt: -1 });
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Get favorites error:", error);
    return NextResponse.json({ error: "Failed to load favorites" }, { status: 500 });
  }
}
