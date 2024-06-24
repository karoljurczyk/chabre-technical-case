import { upsert } from "~/mocks/bookings";

export default defineEventHandler(async (event) => {
  const { travel } = await readBody(event);

  return upsert(travel);
});
