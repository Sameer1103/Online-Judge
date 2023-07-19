import { Box, Modal } from '@mui/material';
import React from 'react'

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

const Solution = (props) => {
    const handleClose = () => {
        props.onClose();
    };

    const content = props.content.replace(/\r\n/g, '<br>');

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    {content}
            </Box>
        </Modal>
    )
}

export default Solution;