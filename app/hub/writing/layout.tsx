import styles from "./writing.module.css";
import { Divider } from "@mui/material";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

import Links from "./Links";
import { retieveUsers } from "@/actions/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teachers = await (
    await retieveUsers()
  ).filter((user) => user.role === "teacher");
  console.log(teachers);
  return (
    <div className="flex flex-col px-4 md:pl-[5em] pb-6">
      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <h1 className="my-4 h1 text-center text-2xl">Writing Section</h1>
      <p className="text-center">
        Welcome to the writing center. Here you can upload your writing file,
        write your writing here directly or even share with other learners
      </p>

      <Links teachers={teachers} />

      <div className="mt-6">{children}</div>
    </div>
  );
}
