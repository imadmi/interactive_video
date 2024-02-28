import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { VideoAsk } from './types';



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
    try{

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
    }
    catch (e) {
      return res.json({ succes: false });
    }
  }
}
