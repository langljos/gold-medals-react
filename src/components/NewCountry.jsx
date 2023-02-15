import React, { Component } from 'react';
import { Button } from '@mui/material';

  function country(initBronze, initSilver, initGold) {
    return {id: 0, name: '', countryTotal: 0, medals: [
        { type: 'Bronze', total: initBronze },
        { type: 'Silver', total: initSilver },
        { type: 'Gold', total: initGold },
      ]}
  }


class NewCountry extends Component {
    state = {
        showForm: false,
        bronzeInit: 0,
        silverInit: 0,
        goldInit: 0,
        countryId: 0,
        countryName: '',
        countryTotal: 0,
        newCountry: country
    }

      toggleForm = () => {
        const showForm = this.state.showForm;
        this.setState({ showForm: !showForm });
        if (showForm) {
          this.setState({ newCountry: country });
        }
      }
      
      saveCountry = (length) => {
        let bronze = this.state.bronzeInit;
        let silver = this.state.silverInit;
        let gold = this.state.goldInit;

        let mutableCountry = country(bronze, silver, gold);

        mutableCountry.id = length;
        mutableCountry.name = this.state.countryName;
        mutableCountry.countryTotal = parseInt(bronze) + parseInt(silver) + parseInt(gold);

        this.props.onAdd(mutableCountry)
        this.toggleForm();
      }

      handleChange = (e) => this.setState({ [e.target.name]: e.target.value});

  render() {
    const { showForm, bronzeInit, silverInit, goldInit, countryName } = this.state;
    const countriesLength = this.props.countriesLength

    return (
        <div>
        {
          (showForm) ? 
            <form>
              <input 
                type="text"
                id="countryName."
                name="countryName"
                value={ countryName }
                onChange={ this.handleChange }
                placeholder="Country"
                autoFocus
                autoComplete="off" />
            <input
                type="int"
                id="bronzeInit"
                name="bronzeInit"
                value={ bronzeInit }
                onChange={ this.handleChange }
                placeholder="0"
                autoFocus
                autoComplete="off" />
            <input
                type="int"
                id="silverInit"
                name="silverInit"
                value={ silverInit }
                onChange={ this.handleChange }
                placeholder="0"
                autoFocus
                autoComplete="off" />
            <input
                type="int"
                id="goldInit"
                name="goldInit"
                value={ goldInit }
                onChange={ this.handleChange }
                placeholder="0"
                autoFocus
                autoComplete="off" />
            <Button 
                elevation={10} 
                variant="contained" 
                color="primary" 
                onClick={ () => this.saveCountry(countriesLength)  } >
                Save
            </Button>
            <Button 
                elevation={10} 
                variant="contained" 
                color="primary" 
                onClick={this.toggleForm} >
                Cancel
            </Button>
            </form>
            :
            <Button 
                elevation={10} 
                variant="contained" 
                color="primary" 
                onClick={this.toggleForm} >
                New Word
            </Button>
        }
      </div>
    );
  }
}

export default NewCountry
