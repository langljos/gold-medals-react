import React, { Component } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function country(name, bronze, silver, gold) {
  return {
    name: name, 
    bronzeMedalCount: parseInt(bronze), 
    silverMedalCount: parseInt(silver), 
    goldMedalCount: parseInt(gold)}
}

class AddNewCountryDialog extends Component {
    state = {
      open: false,
      bronzeInit: 0,
      silverInit: 0,
      goldInit: 0,
      countryName: '',
    };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const name = this.state.countryName;
    const bronze = this.state.bronzeInit;
    const silver = this.state.silverInit;
    const gold = this.state.goldInit;

    const newCountry = country(name, bronze, silver, gold);

    this.props.onAdd(newCountry)
    this.handleClose();
  }

  handleChange = (e) => {
    if (e){
      this.setState({ [e.target.name]: e.target.value})
    }
  };

render() {
    return (
      <div>
        <Fab color="primary" sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={this.handleClickOpen}>
          <AddIcon />
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
              required
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
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddNewCountryDialog;
