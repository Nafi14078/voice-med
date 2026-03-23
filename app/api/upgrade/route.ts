import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  await db.update(usersTable)
    .set({ isPremium: true, credits: 9999 }) // Unlimited credits for Pro
    .where(eq(usersTable.clerkId, user.id));

  return NextResponse.json({ success: true });
}