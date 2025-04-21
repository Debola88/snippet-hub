/* eslint-disable @typescript-eslint/no-explicit-any */
/* app/api/snippet/[id]/favorite/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  context: any       // ← widen to `any`
) {
  const { id } = context.params as { id: string };  // then cast for safety

  await dbConnect();
  const authResult = verifyAuth(request);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.error.includes("expired") ? 401 : 403 }
    );
  }
  const { userId } = authResult;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid snippet ID format" },
      { status: 400 }
    );
  }

  const snippet = await Snippet.findById(id);
  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }

  snippet.favoritedBy = snippet.favoritedBy || [];
  const userObj = new mongoose.Types.ObjectId(userId);
  const isFav = snippet.favoritedBy.some((x: any) => x.equals(userObj));

  snippet.favoritedBy = isFav
    ? snippet.favoritedBy.filter((x: any) => !x.equals(userObj))
    : [...snippet.favoritedBy, userObj];

  await snippet.save();

  return NextResponse.json({
    success: true,
    favorited: !isFav,
    count: snippet.favoritedBy.length,
  });
}
