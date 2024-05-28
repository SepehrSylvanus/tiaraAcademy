import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};
export const DELETE = async (req: NextRequest, { params }: ParamsProps) => {
  if (req.headers.get("apiKey")) {
    try {
      const cls = await prisma.class.findUnique({
        where: {
          id: params.id,
        },
      });
      if (!cls) {
        return NextResponse.json(
          { message: "Class with this id doesn't exist" },
          { status: 404 }
        );
      }

      try {
        await prisma.class.delete({
          where: {
            id: params.id,
          },
        });
        return NextResponse.json({
          message: "Your desired class successfully deleted!",
        });
      } catch (error) {
        return NextResponse.json(
          { message: "There is an error in server" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "There is an error in server" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Access denied", status: 401 });
  }
};
