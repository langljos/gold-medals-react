import React, { useState, useEffect, useRef } from 'react';
import Country from './components/Country';
import './App.css';
import { Typography, Box, Container } from '@mui/material';
import NewCountry from './components/NewCountry';
import axios from 'axios';
import { apiEndpoint, hubEndpoint, usersEndpoint } from "./Constants";
import { HubConnectionBuilder } from '@microsoft/signalr';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [combinedTotal, setCombinedTotal] = useState();
  const [connection, setConnection] = useState(null);
  const latestCountries = useRef(null);
  // latestCountries.current is a ref variable to countries
  // this is needed to access state variable in useEffect w/o dependency
  latestCountries.current = countries;

  const [user, setUser] = useState(
    {
      name: null,
      canPost: false,
      canPatch: false,
      canDelete: false
    }
  );

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(fetchedCountries);
      setCombinedTotal(getCombinedTotal(fetchedCountries));

    }
    fetchData();

    const encodedJwt = localStorage.getItem("token");
    // check for existing token
    if (encodedJwt) {
      setUser(getUser(encodedJwt));
    }

    // signalR
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!')

          connection.on('ReceiveAddMessage', country => {
            console.log(`Add: ${country.name}`);
            let mutableCountries = [...latestCountries.current];
            mutableCountries = mutableCountries.concat(country);

            setCountries(mutableCountries);
            setCombinedTotal(getCombinedTotal(mutableCountries));
          });

          connection.on('ReceiveDeleteMessage', id => {
            console.log(`Delete id: ${id}`);
            let mutableCountries = [...latestCountries.current];
            mutableCountries = mutableCountries.filter(c => c.id !== id);
            setCountries(mutableCountries);
            setCombinedTotal(getCombinedTotal(mutableCountries));
          });

          connection.on('ReceivePatchMessage', country => {
            console.log(`Patch: Name: ${country.name} Id: ${country.id}`);
            let mutableCountries = [...latestCountries.current];
            const idx = mutableCountries.findIndex(c => c.id === country.id);
            mutableCountries[idx] = country;

            setCountries(mutableCountries);
            setCombinedTotal(getCombinedTotal(mutableCountries));
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
    // useEffect is dependent on changes connection
  }, [connection]);


  const addCountry = async (country) => {
    let mutCountries = countries;
    if (mutCountries.find(c => c.name.toLowerCase() === country.name.toLowerCase())) {
      alert("Please enter a unique country name.")
      return;
    }

    try {
      var { data: postCountry } = await axios.post(apiEndpoint + '/', country, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      mutCountries.push(postCountry);

      setCountries(mutCountries);
      setCombinedTotal(getCombinedTotal(mutCountries));
    } catch (ex) {
      if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
        alert("You are not authorized to complete this request");
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }
  }

  const deleteCountry = async (id) => {
    console.log('token')
    try {
      await axios.delete(`${apiEndpoint}/${id}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const mutCountries = countries.filter(c => c.id !== id)
      setCountries(mutCountries);
      setCombinedTotal(getCombinedTotal(mutCountries));
    } catch (ex) {
      console.log('error')
      console.log(ex)
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else {
        if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
          alert("You are not authorized to complete this request");
        } else if (ex.response) {
          console.log(ex.response);
        } else {
          console.log("Request failed");
        }
      }
    }
  }

  const getCombinedTotal = (countries) => {
    return countries.reduce((partialSum, country) =>
      partialSum + country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount, 0);
  }

  const changeMedal = async (countryName, propertyName, value) => {
    const countriesMutable = [...countries];
    const specificCountry = countriesMutable.find(country => country.name === countryName);
    const valueToAdd = value < 0 ? -1 : 1;

    if (!specificCountry || (!specificCountry[propertyName] && valueToAdd < 0)) {
      return;
    }
    if (specificCountry[propertyName] < 100 || (specificCountry[propertyName] <= 100 && valueToAdd === -1)) {
      specificCountry[propertyName] += valueToAdd;
    }

    const jsonPatch = [{ op: "replace", path: propertyName, value: specificCountry[propertyName] }];
    console.log(`json patch for id: ${specificCountry.id}: ${JSON.stringify(jsonPatch)}`);

    try {
      await axios.patch(`${apiEndpoint}/${specificCountry.id}/`, jsonPatch, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCountries(countriesMutable);
      setCombinedTotal(getCombinedTotal(countriesMutable));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else {
        alert('An error occurred while updating');
      }
    }
  }

  const handleAdd = (country) => {
    if (country.name !== "") {
      addCountry(country)
    }
  }

  const setHeaderTotal = () => {
    if (!combinedTotal) {
      return "No Medals Found";
    } else {
      return "Olympic Medals: " + combinedTotal;
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const resp = await axios.post(usersEndpoint, { username: username, password: password });
      const encodedJwt = resp.data.token;
      localStorage.setItem('token', encodedJwt);
      setUser(getUser(encodedJwt));
    } catch (ex) {
      if (ex.response && (ex.response.status === 401 || ex.response.status === 400)) {
        alert("Login failed");
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
        console.log(ex.response);
      }
    }
  }

  const getUser = (encodedJwt) => {
    // return unencoded user / permissions
    const decodedJwt = jwtDecode(encodedJwt);
    return {
      name: decodedJwt['username'],
      canPost: decodedJwt['roles'].indexOf('admin') === -1 ? false : true,
      canPatch: decodedJwt['roles'].indexOf('admin') === -1 ? false : true,
      canDelete: decodedJwt['roles'].indexOf('admin') === -1 ? false : true,
    };
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('logout');
    localStorage.removeItem('token');
    setUser({
      name: null,
      canPost: false,
      canPatch: false,
      canDelete: false
    });
    return false;
  }


  return (
    <div className="App">
      <Router>
        {user.name ?
          <span className='logout'><a href="/" onClick={handleLogout} className='logoutLink'>Logout</a> [{user.name}]</span>
          :
          <Link to="/login" className='loginLink'>Login</Link>
        }
        <Box sx={{
          height: 50,
          backgroundColor: 'primary.dark',
          alignItems: 'center',
          justifyContent: "center",
          display: "flex",
        }}>
          <Routes>


            <Route exact path="/login" element={<Login onLogin={handleLogin} />}></Route>


          </Routes>
          <Typography fontWeight="fontWeightBold" variant="h5" component="div" sx={{ color: '#000000' }}>
            {setHeaderTotal()}
          </Typography>
        </Box>
        <Container>
          {(countries || []).map(country =>
            <Country
              key={country.id}
              country={country}
              changeMedal={changeMedal}
              deleteCountry={deleteCountry.bind(this)}
              canDelete={user.canDelete}
              canPatch={user.canPatch}
            />)}
        </Container>
        {user.canPost && <NewCountry onAdd={handleAdd} />}
      </Router>

    </div>
  );
}

export default App;
