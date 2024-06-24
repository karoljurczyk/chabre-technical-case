import { faker } from "@faker-js/faker";

import { travels } from "~/mocks/travels.js";
import Booking from "~/models/booking";

export const bookings = Array.from(Array(3)).map(
  (_, i) =>
    new Booking({
      id: faker.string.uuid(),
      travelId: travels[i].id,
      userName: faker.person.fullName(),
      userEmail: faker.internet.email(),
      userPhone: faker.phone.number(),
      userAge: faker.number.int({ min: 10, max: 100 }),
      userGender: faker.helpers.arrayElement(["male", "female"]),
      paymentType: faker.helpers.arrayElement(["credit", "paypal", "revolut"]),
      internalNotes: faker.lorem.paragraph(),
    }),
);

export const getAll = () => {
  return bookings.map((booking) => ({
    ...booking,
    travelName: travels.find((v) => v.id === booking.travelId)?.name,
  }));
};

export const getOne = (id: Booking["id"]) => {
  const index = bookings.findIndex((v) => v.id === id);

  return {
    ...bookings[index],
    travelName: travels.find((v) => v.id === bookings[index].travelId)?.name,
  };
};

export const upsert = (booking: Booking) => {
  const _booking = new Booking({ ...booking });

  if (_booking.id) {
    const index = bookings.findIndex((v) => v.id === _booking.id);
    bookings[index] = _booking;
  } else {
    _booking.id = faker.string.uuid();
    bookings.push(_booking);
  }

  return _booking;
};

export const remove = (id: Booking["id"]) => {
  const index = bookings.findIndex((v) => v.id === id);

  bookings.splice(index, 1);

  return true;
};
