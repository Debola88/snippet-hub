import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Snippet from "@/app/models/snippet";

export async function GET() {
  await dbConnect();

  const results = await Snippet.aggregate([
    { 
      $group: { 
        _id: "$language", 
        count: { $sum: 1 } 
      } 
    },
    { $sort: { count: -1 } }  
  ]);

  const languages = results.map(({ _id, count }) => ({
    language: _id,
    count,
  }));

  return NextResponse.json(languages);
}
