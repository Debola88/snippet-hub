/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await dbConnect();

    const authResult = verifyAuth(request);
    if ("error" in authResult) {
      console.error("Auth error:", authResult.error);
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
      return NextResponse.json(
        { error: "Snippet not found" },
        { status: 404 }
      );
    }

    if (!snippet.favoritedBy) {
      snippet.favoritedBy = [];
    }

    const userIdObj = new mongoose.Types.ObjectId(userId);
    const isFavorited = snippet.favoritedBy.some((id: any) =>
      id.equals(userIdObj)
    );

    if (isFavorited) {
      snippet.favoritedBy = snippet.favoritedBy.filter(
        (id: any) => !id.equals(userIdObj)
      );
    } else {
      snippet.favoritedBy.push(userIdObj);
    }

    await snippet.save();

    return NextResponse.json({
      success: true,
      favorited: !isFavorited,
      count: snippet.favoritedBy.length,
    });
  } catch (error) {
    console.error("Error in favorite endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
