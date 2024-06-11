import { getRegisterdClasses } from "@/actions/actions";
import prisma from "@/utils/db";
import { useQuery } from "@tanstack/react-query";

async function fetchRegisteredClasses(classId: string, userId: string) {}

export const useGetRegisteredClasses = (classId: string, userId: string) => {
  return useQuery({
    queryKey: ["getRegisteredClass"],
    queryFn: async () => {
      const myRegisteredClasses = await getRegisterdClasses(classId, userId);
      console.log("My registered", myRegisteredClasses);
      return myRegisteredClasses;
    },
  });
};
