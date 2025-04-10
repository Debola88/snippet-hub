/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Verify authentication
    const authResult = verifyAuth(request);
    if ("error" in authResult) {
      console.error("Auth error:", authResult.error);
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.error.includes("expired") ? 401 : 403 }
      );
    }

    const { userId } = authResult;

    // Validate snippet ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid snippet ID format" },
        { status: 400 }
      );
    }

    // Find the snippet
    const snippet = await Snippet.findById(params.id);
    if (!snippet) {
      return NextResponse.json(
        { error: "Snippet not found" },
        { status: 404 }
      );
    }

    // Initialize favoritedBy if needed
    if (!snippet.favoritedBy) {
      snippet.favoritedBy = [];
    }

    // Check if already favorited
    const userIdObj = new mongoose.Types.ObjectId(userId);
    const isFavorited = snippet.favoritedBy.some((id : any) => id.equals(userIdObj));

    // Update favorites
    if (isFavorited) {
      snippet.favoritedBy = snippet.favoritedBy.filter((id: any) => !id.equals(userIdObj));
    } else {
      snippet.favoritedBy.push(userIdObj);
    }

    await snippet.save();

    return NextResponse.json({
      success: true,
      favorited: !isFavorited,
      count: snippet.favoritedBy.length
    });

  } catch (error) {
    console.error("Error in favorite endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}