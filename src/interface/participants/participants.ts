import { ITeam } from '../teams/teams';
import { IUser } from '../users/users';

export interface IParticipantRequest {
  position: number;
  teamId: string;
  userId: string;
}

export interface IParticipant
  extends Omit<IParticipantRequest, 'teamId' | 'userId'> {
  id: string;
  team: ITeam;
  user: IUser;
}
