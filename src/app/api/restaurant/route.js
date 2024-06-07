import mongoose from "mongoose";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const data = await restaurantSchema.find();
    return NextResponse.json({ data });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);
    let payload = await request.json();
    const exists = await restaurantSchema.findOne({ email: payload.email });

    if (exists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    let newRestaurant = new restaurantSchema(payload);
    const result = await newRestaurant.save();
    return NextResponse.json({ result, message: "Successfully registered" });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: "Failed to post into MongoDB" }, { status: 500 });
  }
}
