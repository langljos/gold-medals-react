import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 2, silverMedalCount: 0, bronzeMedalCount: 0 },
      { id: 2, name: 'China', goldMedalCount: 3, silverMedalCount: 0, bronzeMedalCount: 0 },
      { id: 3, name: 'Germany', goldMedalCount: 0, silverMedalCount: 0, bronzeMedalCount: 0 },
    ]
  }

  componentDidMount() {
    const storedCountries = localStorage.getItem('countries');
    
    if (storedCountries) {
      this.setState({ countries: JSON.parse(storedCountries) });
    }
  }
  
  
  handleIncrement = (countryId, medalType) => {
    const countriesMutable = this.state.countries
    const idx = countriesMutable.findIndex(country => country.id === countryId)
    if (medalType === 'bronze') {

    } else if (medalType === 'silver') {

    } else if (medalType === 'gold') {

    }

    countriesMutable[idx].goldMedalCount += 1
    this.setState({ countries:countriesMutable })
    localStorage.setItem('countries', JSON.stringify(this.state.countries))
  }
  
  clearLocalStorage() {
    localStorage.clear()
    window.location.reload()
  }

  render() {
    return (
      <div className="App">
      <Container>
      { this.state.countries.map( country =>
      <Country 
        key={ country.id }
        id= { country.id }
        name={ country.name }
        goldMedalCount= { country.goldMedalCount }
        incrementGold= { this.handleIncrement }
      />)}

      
      </Container>
      <Button variant="contained" color="primary" onClick={this.clearLocalStorage}>Reset All</Button>
      
      </div>
    );
  }
}



export default App;
