export const runtime = "nodejs"; // VERY IMPORTANT for Prisma (prevents Edge runtime slow)

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// =====================
// CREATE PLAN
// =====================
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      userId,
      date,
      week,
      day,
      session,
      result,
      amount,
      pair,
      note,
    } = data;

    // Validate required fields
    if (!userId || !date || !session || !result || !day) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Block weekends
    if (day === "Saturday" || day === "Sunday") {
      return NextResponse.json(
        { error: "No trading on weekends" },
        { status: 400 }
      );
    }

    const plan = await prisma.tradingPlan.create({
      data: {
        userId,
        date: new Date(date),
        week: Number(week),
        day,
        session,
        result,
        amount: Number(amount) || 0,
        pair,
        note,
      },
      select: {
        id: true,
        date: true,
        week: true,
        day: true,
        session: true,
        result: true,
        amount: true,
        pair: true,
        note: true,
      },
    });

    return NextResponse.json(plan);
  } catch (error: unknown) {
    // Duplicate trade error
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Trade already exists for this session and date" },
        { status: 400 }
      );
    }

    console.error("PLAN POST ERROR:", error);
    return NextResponse.json(
      { error: "Error creating plan" },
      { status: 500 }
    );
  }
}

// =====================
// GET PLANS (Optimized)
// =====================
export async function GET(req: Request) {
  try {
    console.time("GET_PLANS_TOTAL");

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    console.time("DB_QUERY");

    const plans = await prisma.tradingPlan.findMany({
      where: { userId },
      orderBy: { date: "asc" },
      take: 50, // LIMIT results (important for speed)
      select: {
        id: true,
        date: true,
        week: true,
        day: true,
        session: true,
        result: true,
        amount: true,
        pair: true,
        note: true,
      },
    });

    console.timeEnd("DB_QUERY");
    console.timeEnd("GET_PLANS_TOTAL");

    return NextResponse.json(plans);
  } catch (error) {
    console.error("PLAN GET ERROR:", error);
    return NextResponse.json(
      { error: "Error fetching plans" },
      { status: 500 }
    );
  }
}