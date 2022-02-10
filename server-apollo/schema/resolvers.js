const { UserListFake, MovieListFake } = require('./FakeData');

const UserList = [...UserListFake];
const MovieList = [...MovieListFake];

const resolvers = {
  Query: {
    // USER QUERY
    users: () => {
      return UserList;
    },
    user: (_, args) => {
      return UserList.find((obj) => obj.id === Number(args.id));
    },
    // MOVIE QUERY
    movies: () => {
      return MovieList;
    },
    movie: (_, args) => {
      return MovieList.find(
        (obj) => obj.name.toLowerCase() === args.name.toLowerCase()
      );
    },
  },
  User: {
    favoriteMovies: () => {
      return MovieList.filter(
        (obj) => obj.yearOfPublication >= 1997 && obj.yearOfPublication <= 2018
      );
    },
  },
  Mutation: {
    // USER MUTATION
    userCreate: (_, args) => {
      const user = {
        ...args.input,
        id: UserList.length + 1,
      };
      UserList.push(user);
      return user;
    },
    userUsernameUpdate: (_, args) => {
      const { id, newUsername } = args.input;
      const index = UserList.findIndex((obj) => obj.id === Number(id));
      const user = UserList[index];
      user.username = newUsername;
      UserList[index] = user;
      return user;
    },
    userDelete: (_, args) => {
      const { id } = args;
      const index = UserList.findIndex((obj) => obj.id === Number(id));
      const user = UserList[index];
      UserList.splice(index, 1);
      return user;
    },
  },
};

module.exports = {
  resolvers,
};
