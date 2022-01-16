import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Match } from "src/matches/matches.model";
import { CompetitorsController } from "./competitors.controller";
import { Competitor } from "./competitors.model";
import { CompetitorsService } from "./competitors.service";

@Module({
  controllers: [CompetitorsController],
  providers: [CompetitorsService],
  imports: [SequelizeModule.forFeature([Competitor, Match])],
})
export class CompetitorsModule {}
