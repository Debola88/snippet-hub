/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // For hashing passwords

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    // Validate user input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const db = await getDb();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    // Create a new user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error in sign-up:", error.errorResponse);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
};
