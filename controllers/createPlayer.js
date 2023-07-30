// const { players } = require("../models/playerSchema");
const { faker } = require("@faker-js/faker");

// const createRandomPlayers = () => {
//   return {
//     firstName: faker.name.firstName(),

//     lastName: faker.name.lastName(),

//     country: faker.internet.country(),

//     image: faker.image.avatar(),

//     age: Math.floor(Math.random() * (40 - 18) + 18),

//     position: "defence",

//     playerValue: 1000000,
//   };
// };
const createRandomPlayers = (num, teamName) => {
  const user = [];

  for (let i = 0; i < num; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const age = faker.number.int({ min: 18, max: 40 });
    const country = faker.location.country();
    const position = faker.helpers.arrayElement([
      "goalKeeper",
      "defender",
      "midfielder",
      "attacker",
    ]);
    const imageUrl = faker.image.avatar();

    user.push({
      firstName,
      lastName,
      age,
      country,
      position,
      imageUrl,
      teamName,
    });
  }

  return user;
};
module.exports = createRandomPlayers;
