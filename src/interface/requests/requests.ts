export interface IRequest {
    status: number
    position: number;
    userId: string
    teamId: string
}

export interface IRequestReq extends IRequest{
    id: string
}

export interface IRequestUpdate{
    status?: number;
    positions?: number;
}