import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Match } from "src/matches/matches.model";
import { Participant } from "src/participants/participants.model";
import { User } from "src/users/users.model";
import { TournamentsController } from "./tournaments.controller";
import { Tournament } from "./tournaments.model";
import { TournamentsService } from "./tournaments.service";
import { MatchTreeModule } from "src/tools/matchTree/matchTree.module";
import { AuthModule } from "src/auth/auth.module";
import { Competitor } from "src/competitors/competitors.model";

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
  imports: [
    SequelizeModule.forFeature([
      Participant,
      Tournament,
      Match,
      User,
      Competitor,
    ]),
    MatchTreeModule,
    AuthModule,
  ],
})
export class TournamentsModule {}
