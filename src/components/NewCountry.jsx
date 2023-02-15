import React, { Component } from 'react';
import AddNewCountryDialog from './AddNewCountryDialog';

class NewCountry extends Component {
  render() {
    const countriesLength = this.props.countriesLength
    const onAdd = this.props.onAdd
    return (
        <div>
         <AddNewCountryDialog
          onAdd={ onAdd }
          countriesLength = {countriesLength}
         >
         </AddNewCountryDialog>
      </div>
    );
  }
}

export default NewCountry
