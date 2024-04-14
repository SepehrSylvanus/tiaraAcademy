import { exampleRetireveStudents, getToken } from "@/actions/actions";
import StudentHub from "@/components/studentHub/StudentHub";
import { columns } from "@/components/studentsTable/columns";
import { DataTable } from "@/components/studentsTable/data-table";
import { Button } from "@/components/ui/button";
import { Avatar, Divider } from "@mui/material";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReuableForm from "@/components/reusableComponents/teacherWriting/ReuableForm";

import DeleteVideo from "@/components/reusableComponents/DeleteVideo";
import CreateVideo from "@/components/reusableComponents/teacherWriting/CreateVideo";
import DeleteClass from "@/components/reusableComponents/DeleteClass";
import CreateClass from "@/components/reusableComponents/CreateClass";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import { getSingleUser } from "@/actions/userActions";
import { usePDF } from "@react-pdf/renderer";
import MyPdf from "@/components/reusableComponents/myPdf";
import PdfSection from "@/components/PdfSection";
const Hub = async () => {
  const users = await exampleRetireveStudents();
  const token = await getToken();
  const currentUser = await getSingleUser(token?.value!);
  console.log(currentUser);
  console.log(users);
  const students = users.filter((user) => user.role === "student");
  const teachers = users.filter(
    (user) => user.role === "adminTeacher" || user.role === "teacher"
  );

  return (
    <div>
      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <div className="container   px-4 pt-4 pb-4 flex flex-col sm:grid grid-cols-1 sm:grid-cols-3 md:grid-rows-2  sm:gap-4 md:pl-[4em] space-y-4 md:space-y-0 text-lightText">
        <div className="avatar-video grid grid-rows-1 ring-1 ring-slate-400 p-4 rounded-md  gap-2 col-span-1 ">
          {/* ========= */}
          <div className="avatrContainer  flex gap-4 items-center justify-center">
            <Avatar src="/khashayar.jpg" sx={{ width: 80, height: 80 }} />
            <div className="space-y-2">
              <p className="font-bold">Admin | Teacher</p>
              <h1 className="font-bold text-xl">Khashayar Mohammadi</h1>
            </div>
          </div>
          {/* =========== */}

          <div className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime">
            <p className="text-2xl">Videos Section</p>
            <p className="my-2">Post or delete videos</p>

            <div>
              <p className="mb-2 text-start font-bold">Delete video</p>
              <DeleteVideo />
            </div>
            <div>
              <p className="mb-2 text-start font-bold">Create Video</p>
              <CreateVideo />
            </div>
          </div>
          {/* ============= */}
        </div>
        <div className="student-sections mt-0 ring-1  ring-slate-400 p-4 h-fit rounded-md sm:col-span-2 grid grid-cols-1 md:grid-rows-2 overflow-auto ">
          {/* ========= */}
          <div className="space-y-2 flex-grow ">
            <p className="font-semibold">Students</p>
            <DataTable columns={columns} data={students} />
          </div>

          {/* ========= */}
          <div className="grid grid-cols-1  grid-flow-dense sm:grid-cols-2 gap-2 mt-2 flex-grow sm:col-span-2">
            {/* ============== */}
            <PdfSection />
            {/* ============== */}

            <div className="rounded-md h-fit shadow-md p-2 space-y-2 flex flex-col  bg-extraText text-lightPrime">
              <p className="text-2xl">Classes Section</p>
              <DeleteClass />
              <Divider />
              <CreateClass />

              <p></p>
            </div>

            {/* ============== */}
          </div>
        </div>

        {currentUser?.role === "admin" && (
          <div className="col-span-3 row-span-1 overflow-auto">
            <div className="space-y-2">
              <p className="font-semibold">Teachers</p>
              <DataTable columns={columns} data={teachers} />
            </div>
          </div>
        )}
      </div>

      {/* <StudentHub/> */}
    </div>
  );
};

export default Hub;
