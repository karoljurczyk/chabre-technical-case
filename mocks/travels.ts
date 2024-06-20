import { faker } from "@faker-js/faker";

import Travel from "~/models/travel";

const travels =  Array.from(Array(10)).map(
  () =>
    new Travel({
      id: faker.string.uuid(),
      name: faker.location.city(),
      price: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
      picture: faker.image.avatar(),
      description: faker.lorem.paragraph(),
      userRating: faker.number.float({ min: 1, max: 5 }),
      departureDate: faker.date.soon({ days: 5 }),
      returnDate: faker.date.soon({ days: 10 }),
    }),
);

export const getAll = () => {
  return travels;
};

export const getOne = (id: Travel["id"]) => {
  const index = travels.findIndex((v) => v.id === id);

  return travels[index];
};

export const upsert = (travel: Travel) => {
  const _travel = new Travel({ ...travel });

  if (_travel.id) {
    const index = travels.findIndex((v) => v.id === _travel.id);
    travels[index] = _travel;
  } else {
    _travel.id = faker.string.uuid();
    travels.push(_travel);
  }

  return _travel;
};

export const remove = (id: Travel["id"]) => {
  const index = travels.findIndex((v) => v.id === id);

  travels.splice(index, 1);

  return true;
};
