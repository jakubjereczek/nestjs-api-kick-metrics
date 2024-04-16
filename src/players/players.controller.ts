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
  async create(@Body() dto: CreatePlayerDto) {
    this.playersService.create(dto);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return this.playersService.getAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.playersService.getById(id);
  }

  @Put()
  async update(@Body() dto: UpdatePlayerDto) {
    this.playersService.updateById(dto);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    this.playersService.deleteById(id);
  }
}
