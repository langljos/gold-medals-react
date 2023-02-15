import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
import { Typography, Box, Fab, Container } from '@mui/material';
import NewCountry from './components/NewCountry';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

class App extends Component {
  state = {
    countries: [
      {
        id: 0, name: 'United States', countryTotal: 8, medals: [
          { type: 'Bronze', total: 2 },
          { type: 'Silver', total: 2 },
          { type: 'Gold', total: 4 },
        ]
      },
      {
        id: 1, name: 'China', countryTotal: 7, medals: [
          { type: 'Bronze', total: 2 },
          { type: 'Silver', total: 3 },
          { type: 'Gold', total: 2 },
        ]
      },
      {
        id: 2, name: 'Germany', countryTotal: 4, medals: [
          { type: 'Bronze', total: 1 },
          { type: 'Silver', total: 3 },
          { type: 'Gold', total: 0 },
        ]
      },
    ],
    combinedTotal: 19

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
    localStorage.setItem('countries', JSON.stringify(this.state.countries));
    localStorage.setItem('combinedTotal', JSON.stringify(this.state.combinedTotal + value));
  }
  
  componentDidMount() {
    let storedCountries = localStorage.getItem('countries');
    
    let storedCombinedTotals = localStorage.getItem('combinedTotal');
    // console.log(storedCombinedTotals)
    
    if (storedCountries) {
      this.setState({ countries: (JSON.parse(storedCountries)) });
    }
    if (storedCombinedTotals) {
      console.log(this.state.combinedTotal)
      this.setState({ combinedTotal: parseInt(storedCombinedTotals) });
      console.log(this.state.combinedTotal)
    }
  }

  clearLocalStorage() {
    localStorage.clear()
    window.location.reload()
  }

  
  handleAdd = (country) => {
    const mutableCountries = [...this.state.countries, country];

    if (country.name !== ""){
      this.setState({ countries: mutableCountries });
      this.setState({ combinedTotal: this.state.combinedTotal + country.countryTotal})

      localStorage.setItem('countries', JSON.stringify(this.state.countries));
      localStorage.setItem('combinedTotal', JSON.stringify(this.state.combinedTotal));
    }
  }

  deleteCountry = (countryId) => {
    let mutableCountries = this.state.countries;
    let mutableCombinedTotal = this.state.combinedTotal;

    mutableCombinedTotal = mutableCombinedTotal - mutableCountries[countryId].countryTotal;
    
    for (let i = 0; i < mutableCountries.length; i++){
      if (mutableCountries[i].id > countryId){
        mutableCountries[i].id = mutableCountries[i].id - 1;
      }
    }
      mutableCountries.splice(countryId, 1);
      
    this.setState({ countries: mutableCountries });
    this.setState({ combinedTotal: mutableCombinedTotal})

    localStorage.setItem('countries', JSON.stringify(this.state.countries));
    localStorage.setItem('combinedTotal', JSON.stringify(this.state.combinedTotal));
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
              Olympic Medals {this.state.combinedTotal}
        </Typography>
      </Box>
        <Container>
          {this.state.countries.map((country) =>
            <Country
              key={country.id}
              id={country.id}
              name={country.name}
              medals={country.medals}
              countryTotal={country.countryTotal}
              changeMedal={this.changeMedal}
              deleteCountry={this.deleteCountry}
            />)}
        </Container>

        <Fab color="primary"
          sx={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
          }}
          onClick={this.clearLocalStorage}>
            <RestartAltIcon/>
        </Fab>
        <NewCountry 
        onAdd={ this.handleAdd }
        countriesLength={this.state.countries.length}
         />
      </div>
    );
  }
}

export default App;
