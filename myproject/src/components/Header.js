import React from 'react'
import { css } from '@emotion/css'
import user from '../Images/user.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tab, Tabs } from '@mui/material';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';

const navbar = css`
    display: flex;
    background-color: red;
    height: 40px;
    padding: 10px;
`
const title = css`
    flex-basis: 70%; 
    margin-left: 20%; 
    font-family: Montserrat; 
    font-weight: bold; 
    font-size: 30px;
    color: white;
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={navbar}>
            <div className={title}>Online Judge</div>
            <a onClick={handleOpen}><img src={user} alt='user' height='100%' /></a>

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