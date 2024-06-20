import { getAll } from "~/mocks/travels"

export default defineEventHandler(() => {
  return getAll();
})
