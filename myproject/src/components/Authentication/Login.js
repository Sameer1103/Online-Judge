import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { saveProfileInfo } from '../../service/api';
import { UserState } from '../../Context';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUserEmail} = UserState();

    var validateEmail = function (email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    };

    const handleSubmit = async () => {
        if (validateEmail(email)) {
            const data = {
                email: email,
                password: password,
            };
            const response = await saveProfileInfo(data);
            if(response.exists){
                alert("Welcome "+ email);
                setUserEmail(email);
            }
            else alert("Invalid email-Id and/or password");
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
            <Button
                variant='contained'
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    )
}

export default Login