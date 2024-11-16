import { getVerifiedCoursePayment } from "@/actions/payment";
import {
  createVideoCourseSession,
  deleteVideoSession,
  getAllVideos,
  getSingleVideo,
  getSingleVideoSession,
} from "@/actions/videos/videos.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllVideos = () => {
  return useQuery({
    queryKey: ["getAllVideos"],
    queryFn: async () => {
      const videos = await getAllVideos();
      return videos;
    },
  });
};
export const useGetCourseVideosDetails = (id: string) => {
  return useQuery({
    queryKey: ["getVideoCourseDetails"],

    queryFn: async () => {
      const videoDetails = await getSingleVideo(id);
      return videoDetails;
    },
  });
};

export const useGetSessionDetails = (id: string) => {
  return useQuery({
    queryKey: ["getVideoSessionDetails"],
    queryFn: async () => {
      const videoSessionDetails = getSingleVideoSession(id);
      return videoSessionDetails;
    },
  });
};

export const usePostSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(formData);
      await createVideoCourseSession(formData);
      return "session created succesfully";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getVideoCourseDetails"] });
      toast.success("Session created successfully");
    },
  });
};
export const useGetVerifiedCoursePayment = ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["getVerifiedCoursePayment"],
    queryFn: async () => {
      const verifiedPayments = getVerifiedCoursePayment({ id, userId });
      return verifiedPayments;
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteVideoSession(id);
    },
    onSuccess: () => {
      toast.warning("Session deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getVideoCourseDetails"] });
    },
  });
};
