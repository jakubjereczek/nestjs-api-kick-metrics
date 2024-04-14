import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    this.playersService.create(createPlayerDto);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return this.playersService.getAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: string,
  ) {
    return this.playersService.getById(id);
  }
}
