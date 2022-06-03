import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Match } from "src/matches/matches.model";

import { Competitor } from "./competitors.model";

@Table({ tableName: "MatchCompetitors", createdAt: false, updatedAt: false })
export class MatchCompetitors extends Model<MatchCompetitors> {
  @ForeignKey(() => Competitor)
  @Column({ type: DataType.INTEGER })
  competitorId: number;

  @ForeignKey(() => Match)
  @Column({ type: DataType.INTEGER })
  matchId: number;

  @Column({ type: DataType.INTEGER })
  score: number;
}
