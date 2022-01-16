export class CreateTournamentDto {
  readonly title: string;
  readonly type: string;
  readonly format: string;
  readonly size: number;
  readonly bronzeMatch: boolean;
}
