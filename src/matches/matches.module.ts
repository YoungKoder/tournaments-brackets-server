import { Module } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { MatchesController } from "./matches.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tournament } from "src/tournaments/tournaments.model";
import { Match } from "./matches.model";
import { Participant } from "src/participants/participants.model";
import { Competitor } from "src/competitors/competitors.model";

@Module({
  providers: [MatchesService],
  controllers: [MatchesController],
  imports: [
    SequelizeModule.forFeature([Tournament, Match, Participant, Competitor]),
  ],
})
export class MatchesModule {}
