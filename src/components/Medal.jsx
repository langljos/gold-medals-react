import React, { Component } from 'react';
import {CardContent, Typography, Grid, IconButton} from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const colors = [
  { type: 'Bronze', color: '#654321' },
  { type: 'Silver', color: '#C0C0C0' },
  { type: 'Gold', color: '#FFD700' },
];

class Medal extends Component {

  setColor(medalType){
    return colors.find(c => c.type === medalType).color
  }

  render() {
    
    const medal = this.props
    const countryName = this.props.countryName
    const changeMedal = this.props.changeMedal
    const propertyName = this.props.propertyName;

    return (

      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ color:  this.setColor(medal.type) }}>{medal.type}: {medal.total}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="fontWeightBold">
              <IconButton onClick={() => changeMedal(countryName, propertyName, 1)}>
                <AddBoxOutlinedIcon sx={{ color: '#00FF00' }} className='Medal'></AddBoxOutlinedIcon>
              </IconButton>
              <IconButton onClick={() => changeMedal(countryName, propertyName, -1)}>
                <IndeterminateCheckBoxOutlinedIcon sx={{ color: '#FF0000' }} className='Medal'></IndeterminateCheckBoxOutlinedIcon>
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}

export default Medal
