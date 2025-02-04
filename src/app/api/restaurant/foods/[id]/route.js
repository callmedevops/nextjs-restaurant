import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    try {
        await mongoose.connect(connectionStr);
        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
        }
        const result = await foodSchema.find({ resto_id: id });
        if (!result || result.length === 0) {
            return NextResponse.json({ success: false, message: "No food items found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
export async function DELETE(request, { params }) {
    const { id } = params;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await foodSchema.findByIdAndDelete(id);

    return NextResponse.json({ success: !!result });
}
export async function PUT(request, { params }) {
    const { id } = params;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    try {
        const body = await request.json();
        const updatedFood = await foodSchema.findByIdAndUpdate(id, body, { new: true });

        if (!updatedFood) {
            return NextResponse.json({ success: false, message: "Food item not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, result: updatedFood });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}