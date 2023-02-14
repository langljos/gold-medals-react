import React, { Component } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Medal from './Medal';

const countryNameColor = '#000000';
const country = {id: 0, name: '', countryTotal: 0, medals: [
    { type: 'Bronze', total: 0 },
    { type: 'Silver', total: 0 },
    { type: 'Gold', total: 0 },
  ]}
const medals = [
        { type: 'Bronze', total: 0 },
        { type: 'Silver', total: 0 },
        { type: 'Gold', total: 0 },
    ]


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
            // console.log('reaching this')
          this.setState({ newCountry: country });
        }
      }
      
      saveCountry = (length) => {
        // let mutableCountries = countries
        let mutableCountry = country;
        let medalsMutable = medals;
        // console.log('newCountry')
        // console.log(mutableCountry)


        // console.log(length)


        mutableCountry.id = length + 1;
        mutableCountry.name = this.state.countryName;
        // console.log('newCountry id')
        // console.log(newCountry.id)
        // console.log(newCountry.name)

        // console.log('getting state bronze total')
       
        let bronze = medalsMutable[0].total = this.state.bronzeInit;
        let silver = medalsMutable[1].total = this.state.silverInit;
        let gold = medalsMutable[2].total = this.state.goldInit;

        mutableCountry.medals = medalsMutable
        mutableCountry.countryTotal = parseInt(bronze) + parseInt(silver) + parseInt(gold);
        // console.log('mutableCountry.countryTotal')
        // console.log(mutableCountry.countryTotal)

        // console.log(mutableCountry)
        // this.setState({ newCountry: mutableCountry });


        this.props.onAdd(mutableCountry)
        this.toggleForm();

      }


      handleChange = (e) => this.setState({ [e.target.name]: e.target.value});

     
    //   handleClick = (length) => {
        
    //     this.saveCountry(length);
    //   };

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
              {/* <button 
                // disabled={ countryName.trim().length === 0 } 
                onClick={ this.saveCountry(countriesLength) } 
                type="button">
                Save
              </button> */}
            <Button 
                elevation={10} 
                variant="contained" 
                color="primary" 
                onClick={this.toggleForm} >
                Cancel
            </Button>
              {/* <button onClick={this.toggleForm} type="button">Cancel</button> */}
            </form>
            :
            <Button 
                elevation={10} 
                variant="contained" 
                color="primary" 
                onClick={this.toggleForm} >
                New Word
            </Button>
        //   <span onClick={this.toggleForm} className='Toggle-form'>New Word</span>
        }
      </div>
    );
  }
}

export default NewCountry
