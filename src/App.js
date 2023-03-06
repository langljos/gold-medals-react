import React, { useState, useEffect, useRef } from 'react';
import Country from './components/Country';
import './App.css';
import { Typography, Box, Container } from '@mui/material';
import NewCountry from './components/NewCountry';
import axios from 'axios';
import { apiEndpoint, hubEndpoint } from "./Constants";
import { HubConnectionBuilder } from '@microsoft/signalr';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [combinedTotal, setCombinedTotal] = useState();
  const [connection, setConnection] = useState(null);
  const latestCountries = useRef(null);
  // latestCountries.current is a ref variable to countries
  // this is needed to access state variable in useEffect w/o dependency
  latestCountries.current = countries;

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(fetchedCountries);
      setCombinedTotal(getCombinedTotal(fetchedCountries));

    }
    fetchData();

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
    if (mutCountries.find( c => c.name.toLowerCase() === country.name.toLowerCase() )){
      alert("Please enter a unique country name.")
      return;
    }

    const { data: postCountry } = await axios.post(apiEndpoint, country);
    mutCountries.push(postCountry);

    setCountries(mutCountries);
    setCombinedTotal(getCombinedTotal(mutCountries));
  }

  const deleteCountry = async (id) => {
    await axios.delete(`${apiEndpoint}/${id}`)
      .then(result => {
        const mutCountries = countries.filter(c => c.id !== id)

        setCountries(mutCountries);
        setCombinedTotal(getCombinedTotal(mutCountries));
      });
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
    specificCountry[propertyName] += valueToAdd;

    const jsonPatch = [{ op: "replace", path: propertyName, value: specificCountry[propertyName] }];
    console.log(`json patch for id: ${specificCountry.id}: ${JSON.stringify(jsonPatch)}`);

    try {
      await axios.patch(`${apiEndpoint}/${specificCountry.id}`, jsonPatch).then(() => {
        setCountries(countriesMutable);
        setCombinedTotal(getCombinedTotal(countriesMutable));
      });

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
  return (
    <div className="App">

      <Box sx={{
        height: 50,
        backgroundColor: 'primary.dark',
        alignItems: 'center',
        justifyContent: "center",
        display: "flex",
      }}>
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
          />)}
      </Container>
      <NewCountry
        onAdd={handleAdd}
      />
    </div>
  );
}

export default App;
