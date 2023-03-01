import React, { Component } from 'react';
import AddNewCountryDialog from './AddNewCountryDialog';

class NewCountry extends Component {
  render() {
    const onAdd = this.props.onAdd
    return (
        <div>
         <AddNewCountryDialog
          onAdd={ onAdd }
         >
         </AddNewCountryDialog>
      </div>
    );
  }
}

export default NewCountry
