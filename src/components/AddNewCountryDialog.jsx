import React, { Component } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Fab} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function country(initBronze, initSilver, initGold) {
  return {id: 0, name: '', countryTotal: 0, medals: [
      { type: 'Bronze', total: initBronze },
      { type: 'Silver', total: initSilver },
      { type: 'Gold', total: initGold },
    ]}
}

class AddNewCountryDialog extends Component {
    state = {
      open: false,
      bronzeInit: 0,
      silverInit: 0,
      goldInit: 0,
      countryId: 0,
      countryName: '',
      countryTotal: 0,
      newCountry: country
    };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = (length) => {
    let bronze = this.state.bronzeInit;
    let silver = this.state.silverInit;
    let gold = this.state.goldInit;

    let mutableCountry = country(bronze, silver, gold);

    mutableCountry.id = length;
    mutableCountry.name = this.state.countryName;
    mutableCountry.countryTotal = parseInt(bronze) + parseInt(silver) + parseInt(gold);

    this.props.onAdd(mutableCountry)
    this.handleClose();
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value});

render() {
  const countriesLength = this.props.countriesLength
    return (
      <div>
        <Fab color="primary" sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={this.handleClickOpen}>
          <AddCircleIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add Country</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the following to add a new country:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Country Name"
              name="countryName"
              type="text"
              value={this.state.countryName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Bronze Medals"
              name="bronzeInit"
              type="number"
              value={this.state.bronzeInit}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Silver Medals"
              name="silverInit"
              type="number"
              value={this.state.silverInit}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Gold Medals"
              name="goldInit"
              type="number"
              value={this.state.goldInit}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSave(countriesLength)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddNewCountryDialog;
