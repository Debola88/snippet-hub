import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/app/middleware/auth";
import Snippet from "@/app/models/snippet";
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const headers = new Headers(req.headers);
    const authResult = verifyAuth(
      new NextRequest(req.url, { 
        headers,
        method: req.method,
        body: req.body 
      })
    );

    if ("error" in authResult) {
      return NextResponse.json(
        { 
          error: authResult.error,
          message: "Authentication failed" 
        },
        { status: authResult.status || 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(authResult.userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const languageStats = await Snippet.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(authResult.userId) 
        } 
      },
      { 
        $group: { 
          _id: "$language", 
          count: { $sum: 1 } 
        } 
      },
      { 
        $project: { 
          language: "$_id", 
          count: 1, 
          _id: 0 
        } 
      },
      { 
        $sort: { count: -1 } 
      },
      {
        $limit: 20 
      }
    ]);

    if (!languageStats || languageStats.length === 0) {
      return NextResponse.json(
        [], 
        { status: 200 }
      );
    }

    const response = NextResponse.json(languageStats);
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    
    return response;

  } catch (error) {
    console.error("Language stats error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch language stats",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}