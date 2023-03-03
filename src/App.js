import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
import { Typography, Box, Container } from '@mui/material';
import NewCountry from './components/NewCountry';
import axios from 'axios';
import {apiEndpoint} from "./Constants";

class App extends Component {
  state = {
    countries: [],
    combinedTotal: 0
  }

  async fetchData() {
    const { data: fetchedCountries } = await axios.get(apiEndpoint);
    this.setState({
      countries: fetchedCountries,
      combinedTotal: this.getCombinedTotal(fetchedCountries)
    });
    this.setHeaderTotal();
  }

  async addCountry(country) {
    const { data: postCountry } = await axios.post(apiEndpoint, country);
    let countries = this.state.countries;
    countries.push(postCountry);

    this.setState({
      countries: countries,
      combinedTotal: this.getCombinedTotal(countries)
    });
  }

  async deleteCountry(id) {
    await axios.delete(`${apiEndpoint}/${id}`)
        .then(result => {
          const countries = this.state.countries.filter(c => c.id !== id)

          this.setState({
            countries: countries,
            combinedTotal: this.getCombinedTotal(countries)
          })
        });
  }

  getCombinedTotal(countries) {
    return countries.reduce((partialSum, country) =>
        partialSum + country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount, 0);
  }

  changeMedal = (countryName, propertyName, value) => {
    const countriesMutable = [...this.state.countries];
    const specificCountry = countriesMutable.find(country => country.name === countryName);

    const valueToAdd = value < 0 ? -1 : 1;

    if (!specificCountry || !specificCountry[propertyName] && valueToAdd < 0) {
      return;
    }

    specificCountry[propertyName] += valueToAdd;

    this.setState({
      countries: countriesMutable,
      combinedTotal: this.getCombinedTotal(countriesMutable)
    });
  }
  
  async componentDidMount() {
    await this.fetchData();
  }
  
  handleAdd = (country) => {
    if (country.name !== ""){
      this.addCountry(country)
    }
  }

  setHeaderTotal () {
    if (!this.state.combinedTotal){
      return "No Medals Found";
    } else {
      return "Olympic Medals: " + this.state.combinedTotal;
    }
  }

  render() {
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
              {this.setHeaderTotal()}
        </Typography>
      </Box>
        <Container>
          {(this.state.countries || []).map((country) =>
            <Country
              key={country.id}
              country={country}
              changeMedal={this.changeMedal}
              deleteCountry={this.deleteCountry.bind(this)}
            />)}
        </Container>
        <NewCountry 
        onAdd={ this.handleAdd }
         />
      </div>
    );
  }
}

export default App;
