export interface IResult {
  name: string;
  email: string;
  requests: IRequest[];
  client: IClient;
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

export interface IHotel {
  name: string;
  email: string;
  phone: string;
  owner: IClient
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

export interface IClient {
  name: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  okpo: string;
  ogrn: string;
  inn: string;
  kpp: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
}

interface Hall {
  name: string;
  seating: string;
  days: number;
  cost: number;
}

interface FoodItem {
  packageName: string;
  quantity: number;
  persons: number;
  cost: number;
}

interface Room {
  name: string;
  quantity: number;
  nights: number;
  cost: number;
}

interface RequestDto {
  id: number;
  hotel: IClient;
  halls?: Hall[];
  hallsTotalCost?: number;
  food?: FoodItem[];
  foodTotalCost?: number;
  rooms?: Room[];
  roomsTotalCost?: number;
  totalCost?: number;
}
