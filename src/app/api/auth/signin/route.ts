import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // For comparing passwords
import jwt from "jsonwebtoken"; // For generating JWT token

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // Validate user input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const db = await getDb();
    const usersCollection = db.collection("users");

    // Find the user in the database
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 400 });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 400 });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    return NextResponse.json({ message: "Sign-in successful!", token });
  } catch (error) {
    console.error("Error in sign-in:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
};
