import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Snippet from "@/app/models/snippet";
import { TokenPayload, verifyAuth } from "@/app/middleware/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const authResult = verifyAuth(req);
  if ("error" in authResult) return authResult;
  const { userId } = authResult as TokenPayload;

  try {
    const { functionName, language, description, code } = await req.json();
    const snippet = await Snippet.findOne({ _id: params.id });
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    if (snippet.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    snippet.functionName = functionName;
    snippet.language = language;
    snippet.description = description;
    snippet.code = code;
    await snippet.save();

    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    console.error("Snippet update error:", error);
    return NextResponse.json({ error: "Failed to update snippet" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const authResult = verifyAuth(req);
  if ("error" in authResult) return authResult;
  const { userId } = authResult as TokenPayload;

  try {
    const snippet = await Snippet.findOne({ _id: params.id });
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    if (snippet.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await snippet.remove();
    return NextResponse.json({ message: "Snippet deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Snippet deletion error:", error);
    return NextResponse.json({ error: "Failed to delete snippet" }, { status: 500 });
  }
}
