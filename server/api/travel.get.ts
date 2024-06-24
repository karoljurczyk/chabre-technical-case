import { getOne } from "~/mocks/travels";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  return getOne(String(query.id));
});
