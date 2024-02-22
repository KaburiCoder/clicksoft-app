import { getUser, saveUser } from "@/db/mongodb/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider") ?? "";
  const email = searchParams.get("email") ?? "";
  const user = await getUser({ provider, email });

  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const { provider, email } = await req.json();
  const user = await saveUser({ provider, email });

  return NextResponse.json(user);
}
