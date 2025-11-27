import { NextResponse } from "next/server";
import Guest from "@/models/Guest";
import { ConnectToDB } from "@/lib/connectToDB";


export async function POST(req: Request) {
  await ConnectToDB();
  
  try {
    const { code, email } = await req.json();

    if (!code || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const guest = await Guest.findOne({ email });
    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    if (guest.code !== code) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    return NextResponse.json(guest, { status: 200 });
  } catch (error) {
    console.error("Couldn't verify code", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
