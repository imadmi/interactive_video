import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { VideoAsk } from './types';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import { Storage } from '@google-cloud/storage';
import { join } from 'path';

@Controller('')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('saveVideoAsk')
  createVideoAsk(@Body() mockData: VideoAsk[], @Req() req: any) {
    const cookie = req.cookies;
    const user = this.UsersService.getUserFromCookie(cookie);
    return this.UsersService.importVideoAsks(mockData, user.id);
  }

  @Get('getVideoAsk/:id')
  getVideoAsk(@Param('id') id: string) {
    return this.UsersService.getVideoAsk(id);
  }

  @Get('getVideoAsks')
  getVideoAsks() {
    return this.UsersService.getVideoAskswithoutId();
  }

  @Get('getVideoAskChain/:id')
  getVideoAskChain(@Param('id') id: string) {
    return this.UsersService.getVideoAskChain(id);
  }

  @Get('user')
  user(@Req() req: any, @Res() res: any) {
    try {
      const cookie = req.cookies;
      const userfromcookie = this.UsersService.getUserFromCookie(cookie);
      if (userfromcookie === null) {
        return res.json({ succes: false });
      }
      return res.json({ succes: true, user: userfromcookie });
    } catch (e) {
      return res.json({ succes: false });
    }
  }

  @Get('myVideoAsks')
  async myVideoAsks(@Req() req: any, @Res() res: any) {
    try {
      const cookie = req.cookies;
      const user = this.UsersService.getUserFromCookie(cookie);
      if (user === null) {
        return res.json({ succes: false });
      }
      const myVideoAsks = await this.UsersService.getVideoAsksByUser(user.id);
      if (myVideoAsks === null) {
        return res.json({ succes: false });
      }
      return res.json({ succes: true, myVideoAsks });
    } catch (e) {
      return res.json({ succes: false });
    }
  }

  @Post('uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: any,
  ) {
    try {
      const gcBucketFile = join(__dirname, '../..', 'gcpBucketVideos.json');

      const storage = new Storage({
        projectId: 'annarabic',
        keyFilename: gcBucketFile,
      });

      const bucketName = 'storage-video-ask';
      const bucket = storage.bucket(bucketName);

      const uploadBlob = async (
        buffer: Buffer,
        destinationBlobName: string,
      ) => {
        const blob = bucket.file(destinationBlobName);
        const blobStream = blob.createWriteStream();

        return new Promise((resolve, reject) => {
          blobStream.on('error', (error) => reject(error));
          blobStream.end(buffer);
          blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/\
${bucketName}/${destinationBlobName}`;
            console.log(publicUrl);
            resolve(publicUrl);
          });
        });
      };

      const costumFileName = Date.now() + file.originalname;

      const path = await uploadBlob(file.buffer, costumFileName);
      return res.json({ success: true, path });
    } catch (error) {
      return res.json({ success: false, error: error });
    }
  }
}
