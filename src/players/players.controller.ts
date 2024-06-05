import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../core/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Roles } from '../core/decorators/roles.decorator';
import { Authorized } from '../core/decorators/Authorized.decorator';
import { Role } from '../core/enums/role.enum';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers(
    @Query('club')
    club: string | undefined,
    @Query('id')
    id: string | undefined,
  ): Promise<Player[]> {
    if (club || id) {
      return await this.playersService.getByParams({ id, club });
    }
    return await this.playersService.getAll();
  }

  @Roles([Role.Moderator])
  @Authorized()
  @Post()
  async create(@Body() dto: CreatePlayerDto): Promise<Player> {
    return await this.playersService.create(dto);
  }

  @Roles([Role.Moderator])
  @Authorized()
  @Put(':id')
  async updateById(
    @Param('id')
    id: string,
    @Body() dto: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.updateById(id, dto);
  }

  @Roles([Role.Moderator])
  @Authorized()
  @Delete(':id')
  async deleteById(
    @Param('id')
    id: string,
  ): Promise<Player> {
    return await this.playersService.deleteById(id);
  }
}
