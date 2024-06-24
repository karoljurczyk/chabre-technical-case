import { remove } from "~/mocks/travels";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  return remove(String(id));
});
