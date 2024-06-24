import { remove } from "~/mocks/bookings";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  return remove(String(id));
});
