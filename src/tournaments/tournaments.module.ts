import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Match } from "src/matches/matches.model";
import { Participant } from "src/participants/participants.model";
import { User } from "src/users/users.model";
import { TournamentsController } from "./tournaments.controller";
import { Tournament } from "./tournaments.model";
import { TournamentsService } from "./tournaments.service";

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
  imports: [SequelizeModule.forFeature([Participant, Tournament, Match, User])],
})
export class TournamentsModule {}
