import React, { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import user from '../Images/user.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tab, Tabs } from '@mui/material';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import { UserState } from '../Context';

const navbar = css`
    display: flex;
    background-color: red;
    height: 45px;
    padding: 10px;
`
const title = css`
    flex-basis: 70%; 
    margin-left: 20%;
    @media(max-width: 992px){
        margin-left: 10%;
    }
    @media(max-width: 490px){
        margin-left: 1%;
        flex-basis: 50%;
    }
    font-family: Montserrat; 
    font-weight: bold; 
    font-size: 30px;
    color: white;
`
const login = css`
    height: 40px;
    display: flex;
    margin-right: 10%;
    @media(max-width: 490px){
        margin-right: 1%;
    }
    flex-direction: column;
    align-items: center;
`
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 5,
    p: 2,
  };


const Header = () => {
    const [value, setValue] = useState(0);
    const {useremail} = UserState();
    const [username,setUsername] = useState();

    useEffect(()=>{
        if(useremail === undefined) setUsername('Login');
        else setUsername(useremail.split('@')[0]);
    },[useremail]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={navbar}>
            <div className={title}>Online Judge</div>
            <a onClick={handleOpen} className={login}>
                <img src={user} alt='user' height='30px' width='30px' style={{marginBottom: 0}}/>
                <p style={{color: 'white', fontFamily: 'Montserrat', fontSize: '20px', marginTop: 0, paddingTop: 0}}>{username}</p>
            </a>
                
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant='fullWidth'
                            style={{borderRadius: 10}}
                        >
                            <Tab label="Login"/>
                            <Tab label="Sign Up"/>
                        </Tabs>
                    </Box>
                    {value === 0 && <Login handleClose={handleClose}/>}
                    {value === 1 && <Signup handleClose={handleClose}/>}
                </Box>
            </Modal>
        </div>
    )
}

export default Header