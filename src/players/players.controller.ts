import { DeleteResult, UpdateResult } from 'typeorm';
import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../core/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() dto: CreatePlayerDto): Promise<Player> {
    return await this.playersService.create(dto);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return await this.playersService.getAll();
  }

  @Get(':club')
  async getAllByClub(
    @Param('club')
    club: string,
  ): Promise<Player[]> {
    return await this.playersService.getAllByClub(club);
  }

  @Get(':id')
  async getById(
    @Param('id')
    id: string,
  ): Promise<Player> {
    return await this.playersService.getById(id);
  }

  @Put()
  async updateById(@Body() dto: UpdatePlayerDto): Promise<UpdateResult> {
    return await this.playersService.updateById(dto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id')
    id: string,
  ): Promise<DeleteResult> {
    return await this.playersService.deleteById(id);
  }
}
