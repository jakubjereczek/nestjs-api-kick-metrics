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
    return this.playersService.create(dto);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return this.playersService.getAll();
  }

  @Get(':id')
  getById(
    @Param('id')
    id: string,
  ) {
    return this.playersService.getById(id);
  }

  @Put()
  async updateById(@Body() dto: UpdatePlayerDto) {
    return this.playersService.updateById(dto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id')
    id: string,
  ) {
    return this.playersService.deleteById(id);
  }
}
