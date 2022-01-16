import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Match } from "src/matches/matches.model";
import { Participant } from "src/participants/participants.model";

export const TournamentsTypes = ["bracket", "round_robin", "ladder"];
export const brackeTorunamentTypeFormats = [
  "Single Elimination",
  "Double Elimination",
];
/*Mandatory fields to create tournament object*/
interface TournamentCreationAttrs {
  title: string;
  type: string;
  size: number;
  bronzeMatch: boolean;
  format: string;
  picture_long: string | null;
  picture_small: string | null;
  picture_original: string | null;
}

@Table({ tableName: "tournaments" })
export class Tournament extends Model<Tournament, TournamentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @HasMany(() => Participant, "tId")
  participants: Participant[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.ENUM({ values: TournamentsTypes }),
    defaultValue: "bracket",
  })
  type: string;

  @Column({
    type: DataType.ENUM({ values: brackeTorunamentTypeFormats }),
    defaultValue: "Single Elimination",
  })
  format: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  bronze_match: boolean;

  @HasMany(() => Match, "tId")
  matches: Match[];

  @Column({
    type: DataType.INTEGER,
    defaultValue: 4,
  })
  size: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  picture_long: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  picture_small: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  picture_original: string;
}
