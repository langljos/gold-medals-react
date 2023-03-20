import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from "react-router";


const Login = (props) => {
    const { onLogin } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setOpen(false);
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            onLogin(username, password);
            handleClose();
        }
        else {
            alert("Please enter a valid user name or password.")
        }
    }

    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }



    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="User Name"
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleUsername}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>




    );
}

export default Login;