import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Workout from "@/models/Workout";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing required parameter: userId' },
      { status: 400 }
    );
  }

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

  const requiredFields = ["userId", "date", "type", "durationMinutes"];
  const missing = requiredFields.filter((key) => data[key] === undefined || data[key] === null || data[key] === "");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const parsedDate = new Date(data.date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json(
      { error: 'Invalid date format for field: date' },
      { status: 400 }
    );
  }
  if (typeof data.durationMinutes !== 'number' || data.durationMinutes < 0) {
    return NextResponse.json(
      { error: 'Field durationMinutes must be a non-negative number' },
      { status: 400 }
    );
  }

  const payload = {
    userId: String(data.userId),
    date: parsedDate,
    type: String(data.type),
    durationMinutes: data.durationMinutes,
    caloriesBurned: typeof data.caloriesBurned === 'number' ? data.caloriesBurned : 0,
    notes: typeof data.notes === 'string' ? data.notes : "",
  };

  const workout = await Workout.create(payload);
  return NextResponse.json(workout, { status: 201 });
}



