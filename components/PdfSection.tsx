"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, Divider } from "@mui/material";
import ReuableForm from "./reusableComponents/teacherWriting/ReuableForm";
import Link from "next/link";
import { Button } from "./ui/button";
import MyPdf from "./reusableComponents/myPdf";
import { usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Writings } from "@/utils/types";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import EachWritingCard from "./reusableComponents/EachWritingCard";

const PdfSection = () => {
  const [writings, setWritings] = useState<Writings[]>([]);
  useEffect(() => {
    console.log(writings);
  }, [writings]);

  useEffect(() => {
    const getWritings = async () => {
      const token = await getToken()!;
      const user = await getSingleUser(token?.value);
      console.log(user);
      axios.get("/api/writings").then((res) => {
        const writings: Writings[] = res.data;
        console.log(writings);
        const thisUserWritings = writings.filter(
          (writing) => writing.teacherId === user?.id
        );
        setWritings(thisUserWritings);
      });
    };
    getWritings();
  }, []);

  return (
    <div className="pdfs max-h-[480px] overflow-y-auto rounded-md shadow-md p-2 flex flex-col bg-extraText text-lightPrime ">
      <div
        className={`${
          writings.length > 0 && "grid grid-cols-1 lg:grid-cols-5"
        } px-2 gap-3 items-center py-3 m-2 rounded-md ring-1 ring-lightPrime`}
      >
        {writings?.length > 0 ? (
          writings?.map((writing, index) => (
            <div
              key={writing.id}
              className={`${
                index < writings.length - 1 &&
                " border-r border-dashed border-slate-200 pr-6 mr-2"
              } w-full`}
            >
              <EachWritingCard writing={writing} />
            </div>
          ))
        ) : (
          <p className="text-center">You don't have any writing</p>
        )}
      </div>
    </div>
  );
};

export default PdfSection;
