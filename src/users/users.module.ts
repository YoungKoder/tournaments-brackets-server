import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Participant } from "src/participants/participants.model";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Participant])],
  exports: [UsersService],
})
export class UsersModule {}
