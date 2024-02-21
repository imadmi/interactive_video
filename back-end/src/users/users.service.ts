import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type VideoAsk = {
  id: string;
  title: string;
  url: string;
  questions: Qsts[];
};

export type Qsts = {
  id: string;
  question: string;
  next_video_id: string | null;
};

@Injectable()
export class UsersService {
  async importVideoAsks(data: VideoAsk[]) {
    const videoAsks = await prisma.videoAsk.findMany({
      where: {
        id: {
          in: data.map((v) => v.id),
        },
      },
    });
    if (videoAsks.length) {
      return { success: false };
    }

    for (const videoAsk of data) {
      const questions = videoAsk.questions.map((q) => ({
        question: q.question,
        next_video_id: q.next_video_id,
      }));
      await prisma.videoAsk.create({
        data: {
          id: videoAsk.id,
          title: videoAsk.title,
          url: videoAsk.url,
          questions: {
            create: questions,
          },
        },
      });
    }
    return { success: true };
  }


    async getVideoAsk(id: string) {
        const videoAsk = await prisma.videoAsk.findUnique({
        where: {
            id,
        },
        include: {
            questions: true,
        },
        });
        if (!videoAsk) {
        return null;
        }
        return {
        id: videoAsk.id,
        title: videoAsk.title,
        url: videoAsk.url,
        questions: videoAsk.questions.map((q) => ({
            id: q.id,
            question: q.question,
            next_video_id: q.next_video_id,
        })),
        };
    }
}
