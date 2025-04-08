import { TokenPayload, verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const authResult = verifyAuth(req);
  if ("error" in authResult) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userId } = authResult as TokenPayload;

  const { id } = await Promise.resolve(context.params);

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (!Array.isArray(snippet.favoritedBy)) {
      snippet.favoritedBy = [];
    }

    const isFavorited = snippet.favoritedBy.includes(userId);

    if (isFavorited) {
      snippet.favoritedBy.pull(userId);
    } else {
      snippet.favoritedBy.push(userId);
    }

    await snippet.save();

    return NextResponse.json({ success: true, favorited: !isFavorited }, { status: 200 });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
