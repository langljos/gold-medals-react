import React, { Component } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

class Country extends Component {
    // state = {
    //     countryName: 'United States',
    //     goldMedalCount: 0,
    //   }

  //   handleIncrement = () => {
  //   this.setState({ goldMedalCount: this.state.goldMedalCount + 1 })
  // }

  render() { 
    const incrementGold = this.props.incrementGold
    const country = this.props

    return (
        
      <Box
      component="span"
      sx={{ display: 'inline-block', mx: '12px', transform: 'scale(1.0)' }}
    >
        <Card 
        sx={{
          bgcolor: '#e20000',
          minWidth: 275,
          color: '#FFFFFF',
          mt: 10
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
              { country.name }
            </Typography>
            <Typography>
              Gold Medals { country.goldMedalCount }
            </Typography>
            <Typography sx={{color: '#1976d2'}}>
              <Icon onClick={ () => incrementGold(country.id) } className='Country'>add_circle</Icon>

            </Typography>
          </CardContent>
        </Card>

        </Box>
          
        
      );
    }
}

export default Country
