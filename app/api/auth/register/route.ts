import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/connectToDB";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  await ConnectToDB();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const saltRounds = 10;
    const hashPassword = bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      name,
      email,
      password: await hashPassword,
    });
    await newAdmin.save();

    return NextResponse.json(newAdmin, { status: 200 });
  } catch (error) {
    console.error("Couldn't register admin", error);
    return NextResponse.json(
      { error: "Failed to register admin" },
      { status: 500 }
    );
  }
}
