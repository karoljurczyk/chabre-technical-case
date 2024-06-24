import { number, object, string } from "yup";

export const schema = [
  object({
    travelId: string().required().uuid(),
  }),
  object({
    userName: string().required(),
    userEmail: string().required().email(),
    userPhone: string().required(),
    userAge: number().required().positive(),
    userGender: string().required(),
  }),
  object({
    paymentType: string().required(),
    internalNotes: string().optional(),
  }),
];

export default class Booking {
  id?: string;
  travelId?: string;
  travelName?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAge?: number;
  userGender: "" | "male" | "female";
  paymentType: "" | "credit" | "paypal" | "revolut";
  internalNotes: string;

  constructor(args?: Partial<Booking>) {
    this.id = args?.id ?? undefined;
    this.travelId = args?.travelId ?? undefined;
    this.travelName = args?.travelName ?? undefined;
    this.userName = args?.userName ?? "";
    this.userEmail = args?.userEmail ?? "";
    this.userPhone = args?.userPhone ?? "";
    this.userAge = args?.userAge ?? undefined;
    this.userGender = args?.userGender ?? "";
    this.paymentType = args?.paymentType ?? "";
    this.internalNotes = args?.internalNotes ?? "";
  }
}
