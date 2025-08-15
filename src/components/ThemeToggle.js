import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';

const ToggleContainer = styled.button`
  background: ${props => props.theme.cardBackground};
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    opacity: 0.9;
  }
  
  .icon {
    font-size: 1.2rem;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme}>
      <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
    </ToggleContainer>
  );
};

export default ThemeToggle;