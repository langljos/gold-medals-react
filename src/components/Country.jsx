import React, { Component } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Medal from './Medal';

class Country extends Component {
  render() {
    const country = this.props
    return (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '12px', transform: 'scale(1.0)' }}
      >
        <Card elevation={10} style={{ border: '3px solid black' }}
          sx={{
            bgcolor: '#7A7A7A',
            minWidth: 275,
            color: '#FFFFFF',
            mt: 2
          }}>
          <CardContent>

            <Typography fontWeight="fontWeightBold" variant="h5" component="div" sx={{ color: '#000000' }}>
              {country.name}
            </Typography>

            <Typography fontWeight="fontWeightBold" variant="h5" component="div" sx={{ color: '#000000' }}>
              {country.countryTotal}
            </Typography>

            {country.medals.map(medal =>
              <Medal
                key={medal.type}
                type={medal.type}
                color={medal.color}
                total={medal.total}
                countryName={country.name}
                changeMedal={country.changeMedal}
              />)}
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default Country
