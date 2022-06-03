import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { TournamentsService } from "./tournaments.service";

@Controller("tournaments")
export class TournamentsController {
  constructor(private tournamentService: TournamentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/create")
  create(@Req() req, @Body() tournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(tournamentDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/get/:game")
  getUserTournaments(@Req() req) {
    return this.tournamentService.getUserTournaments(req.user, req.params.game);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/getById/:tournamentId")
  getTournamentById(@Req() req) {
    return this.tournamentService.getTournamentQuery(req.params.tournamentId);
  }

  // @UseGuards(JwtAuthGuard)
}
