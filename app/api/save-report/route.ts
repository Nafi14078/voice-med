import { db } from "@/config/db";
import { usersTable, reportsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    // 1. Save the report to the reportsTable
    await db.insert(reportsTable).values({
      userId: user.id,
      title: body.title || "Medical Consultation",
      summary: body.summary,
      disease: body.disease,
      symptoms: body.symptoms,
      medication: body.medication,
      advice: body.advice,
      urgency: body.urgency,
    });

    // 2. Increment user's consultation and report counts
    await db.update(usersTable)
      .set({
        consultations: sql`${usersTable.consultations} + 1`,
        reportCount: sql`${usersTable.reportCount} + 1`,
      })
      .where(eq(usersTable.clerkId, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}