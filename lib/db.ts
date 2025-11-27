import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import { ConnectToDB } from "./connectToDB";

export async function getUserFromDb(email: string, password: string) {
  await ConnectToDB();

  // Find admin by email
  const admin = await Admin.findOne({ email });

  if (!admin) {
    // throw new Error("No admin found");
    return null;
  }

  // Check password
  const passwordCompare = await bcrypt.compare(password, admin.password);
  if (!passwordCompare) {
    // throw new Error("Password incorrect");
    return null;
  }

  return admin;
}
