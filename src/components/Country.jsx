import React, { Component } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';

class Country extends Component {
    state = {
        countryName: 'United States',
        goldMedalCount: 0,
      }

    handleIncrement = () => {
    this.setState({ goldMedalCount: this.state.goldMedalCount + 1 })
  }

  render() { 
    return (
        <Card 
        sx={{
          bgcolor: '#e20000',
          minWidth: 275,
          color: '#FFFFFF',
          mt: 10
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
            { this.state.countryName }
            </Typography>
            <Typography>
            Gold Medals { this.state.goldMedalCount }
            </Typography>
            <Typography sx={{color: '#1976d2'}}>
              <Icon onClick={ this.handleIncrement }>add_circle</Icon>

            </Typography>
          </CardContent>
        </Card>
          
        
      );
    }
}

export default Country
