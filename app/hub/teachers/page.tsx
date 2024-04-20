"use client";
import React, { useEffect, useState } from "react";
import styles from "./teacher.module.css";
import { Avatar, CircularProgress } from "@mui/material";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import TelegramIcon from "@mui/icons-material/Telegram";
import Image from "next/image";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";

import { Controller } from "react-hook-form";
import { CustomClassTextField } from "../classes/styledComponents";
import StarIcon from "@mui/icons-material/Star";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CustomHamburger from "@/components/hamburger/CustomHamburger";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/utils/types";

const page = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<User[]>(teachers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        const teachers = res.data.filter(
          (teacher: User) =>
            teacher.role === "teacher" || teacher.role === "adminTeacher"
        );
        setTeachers(teachers);
        setFilteredTeachers(teachers);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  // useEffect(() => {
  //   const fetchTeachers = async () => {
  //     setTeachers(teachers);
  //     setFilteredTeachers(teachers);
  //     setLoading(false);
  //   };
  //   fetchTeachers();
  // }, []);

  // START OF FILTER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameToFilter = e.target.value;

    const result = teachers.filter((teacher) => {
      const teachersName = `${teacher.fName} ${teacher.lName}`;
      const teacherName = teachersName.split(" ").join("").toLowerCase();

      return teacherName.startsWith(nameToFilter);
    });
    console.log(result);
    setFilteredTeachers(result);
  };

  // END OF FILTER

  return (
    <div className={styles.container}>
      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:px-4 md:pl-[3em]">
        <h1 className=" font-bold text-3xl">Find a teacher</h1>
        <CustomClassTextField onChange={handleChange} label="Teacher's name" />
      </div>

      <div className={styles.teachersCardContainer}>
        {loading ? (
          <>
            <div className="flex items-center gap-[1.5em] md:hidden">
              <Skeleton className="w-[30px] h-[30px] rounded-full" />
              <Skeleton className="w-full h-[390px]" />
              <Skeleton className="w-[30px]  h-[30px] rounded-full" />
            </div>
            <div className=" w-screen flex gap-4 ">
              <Skeleton
                className={`w-[260px] h-[390px] ${styles.eachTeacerCard}`}
              />
              <Skeleton
                className={`w-[260px] h-[390px] ${styles.eachTeacerCard}`}
              />
              <Skeleton
                className={`w-[260px] h-[390px] ${styles.eachTeacerCard}`}
              />
            </div>
          </>
        ) : (
          <>
            <Carousel className="md:hidden">
              <CarouselContent>
                {filteredTeachers.map((teacher) => (
                  <CarouselItem>
                    <Card className="flex flex-col gap-6 text-center justify-center rounded-md p-4 w-full bg-extraBg text-lightPrime">
                      <CardContent className="flex flex-col items-center gap-4">
                        <Avatar sx={{ width: 54, height: 54 }} />
                        <p className=" font-bold ">{`${teacher.fName} ${teacher.lName}`}</p>

                        <p>{teacher.role}</p>
                        <Link
                          href={`/hub/teachers/${teacher.id}`}
                          className=" text-extraItem underline  hover:text-lightPrime transition"
                        >
                          View profile
                        </Link>
                      </CardContent>
                      <CardFooter className="p-0">
                        <button className="  bg-extraText w-full py-4 rounded-md text-white hover:bg-lightPrime hover:text-extraBg transition">
                          See Classes
                        </button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {filteredTeachers.map((teacher) => (
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                <Card
                  className={`${styles.eachTeacerCard} bg-extraBg text-lightPrime`}
                >
                  <CardContent className="flex flex-col items-center gap-4">
                    <Avatar sx={{ width: 54, height: 54 }} />
                    <p className=" font-bold ">{`${teacher.fName} ${teacher.lName}`}</p>

                    <p>{teacher.role}</p>
                    <Link
                      href={`/hub/teachers/${teacher.id}`}
                      className=" text-extraItem underline  hover:text-white transition"
                    >
                      View profile
                    </Link>
                  </CardContent>
                  <CardFooter className="p-0">
                    <Link
                      href={`/hub/classes?teacher=${teacher.fName}-${teacher.lName}`}
                      className="w-full"
                    >
                      <button className="  bg-extraText w-full py-4 rounded-md text-white hover:bg-lightPrime hover:text-extraBg transition">
                        See Classes
                      </button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
