import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Snippet from "@/app/models/snippet";
import { TokenPayload, verifyAuth } from "@/app/middleware/auth";


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await (context.params);
  
  if (!id) {
    return NextResponse.json(
      { error: "Snippet ID is required" },
      { status: 400 }
    );
  }

  await dbConnect();
  
  const authResult = verifyAuth(req);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error }, 
      { status: 401 }
    );
  }
  
  // const { userId } = authResult as TokenPayload;

  try {
    const { _id, functionName, language, description, code } = await req.json();
    
    console.log("SNI:PET ID", _id)
    if (!functionName || !language || !code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedSnippet = await Snippet.findOneAndUpdate(
      { 
        _id: _id,
      },
      { 
        functionName, 
        language, 
        description, 
        code,
        updatedAt: new Date()
      },
    );

    console.log("UPDATED", updatedSnippet, code)

    if (!updatedSnippet) {
      return NextResponse.json(
        { error: "Snippet not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSnippet, { status: 200 });
    
  } catch (error) {
    console.error("Snippet update error:", error);
    
    let errorMessage = "Failed to update snippet";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
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
    console.log(`Attempting to delete snippet with ID: ${params.id}`);
    
    // Validate that ID exists
    const snippet = await Snippet.findById(params.id);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Check user authorization
    if (snippet.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete snippet using findByIdAndDelete()
    await Snippet.findByIdAndDelete(params.id);

    console.log(`Snippet deleted successfully: ${params.id}`);
    
    return NextResponse.json({ message: "Snippet deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Snippet deletion error:", error);
    return NextResponse.json({ error: "Failed to delete snippet" }, { status: 500 });
  }
}
