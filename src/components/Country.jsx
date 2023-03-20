import React, { Component } from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography, Fab } from '@mui/material';
import Box from '@mui/material/Box';
import Medal from './Medal';
import DeleteIcon from '@mui/icons-material/Delete';

class Country extends Component {

  render() {
    const country = this.props.country
    const changeMedal = this.props.changeMedal
    const deleteCountry = this.props.deleteCountry
    const canDelete = this.props.canDelete
    const canPatch = this.props.canPatch
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
              {(country.bronzeMedalCount + country.silverMedalCount + country.goldMedalCount)}
            </Typography>

            <Medal
              type="Bronze"
              total={country.bronzeMedalCount}
              countryName={country.name}
              changeMedal={changeMedal}
              propertyName="bronzeMedalCount"
              canPatch={canPatch}
            />

            <Medal
              type="Silver"
              total={country.silverMedalCount}
              countryName={country.name}
              changeMedal={changeMedal}
              propertyName="silverMedalCount"
              canPatch={canPatch}
            />

            <Medal
              type="Gold"
              total={country.goldMedalCount}
              countryName={country.name}
              changeMedal={changeMedal}
              propertyName="goldMedalCount"
              canPatch={canPatch}
            />


            {canDelete &&
              <Fab
                color="error"
                size="small"
                onClick={() => deleteCountry(country.id)} >
                <DeleteIcon />
              </Fab>
            }

          </CardContent>

        </Card>
      </Box>
    );
  }
}

export default Country
