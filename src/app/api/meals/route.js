import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Meal from "@/models/Meal";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const query = {};
  if (userId) query.userId = userId;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const meals = await Meal.find(query).sort({ date: -1 }).lean();
  return NextResponse.json(meals);
}

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const meal = await Meal.create(data);
  return NextResponse.json(meal, { status: 201 });
}



