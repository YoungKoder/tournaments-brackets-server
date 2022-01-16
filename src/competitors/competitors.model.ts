import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Match } from "src/matches/matches.model";
import { Tournament } from "src/tournaments/tournaments.model";
import { User } from "src/users/users.model";

/*Mandatory fields to create participant object*/
interface CompetitorCreationAttrs {
  mId: number;
  position: number;
  score: number;
}

@Table({ tableName: "competitors" })
export class Competitor extends Model<Competitor, CompetitorCreationAttrs> {
  @ForeignKey(() => Match)
  @Column({ type: DataType.INTEGER })
  mId: number;

  @BelongsTo(() => Match, "mId")
  match: Match;

  @Column({
    type: DataType.INTEGER,
  })
  position: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  score: number;
}
