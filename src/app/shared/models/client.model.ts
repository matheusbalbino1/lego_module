export interface IClient {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IClientSelect extends IClient {
  selected?: boolean;
}
