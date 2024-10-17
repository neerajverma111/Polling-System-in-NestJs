import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, TableInheritance } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  registerVote(body: any): Promise<User[] | null> {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  async isSameUser(body: any): Promise<User[] | null> {
    const { AID } = body;
    const user = await this.userRepository.find({
      where: { AID },
    });
    return user.length > 0 ? user : null;
  }

  async getCount(body: any): Promise<number | object> {
    const { party_name } = body;
    if (party_name) {
      const count = await this.userRepository.countBy({
        party_name,
      });
      return { count: count };
    } else {
      const winner = await this.userRepository
        .createQueryBuilder('user')
        .select('user.party_name')
        .addSelect('COUNT(user.party_name)', 'count')     // u can add more elements by adding addSelect method.
        .groupBy('user.party_name')
        .orderBy('count', 'DESC')
        .limit(2)
        .getRawOne();
        // console.log(winner)
      return { winner_party: winner };
    }
  }
}
