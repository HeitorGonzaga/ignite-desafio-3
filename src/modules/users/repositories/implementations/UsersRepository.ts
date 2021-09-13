import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne(user_id, {relations:['games']});
    console.log('retorno ', user);
    return user!;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('select * from public.users order by first_name asc'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = await this.repository.query(`select * from public.users where LOWER(first_name)=LOWER($1) and LOWER(last_name)=LOWER($2)`, [first_name, last_name]);
    
    return query// Complete usando raw query
  }
}
