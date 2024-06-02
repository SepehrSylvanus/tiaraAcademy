"use server";
import prisma from "@/utils/db";
import { S3 } from "aws-sdk";
import { cookies } from "next/headers";
import { getSingleUser } from "./userActions";
import { User } from "@/utils/types";

type WritingAnswerToSend = {
  band: string;
  writingSelf: string;
  writingId: string;
};
const { verify } = require("jsonwebtoken");
export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token");
};

export const verifyToken = (token: string) => {
  const validate = verify(token, process.env.NEXT_PUBLIC_TOKEN_SERCRET);
  if (validate) {
    return validate;
  } else {
    return "The token has problem";
  }
};

export const retieveUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const getWritings = async () => {
  const writings = await prisma.writing.findMany({
    include: {
      creator: true,
      writingAnswer: true,
    },
  });
  return writings;
};

export const postWriting = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const subject = formData.get("subject") as string;
  const image = formData.get("image") as File;
  const writing = formData.get("writing") as string;
  const writingFile = formData.get("writingFile") as File;
  const token = await getToken()!;
  const user = (await getSingleUser(token?.value)!) as User;
  const creatorId = user?.id as string;

  if (subject) {
    const newWriting = await prisma.writing.create({
      data: {
        name,
        creatorId,
        teacherId: "clvgvv7cf0000xbdj1m9p3hwy",
        email: user?.email,
        subject,
        writing,
      },
    });
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const Key = newWriting.id + "." + image.type.split("/")[1];
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
        endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key,
        Body: buffer,
      };
      const response = await s3.upload(params).promise();
      if (response) {
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
          Key,
          Expires: 31536000,
        });
        await prisma.writing.update({
          where: {
            id: newWriting.id,
          },
          data: {
            subjectImgURL: permanentSignedUrl,
          },
        });

        return `Writing with name ${newWriting.subject} created`;
      } else {
        await prisma.writing.delete({
          where: {
            id: newWriting.id,
          },
        });
        throw new Error("There is a problem in submitting your writing");
      }
    }
  } else {
    const newWritingFile = await prisma.writing.create({
      data: {
        teacherId: "clvgvv7cf0000xbdj1m9p3hwy",
        creatorId: user?.id,
      },
    });
    if (newWritingFile) {
      const Key = newWritingFile.id + "." + writingFile.type.split("/")[1];
      const bytes = await writingFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
        endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key,
        Body: buffer,
      };
      const response = await s3.upload(params).promise();
      if (response) {
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
          Key,
          Expires: 31536000,
        });
        await prisma.writing.update({
          where: {
            id: newWritingFile.id,
          },
          data: {
            writingLink: permanentSignedUrl,
          },
        });

        return `Writing with name ${writingFile.name} created`;
      } else {
        await prisma.writing.delete({
          where: {
            id: newWritingFile.id,
          },
        });
        throw new Error("There is a problem in submitting your writing");
      }
    }
  }
};

export const getStudentWritings = async () => {
  const token = await getToken()!;
  const user = await getSingleUser(token?.value);
  const myWritings = await prisma.writing.findMany({
    where: {
      creatorId: user?.id,
    },
  });
  return myWritings;
};
export const getSingleWriting = async (id: string) => {
  const writing = await prisma.writing.findUnique({
    where: {
      id,
    },
  });
  return writing;
};
export const postTeacherAnswer = async (data: WritingAnswerToSend) => {
  const alreadyAnswer = await prisma.writingAnswer.findUnique({
    where: {
      writingId: data.writingId,
    },
  });
  if (alreadyAnswer) {
    await prisma.writingAnswer.delete({
      where: {
        writingId: data.writingId,
      },
    });
  }
  const writing = await getSingleWriting(data.writingId);

  const newAnswer = await prisma.writingAnswer.create({
    data,
  });
  const updatedWriting = await prisma.writing.update({
    where: {
      id: writing?.id,
    },
    data: {
      status: "checked",
    },
  });

  if (newAnswer && updatedWriting) {
    return "Your answer successfuly submitted";
  } else {
    throw new Error("There was an error in submitting answer");
  }
};

export const getTeacherAnswer = async (writingId: string) => {
  const teacherAnswer = await prisma.writingAnswer.findUnique({
    where: {
      writingId,
    },
  });
  return teacherAnswer;
};
export const postVideo = async (data: FormData) => {
  const title = data.get("title") as string;
  const playlists = data.get("playlists") as string;
  const video = data.get("video") as File;

  const bytes = await video.arrayBuffer();
  const buffer = await Buffer.from(bytes);
  const videoData = {
    title,
    playlist: playlists.split(","),
  };

  const newvideo = await prisma.video.create({
    data: videoData,
  });

  const name = newvideo.id + "." + video.name.split(".").pop();

  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: name,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
      Key: name,
      Expires: 31536000, // 1 year
    });
    await prisma.video.update({
      where: {
        id: newvideo.id,
      },
      data: {
        bucketKey: name,
        videoLink: permanentSignedUrl,
      },
    });

    if (response) {
    }

    return "Your video created sucessfully";
  } catch (error) {}
};

export const deleteVideo = async (data: FormData) => {
  const id = data.get("id") as string;

  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  });
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  });

  const bucketName: string = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!;

  await s3
    .deleteObject({ Bucket: bucketName, Key: video?.bucketKey! })
    .promise();

  await prisma.video.delete({
    where: {
      id: id,
    },
  });
};
export const getVideos = async () => {
  const videos = await prisma.video.findMany();
  return videos;
};
export const getSingleClass = async (id: string) => {
  const result = await prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
    },
  });

  return result;
};

export const getSingleUserDetails = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getClasses = async () => {
  return prisma.class.findMany({
    include: {
      creator: true,
    },
  });
};
