import { date, number, object, string } from "yup";

export const schema = object({
  name: string().required(),
  price: number().required().positive(),
  picture: string().required().url(),
  description: string().required(),
  userRating: number().required().min(1).max(5),
  departureDate: date().required(),
  returnDate: date().required(),
});

export default class Travel {
  id?: string;
  name: string;
  price?: number;
  picture: string;
  description: string;
  userRating?: number;
  departureDate?: Date;
  returnDate?: Date;

  constructor(args?: Partial<Travel>) {
    this.id = args?.id ?? undefined;
    this.name = args?.name ?? "";
    this.price = args?.price ?? undefined;
    this.picture = args?.picture ?? "";
    this.description = args?.description ?? "";
    this.userRating = args?.userRating ?? undefined;
    this.departureDate = args?.departureDate ?? undefined;
    this.returnDate = args?.returnDate ?? undefined;
  }
}
