import { Field } from '../../entities/fields.entity';
import { IField } from '../fields/fields';
import { IParticipant } from '../participants/participants';
import { IPositionsRequest, IPositions } from '../positions/positions';
import { IUser } from '../users/users';

export interface ITeamRequest {
  name: string;
  description: string;
  state: string;
  city: string;
  maxWeight?: number;
  maxAge?: number;
  fieldsId?: string[];
  positions: IPositionsRequest;
  participantsId?: string[];
}

export interface ITeam
  extends Omit<ITeamRequest, 'fieldId' | 'positions' | 'participantsId'> {
  id: string;
  isActive: boolean;
  user: IUser;
  fields: IField[];
  positions: IPositions;
  participants?: IParticipant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeamUpdate {
  name?: string;
  description?: string;
  state?: string;
  city?: string;
  maxWeight?: number;
  maxAge?: number;
  fieldsId?: string[];
  fields?: Field[];
  positions?: IPositionsRequest;
}
