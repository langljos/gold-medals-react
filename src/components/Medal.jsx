import React, { Component } from 'react';
import { CardContent, Typography, Grid } from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const colors = [
  { type: 'Bronze', color: '#654321' },
  { type: 'Silver', color: '#C0C0C0' },
  { type: 'Gold', color: '#FFD700' },
];

class Medal extends Component {

  setColor(medalType) {
    return colors.find(c => c.type === medalType).color
  }

  render() {

    const medal = this.props
    const countryName = this.props.countryName
    const changeMedal = this.props.changeMedal
    const propertyName = this.props.propertyName;
    const canPatch = this.props.canPatch;

    return (

      <CardContent>
        <Grid container>
          {canPatch &&
            <Grid item xs={8}>
              <Typography variant="h5" sx={{ color: this.setColor(medal.type) }}>{medal.type}: {medal.total}</Typography>
            </Grid>
          }
          {!canPatch &&
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ color: this.setColor(medal.type) }}>{medal.type}: {medal.total}</Typography>
            </Grid>
          }
          {canPatch &&
            <Grid item xs={4}>
              <Typography fontWeight="fontWeightBold">
                <AddBoxOutlinedIcon sx={{ color: '#00FF00' }} className='Medal' onClick={() => changeMedal(countryName, propertyName, 1)}></AddBoxOutlinedIcon>
                <IndeterminateCheckBoxOutlinedIcon sx={{ color: '#FF0000' }} className='Medal' onClick={() => changeMedal(countryName, propertyName, -1)}></IndeterminateCheckBoxOutlinedIcon>
              </Typography>
            </Grid>
          }
        </Grid>
      </CardContent>
    );
  }
}

export default Medal
