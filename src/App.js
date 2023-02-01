import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
// import Container from '@mui/material/Container';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 2 },
      { id: 2, name: 'China', goldMedalCount: 3 },
      { id: 3, name: 'Germany', goldMedalCount: 0 },
    ]
  }
  
  handleIncrement = (countryId) => {
    const countriesMutable = this.state.countries
    const idx = countriesMutable.findIndex(country => country.id === countryId)
    countriesMutable[idx].goldMedalCount += 1
    this.setState({ countries:countriesMutable })
  }
  
  render() {
    return (
      <div className="App">
      
      { this.state.countries.map( country =>
      <Country 
        key={ country.id }
        id= { country.id }
        name={ country.name }
        goldMedalCount= { country.goldMedalCount }
        incrementGold= { this.handleIncrement }
      />)}
          
        </div>
    );
  }
}



export default App;
