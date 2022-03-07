import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Tournament } from "src/tournaments/tournaments.model";
import { User } from "src/users/users.model";

/*Mandatory fields to create participant object*/
interface ParticipantCreationAttrs {
  tId: number;
  uId: number;
  position: number;
  role: string;
}

export const UserRoles = ["Admin", "Owner", "Participant"];

@Table({ tableName: "participants" })
export class Participant extends Model<Participant, ParticipantCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  uId: number;

  @BelongsTo(() => User, "uId")
  user: User;

  @ForeignKey(() => Tournament)
  @Column({ type: DataType.INTEGER })
  tId: number;

  @BelongsTo(() => Tournament, "tId")
  tournament: Tournament;

  @Column({
    type: DataType.INTEGER,
  })
  position: number;

  @Column({
    type: DataType.ENUM({ values: UserRoles }),
    defaultValue: "Participant",
  })
  role: string;
}
