import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password!);

    if (!valid) {
      return new Response("Invalid password", { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, "secretkey");

    return Response.json({ token, userId: user.id });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return new Response("Login error", { status: 500 });
  }
}