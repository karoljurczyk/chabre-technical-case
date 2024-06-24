import { upsert } from "~/mocks/travels";

export default defineEventHandler(async (event) => {
  const { travel } = await readBody(event);

  return upsert(travel);
});
