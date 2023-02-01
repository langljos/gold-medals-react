import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

class App extends Component {
  state = {
    countries: [
      {
        id: 1, name: 'United States', countryTotal: 8, medals: [
          { type: 'Bronze', total: 2, color: '#654321' },
          { type: 'Silver', total: 2, color: '#C0C0C0' },
          { type: 'Gold', total: 4, color: '#FFD700' },
        ]
      },
      {
        id: 2, name: 'China', countryTotal: 7, medals: [
          { type: 'Bronze', total: 2, color: '#654321' },
          { type: 'Silver', total: 3, color: '#C0C0C0' },
          { type: 'Gold', total: 2, color: '#FFD700' },
        ]
      },
      {
        id: 3, name: 'Germany', countryTotal: 4, medals: [
          { type: 'Bronze', total: 1, color: '#654321' },
          { type: 'Silver', total: 3, color: '#C0C0C0' },
          { type: 'Gold', total: 0, color: '#FFD700' },
        ]
      },
    ]
  }

  addMedal = (countryName, medalType) => {
    const countriesMutable = this.state.countries
    const countryIdx = countriesMutable.findIndex(country => country.name === countryName)
    const medalsMutable = countriesMutable[countryIdx].medals
    medalsMutable.findIndex(medal => medal.type === medalType)
    const medalsIdx = medalsMutable.findIndex(medal => medal.type === medalType)
    medalsMutable[medalsIdx].total += 1
    this.computeTotals(true, countriesMutable, countryIdx)
    this.setState({ medals: medalsMutable })
    localStorage.setItem('countries', JSON.stringify(this.state.countries))
  }

  removeMedal = (countryName, medalType) => {
    const countriesMutable = this.state.countries
    const countryIdx = countriesMutable.findIndex(country => country.name === countryName)
    const medalsMutable = countriesMutable[countryIdx].medals
    medalsMutable.findIndex(medal => medal.type === medalType)
    const medalsIdx = medalsMutable.findIndex(medal => medal.type === medalType)
    if (medalsMutable[medalsIdx].total !== 0) {
      medalsMutable[medalsIdx].total -= 1
      this.computeTotals(false, countriesMutable, countryIdx)
      this.setState({ medals: medalsMutable })
      localStorage.setItem('countries', JSON.stringify(this.state.countries))
    }
  }

  // accepts boolean, countriesMutable, and countryIdx from add and remove medal functions  -- true = add -- false = subtract
  // sets countriesMutable before medalsMutable in add and remove medal functions allowing a total medal count
  computeTotals = (addOrSubract, countriesMutable, countryIdx) => {
    var mutableCountry = countriesMutable[countryIdx]
    var newCountryTotal
    if (addOrSubract){
      newCountryTotal = mutableCountry.countryTotal = mutableCountry.countryTotal + 1
      this.setState({ countryTotal: newCountryTotal})
    } else if (!addOrSubract){
      newCountryTotal = mutableCountry.countryTotal = mutableCountry.countryTotal - 1
      this.setState({ countryTotal: newCountryTotal})
    }
  }

  componentDidMount() {
    const storedCountries = localStorage.getItem('countries');
    if (storedCountries) {
      this.setState({ countries: JSON.parse(storedCountries) });
    }
  }

  clearLocalStorage() {
    localStorage.clear()
    window.location.reload()
  }

  render() {
    return (
      <div className="App">
        <Container>
          {this.state.countries.map(country =>
            <Country
              key={country.id}
              id={country.id}
              name={country.name}
              medals={country.medals}
              countryTotal={country.countryTotal}
              addMedal={this.addMedal}
              removeMedal={this.removeMedal}
              computeTotals={this.computeTotals}
            />)}
        </Container>
        <Button elevation={10} variant="contained" color="primary" onClick={this.clearLocalStorage}>Reset All</Button>
      </div>
    );
  }
}

export default App;
