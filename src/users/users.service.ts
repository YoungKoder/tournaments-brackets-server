import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Participant } from "src/participants/participants.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User
  ) {}

  async createUser(dto: CreateUserDto) {
    console.log("in create user");
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
