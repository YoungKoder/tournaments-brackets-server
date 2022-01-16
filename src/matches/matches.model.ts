import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Competitor } from "src/competitors/competitors.model";
import { Tournament } from "src/tournaments/tournaments.model";

/*Mandatory fields to create match object*/
interface MatchCreationAttrs {
  tId: number;
  comment: string;
  round: number;
  winner_mid: number;
  position_0: number;
  position_1: number;
}

@Table({ tableName: "matches" })
export class Match extends Model<Match, MatchCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Tournament)
  @Column({ type: DataType.INTEGER })
  tId: number;

  @BelongsTo(() => Tournament, "tId")
  tournament: Tournament;

  @HasMany(() => Competitor)
  competitors: Competitor[];

  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  round: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: -1,
  })
  winner: number;

  @Column({
    type: DataType.INTEGER,
  })
  winner_mid: number;

  @Column({
    type: DataType.INTEGER,
  })
  looser_mid: number;

  @Column({
    type: DataType.INTEGER,
  })
  position_0: number;

  @Column({
    type: DataType.INTEGER,
  })
  position_1: number;
}
