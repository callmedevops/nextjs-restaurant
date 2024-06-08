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
  let payload = await request.json();
  let result;
  let success=false
  await mongoose.connect(connectionStr, { useNewUrlParser: true })

  if (payload.login) {
      result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
      if(result){
          success=true
      }
  } else {
      const restaurant = new restaurantSchema(payload)
      result = await restaurant.save();
      if(result){
          success=true;
      }
  }

  return NextResponse.json({ result, success })
}