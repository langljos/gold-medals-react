import React, { Component } from 'react';
import { CardContent, Typography, Grid } from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

class Medal extends Component {
  render() {
    const medal = this.props
    const countryName = this.props.countryName
    const changeMedal = this.props.changeMedal

    return (

      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{ color: medal.color }}>{medal.total}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{ color: medal.color }}>{medal.type}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="fontWeightBold">
              <AddBoxOutlinedIcon sx={{ color: '#00FF00' }} className='Medal' onClick={() => changeMedal(countryName, medal.type, 1)}></AddBoxOutlinedIcon>
              <IndeterminateCheckBoxOutlinedIcon sx={{ color: '#FF0000' }} className='Medal' onClick={() => changeMedal(countryName, medal.type, -1)}></IndeterminateCheckBoxOutlinedIcon>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}

export default Medal
