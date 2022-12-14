export interface IPositionsRequest {
  target: boolean;
  goalkeeper: boolean;
  leftwing: boolean;
  rightwing: boolean;
  fixed: boolean;
}

export interface IPositionsRequestTest {
  positions: IPositionsRequest;
}

export interface IPositions extends IPositionsRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
