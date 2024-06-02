import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  try {
    await prisma.otp.create({
      data: {
        otp: body.otp,
        pNumber: body.phoneNumber,
      },
    });
    return NextResponse.json({ message: "OTP sent to your device" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "There is Error in server\nCheck console for more details",
        message: error,
      },
      { status: 500 }
    );
  }
};
