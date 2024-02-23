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
  // id: string;
  question: string;
  next_video_id: string | null;
};

@Injectable()
export class UsersService {
  async importVideoAsks(data: VideoAsk[]) {
    try {
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
    } catch (error) {
      console.error('Error importing video asks:', error);
      return { success: false , error: error};
    }
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

  async getVideoAskChain(id: string) {
    // Initial lookup for the starting video ask
    let currentVideoAsk = await prisma.videoAsk.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });

    // Return null if the starting video ask is not found
    if (!currentVideoAsk) {
      return null;
    }

    let videoChain: any[] = [];

    // Loop to follow the chain of video asks
    while (currentVideoAsk) {
      // Add the current video ask to the chain
      videoChain.push({
        id: currentVideoAsk.id,
        title: currentVideoAsk.title,
        url: currentVideoAsk.url,
        questions: currentVideoAsk.questions.map((q) => ({
          id: q.id,
          question: q.question,
          next_video_id: q.next_video_id,
        })),
      });

      // Get the next_video_id from the first question
      const nextId = currentVideoAsk.questions[0]?.next_video_id;

      // Break the loop if there is no next video
      if (!nextId) {
        break;
      }

      currentVideoAsk = await prisma.videoAsk.findUnique({
        where: {
          id: nextId,
        },
        include: {
          questions: true,
        },
      });
    }

    return videoChain;
  }

  async getVideoAsks() {
    return await prisma.videoAsk.findMany({
      include: {
        questions: true,
      },
    });
  }

  // get all video asks withouth Id and questions id
  async getVideoAskswithoutId() {
    const videoAsks = await this.getVideoAsks();
    return videoAsks.map((videoAsk) => {
      return {
        id: videoAsk.id,
        title: videoAsk.title,
        url: videoAsk.url,
        questions: videoAsk.questions.map((q) => ({
          question: q.question,
          next_video_id: q.next_video_id,
        })),
      };
    });
  }
}
