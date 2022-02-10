const UserListFake = [
  {
    id: 1,
    name: 'John',
    username: 'john',
    age: 20,
    nationality: 'CANADA',
    friends: [
      {
        id: 2,
        name: 'Pedro',
        username: 'PedroTech',
        age: 20,
        nationality: 'BRAZIL',
      },
      {
        id: 5,
        name: 'Kelly',
        username: 'kelly2019',
        age: 5,
        nationality: 'CHILE',
      },
    ],
  },
  {
    id: 2,
    name: 'Pedro',
    username: 'PedroTech',
    age: 20,
    nationality: 'BRAZIL',
  },
  {
    id: 3,
    name: 'Sarah',
    username: 'cameron',
    age: 25,
    nationality: 'INDIA',
    friends: [
      {
        id: 2,
        name: 'Pedro',
        username: 'PedroTech',
        age: 20,
        nationality: 'BRAZIL',
      },
    ],
  },
  {
    id: 4,
    name: 'Anja',
    username: 'anjarey@example.com',
    age: 60,
    nationality: 'GERMANY',
  },
  {
    id: 5,
    name: 'Kelly',
    username: 'kelly2019',
    age: 5,
    nationality: 'CHILE',
  },
];

const MovieListFake = [
  {
    id: 1,
    name: 'Gattaca',
    yearOfPublication: 1997,
    isInTheaters: false,
  },
  {
    id: 2,
    name: 'Pulp Fiction',
    yearOfPublication: 1994,
    isInTheaters: false,
  },
  {
    id: 3,
    name: 'Interstellar',
    yearOfPublication: 2007,
    isInTheaters: false,
  },
  {
    id: 4,
    name: `Ender's Game`,
    yearOfPublication: 2013,
    isInTheaters: false,
  },
  {
    id: 5,
    name: 'Superbad',
    yearOfPublication: 2009,
    isInTheaters: false,
  },
  {
    id: 6,
    name: 'Dune',
    yearOfPublication: 2021,
    isInTheaters: true,
  },
  {
    id: 7,
    name: `The King's Man`,
    yearOfPublication: 2021,
    isInTheaters: true,
  },
];

module.exports = { UserListFake, MovieListFake };
