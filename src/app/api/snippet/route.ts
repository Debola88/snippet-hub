import { TokenPayload, verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const snippets = await Snippet.find({});
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch snippets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const authResult = verifyAuth(req);
  if ("error" in authResult) return authResult;
  const { userId } = authResult as TokenPayload;

  try {
    const { functionName, language, description, code } = await req.json();
    if (!functionName || !language || !description || !code) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const snippet = await Snippet.create({
      userId,
      functionName,
      language,
      description,
      code,
    });
    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    console.error("Snippet creation error:", error);
    return NextResponse.json({ error: "Failed to create snippet" }, { status: 500 });
  }
}

