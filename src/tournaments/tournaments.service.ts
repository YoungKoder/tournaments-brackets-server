import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtPayload } from "src/auth/auth.service";
import { Competitor } from "src/competitors/competitors.model";
import { Match } from "src/matches/matches.model";
import { Participant, UserRoles } from "src/participants/participants.model";
// import { getMatchNumber, makeTreeData } from "src/tools/makeTreeData";
import { MatchTreeService } from "src/tools/matchTree/matchTree.service";
import { User } from "src/users/users.model";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { Tournament } from "./tournaments.model";

@Injectable()
export class TournamentsService {
  constructor(
    @InjectModel(Tournament)
    private tournamentRepository: typeof Tournament,
    @InjectModel(Match)
    private matchRepository: typeof Match,
    @InjectModel(Participant)
    private participantRepository: typeof Participant,
    @InjectModel(Competitor)
    private competitorRepository: typeof Competitor,
    @InjectModel(User)
    private userRepository: typeof User,
    private matchTreeService: MatchTreeService
  ) {}

  async create(tournamentDto: CreateTournamentDto, user: JwtPayload) {
    const DEFAULT_TEAM_COUNT = 8;
    const tournament = await this.tournamentRepository.create({
      ...tournamentDto,
    });

    await this.participantRepository.create({
      user_id: user.id,
      tournament_id: tournament.id,
      role: UserRoles.owner,
    });

    const tree = this.matchTreeService.getTree(DEFAULT_TEAM_COUNT);

    for (let i = 0; i < tree.length; i++) {
      await this.matchRepository.create({
        tournament_id: tournament.id,
        winner_mid: tree[i].winnerId,
        round: tree[i].round,
        external_id: tree[i].id,
      });
    }

    return await this.getTournamentQuery(tournament.id);
  }

  async getUserTournaments(user: JwtPayload, game: string) {
    return await User.findAll({
      where: {
        id: user.id,
      },
      attributes: [],
      include: [
        {
          model: Tournament,
          through: {
            attributes: ["role"],
            as: "participant",
          },
          attributes: ["title", "id"],
          as: "tournaments",
          where: {
            game,
          },
        },
      ],
    });
  }

  async getTournamentQuery(id: string | number) {
    return await Tournament.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Match,
          as: "matches",
          include: [
            {
              model: Competitor,
              through: {
                as: "matchCompetitors",
              },
              include: [{ model: User, as: "user" }],
            },
          ],
        },
        {
          model: User,
          through: {
            attributes: ["role"],
            as: "participant",
          },
          attributes: ["name", "email", "id", "icon"],
          as: "users",
        },
      ],
    });
  }
}
