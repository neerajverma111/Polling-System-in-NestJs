import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('vote')
  async voteFunction(@Body() body: any) {
    const isUserExists = await this.userService.isSameUser(body);
    // console.log(isUserExists);
    if (!isUserExists) {
      const result = await this.userService.registerVote(body);
      return result;
    } else return 'User Already Voted!';
  }

  @Get('get-count')
  async partyCount(@Body() body: any) {
    const count = await this.userService.getCount(body);
    return count;
  }
}
