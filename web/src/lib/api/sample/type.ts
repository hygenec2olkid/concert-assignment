export interface TDogResponse {
  data: TDog[];
}

interface TDog {
  attributes: TDogAttributes;
}

interface TDogAttributes {
  name: string;
}
