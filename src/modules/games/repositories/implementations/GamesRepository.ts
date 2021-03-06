import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
    .createQueryBuilder("games").where("games.title ILIKE :title")
    .setParameter("title",`%${param}%`)
    .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query('select count(id) from PUBLIC.games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository.createQueryBuilder("games")
    .innerJoinAndSelect("games.users","user")
    .where("games.id = :id")
    .setParameter("id", id)
    .getOne();


    return game?.users!;
      // Complete usando query builder
  }
}
