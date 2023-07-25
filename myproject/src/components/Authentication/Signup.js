import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { saveProfileInfo } from '../../service/api';
import { UserState } from '../../Context';

const Signup = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const { setUserEmail } = UserState();

    var validateEmail = function (email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    };

    const handleSubmit = async () => {
        if (password === confirmpassword && validateEmail(email)) {
            const data = {
                email: email,
                password: password,
            };
            const response = await saveProfileInfo(data);
            alert("Welcome " + email);
            setUserEmail(email);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('accessTokenExpire', Date.now() + 14 * 60 * 1000);
        }
        else {
            alert("Invalid email-Id and/or password");
        }
        handleClose();
    }

    return (
        <Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
                variant='outlined'
                type='email'
                label='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant='outlined'
                type='password'
                label='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <TextField
                variant='outlined'
                type='password'
                label='Confirm Password'
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant='contained'
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box>
    )
}

export default Signup