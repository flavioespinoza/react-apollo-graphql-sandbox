import React, { useState, useMemo, useRef, useEffect, createRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NavLink,
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import ReactJson from 'react-json-view';
import { AppContext } from './context/AppContext';
import logo from 'assets/img/logo-graphql.svg';
import './App.css';
import { isEmptyObj } from '_helpers';

export default function App() {
  const [env, setEnv] = useState(process.env.REACT_APP_ENV);
  const value = useMemo(() => ({ env, setEnv }), [env, setEnv]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `http://localhost:4000`,
  });

  return (
    <ApolloProvider client={client}>
      <div className={'App'}>
        <header className='App-header'>
          <img className={'App-logo'} src={logo} />
          <p>GraphQL Sandbox</p>
        </header>
        <section className={'App-section'}>
          <BrowserRouter>
            <AppContext.Provider value={value}>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='about' element={<About />} />
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </AppContext.Provider>
          </BrowserRouter>
        </section>
      </div>
    </ApolloProvider>
  );
}

function Layout() {
  let activeStyle = {
    color: 'hotpink',
    borderBottom: '1px solid hotpink',
  };

  return (
    <div>
      <div className={'nav-wrapper'}>
        <NavLink
          className={'nav-link'}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={'nav-link'}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to='/about'
        >
          About
        </NavLink>
      </div>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

// USER
const QUERY_GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const MUTATION_USER_CREATE = gql`
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      id
      name
      username
      age
      nationality
    }
  }
`;

// MOVIE
const QUERY_GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const QUERY_GET_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

function DisplayDataUsers() {
  const { data, loading, error, refetch } = useQuery(QUERY_GET_USERS);
  if (error) {
    console.error('ERROR: ', error);
  }
  return (
    <div>
      <DisplayDataUserCreate refetch={refetch} />
      <h3>Users</h3>
      {error && <div>Error</div>}
      {loading && <div>Loading....</div>}
      {data && <ReactJson src={data} />}
    </div>
  );
}

function DisplayDataMovies() {
  const { data, loading, error } = useQuery(QUERY_GET_MOVIES);
  if (error) {
    console.error('ERROR: ', error);
  }
  return (
    <div>
      <h3>Movies</h3>
      {error && <div>Error</div>}
      {loading && <div>Loading....</div>}
      {data && <ReactJson src={data} />}
    </div>
  );
}

function DisplayDataMovieByName() {
  const [name, setName] = useState('');
  const [fetchMovie, { data, loading, error }] = useLazyQuery(
    QUERY_GET_MOVIE_BY_NAME,
    {
      variables: { name },
    }
  );
  const inputRef = useRef(null);

  const handleFetch = (e) => {
    e.preventDefault();
    setName(inputRef.current.value);
    fetchMovie();
  };

  const handleClear = (e) => {
    e.preventDefault();
    inputRef.current.value = '';
    setName('');
  };

  const checkData = (response) => {
    if (!isEmptyObj(response) && response.movie !== null) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h3>Movie search</h3>
      {error && <div>Error</div>}
      {loading && <div>Loading....</div>}
      <label>
        <input
          ref={inputRef}
          type={'text'}
          placeholder={'Enter movie name...'}
        />
      </label>
      <p>
        <button onClick={(e) => handleFetch(e)}>SUBMIT</button>
      </p>
      <p>
        <button onClick={(e) => handleClear(e)}>CLEAR</button>
      </p>
      {checkData(data) && <ReactJson src={data} />}
    </div>
  );
}

function DisplayDataUserCreate(props) {
  const { refetch } = props;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState('');
  const [userCreate] = useMutation(MUTATION_USER_CREATE);
  const [inputs] = useState([
    {
      label: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'username',
      type: 'text',
      required: true,
    },
    {
      label: 'age',
      type: 'number',
      required: true,
    },
    {
      label: 'nationality',
      type: 'text',
      required: false,
    },
  ]);
  const inputRefs = useRef(inputs.map(() => createRef()));

  const handleChange = (value, i) => {
    const key = inputRefs.current[i].current.placeholder;
    if (key === 'name') setName(value);
    if (key === 'username') setUsername(value);
    if (key === 'age') setAge(Number(value));
    if (key === 'nationality') setNationality(value.toUpperCase());
  };

  const handleSubmit = (e) => {
    userCreate({
      variables: {
        input: {
          name,
          username,
          age,
          nationality,
        },
      },
    });
    refetch();
  };

  return (
    <div>
      <h3>User Create</h3>
      {inputs.map((obj, i) => (
        <p key={i}>
          <label>
            <input
              ref={inputRefs.current[i]}
              type={obj.type}
              placeholder={obj.label}
              required={obj.required}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          </label>
        </p>
      ))}
      <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
    </div>
  );
}




function Home() {
  return (
    <div className={'page-wrapper'}>
      <DisplayDataUsers />
      {/* <DisplayDataMovies /> */}
      {/* <DisplayDataMovieByName /> */}
    </div>
  );
}

function About() {
  return (
    <div className={'page-wrapper'}>
      <h2>About</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div className={'page-wrapper'}>
      <h2>Not Found</h2>
      <p>
        <NavLink to='/'>Go to the home page</NavLink>
      </p>
    </div>
  );
}
