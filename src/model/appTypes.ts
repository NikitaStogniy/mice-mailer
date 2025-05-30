import { Database } from './supabaseTypes';

export interface IResult {
  name: string;
  email: string;
  requests: IRequest[];
  owner: User;
  juridicalInfo: JuridicalInfo;
}

export interface IRequest {
  id: number;
  createdAt: string;
  name: string;
  hotel?: IHotel;
  date: string;
  duration: number;
  count: number;
  rooms?: IRoom[];
  roomsTotalCost?: number;
  halls?: IHall[];
  hallsTotalCost?: number;
  food?: IFood[];
  foodTotalCost?: number;
  totalCost: number;
}

export type JuridicalInfo = Database['public']['Tables']['juridical_info']['Row'];
export type User = Database['public']['Tables']['users']['Row'];

export interface IHotel {
  name: string;
  email: string;
  phone: string;
  owner: User;
  address: string;
  juridicalInfo: JuridicalInfo;
}

export interface IRoom {
  type: string;
  name: string;
  quantity: number;
  nights: number;
  cost: number;
}

export interface IHall {
  name: string;
  seating: string;
  days: number;
  cost: number;
}

export interface IFood {
  packageName: string;
  quantity: number;
  persons: number;
  cost: number;
}
