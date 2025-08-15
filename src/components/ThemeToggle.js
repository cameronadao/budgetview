import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}>
      <IconButton 
        onClick={toggleTheme}
        color="inherit"
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;