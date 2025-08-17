import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Workout from "@/models/Workout";

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

  const workouts = await Workout.find(query).sort({ date: -1 }).lean();
  return NextResponse.json(workouts);
}

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const workout = await Workout.create(data);
  return NextResponse.json(workout, { status: 201 });
}



