import { getOne } from "~/mocks/bookings";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  return getOne(String(query.id));
});
