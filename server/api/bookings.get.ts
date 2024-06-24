import { getAll } from "~/mocks/bookings"

export default defineEventHandler(() => {
  return getAll();
})
