import { IPositions } from '../positions/positions';

export interface IRequest {
    status: number
    positions?: IPositions;
    userId: string
    teamId: string
}

export interface IRequestReq extends IRequest{
    id: string
}

export interface IRequestUpdate{
    status?: number;
    positions?: IPositions;
}