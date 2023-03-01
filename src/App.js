import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
import { Typography, Box, Container } from '@mui/material';
import NewCountry from './components/NewCountry';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.apiEndpoint = "https://jlanglois-olympic-medals.azurewebsites.net/api/Country";
    // this.apiEndpoint = "https://localhost:7118/api/Country";
  }

  state = {
    countries: [],
    combinedTotal: 0
  }

  async fetchData() {
    const { data: fetchedCountries } = await axios.get(this.apiEndpoint);
    this.setCountries(fetchedCountries);
  }

  async addCountry(country) {
    const { data: postCountry } = await axios.post(this.apiEndpoint, country);
    let countries = this.state.countries;
    countries.push(postCountry);
    this.setState({ countries: countries });
    this.setCombinedTotal();

  }

  async deleteCountry(id) {
    await axios.delete(`${this.apiEndpoint}/${id}`)
    const countries = this.state.countries.filter(c => c.id !== id)
    this.setState({ countries: countries })
    this.setState({ combinedTotal: countries.reduce((partialSum, country) => partialSum + country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount, 0) });
  }

  setCountries (countries) {
    this.setState({ countries: countries });
  }

  setCombinedTotal() {
    const total = this.state.countries.reduce((partialSum, country) => partialSum + country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount, 0);
    this.setState({ combinedTotal: total });
  }
  

  changeMedal = (countryName, medalType, value) => {
    value = parseInt(value);
 
    let combinedTotalMutable = this.state.combinedTotal

    const countriesMutable = [...this.state.countries];
    let countryIdx = countriesMutable.findIndex(country => country.name === countryName);

    let specificCountry = countriesMutable[countryIdx];

    let specificMedal = specificCountry.medals.findIndex(medal => medal.type === medalType);

    let medalTotal = parseInt(specificCountry.medals[specificMedal].total);

    let countryTotal = parseInt(specificCountry.countryTotal);
    if (medalTotal > 0 || value === 1){
   
      specificCountry.medals[specificMedal].total = medalTotal + value;

      if (countryTotal > 0 || value === 1){
        specificCountry.countryTotal += value
        countriesMutable[countryIdx] = specificCountry;
        this.setState( { countries: countriesMutable} )
        
      }
      if (combinedTotalMutable > 0 || value === 1){
        let newCombinedTotal = combinedTotalMutable + value;
        this.setState({ combinedTotal: (newCombinedTotal)});
      }
    }

    

    // localStorage.setItem('countries', JSON.stringify(this.state.countries));
    // localStorage.setItem('combinedTotal', JSON.stringify(this.state.combinedTotal + value));
  }
  
  componentDidMount() {
    this.fetchData();
    this.setCombinedTotal();
  }
  
  handleAdd = (country) => {
    if (country.name !== ""){
      this.addCountry(country)
    }
  }

  setHeaderTotal () {
    if (!this.state.combinedTotal){
      return "Loading";
    } else {
      return this.state.combinedTotal;
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
              Olympic Medals {this.setHeaderTotal()}
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

        {/* <Fab color="primary"
          sx={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
          }}
          onClick={this.clearLocalStorage}>
            <RestartAltIcon/>
        </Fab> */}
        <NewCountry 
        onAdd={ this.handleAdd }
        // countriesLength={this.state.countries.length}
         />
      </div>
    );
  }
}

export default App;
