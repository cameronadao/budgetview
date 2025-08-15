import React from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    navigate('/add-transaction');
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Add />
      </Fab>
    </Zoom>
  );
};

export default FloatingActionButton;