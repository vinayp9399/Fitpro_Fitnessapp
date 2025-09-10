import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Meal from "@/models/Meal";

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

  const meals = await Meal.find(query).sort({ date: -1 }).lean();
  return NextResponse.json(meals);
}

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();

  const requiredFields = ["userId", "date", "name", "calories"];
  const missing = requiredFields.filter((key) => data[key] === undefined || data[key] === null || data[key] === "");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Basic type/format checks
  const parsedDate = new Date(data.date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json(
      { error: 'Invalid date format for field: date' },
      { status: 400 }
    );
  }
  if (typeof data.calories !== 'number' || data.calories < 0) {
    return NextResponse.json(
      { error: 'Field calories must be a non-negative number' },
      { status: 400 }
    );
  }

  const payload = {
    userId: String(data.userId),
    date: parsedDate,
    name: String(data.name),
    calories: data.calories,
    proteinGrams: typeof data.proteinGrams === 'number' ? data.proteinGrams : 0,
    carbsGrams: typeof data.carbsGrams === 'number' ? data.carbsGrams : 0,
    fatGrams: typeof data.fatGrams === 'number' ? data.fatGrams : 0,
    notes: typeof data.notes === 'string' ? data.notes : "",
  };

  const meal = await Meal.create(payload);
  return NextResponse.json(meal, { status: 201 });
}



