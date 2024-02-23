import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

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

@Controller('')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('saveVideoAsk')
  createVideoAsk(@Body() mockData: VideoAsk[]) {
    return this.UsersService.importVideoAsks(mockData);
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
}
