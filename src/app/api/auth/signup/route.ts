import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { dbConnect } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
