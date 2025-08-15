import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  .MuiCard-root {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }

  /* Responsive styles */
  @media (max-width: 600px) {
    .MuiTypography-h4 {
      font-size: 1.5rem;
    }
    
    .MuiTypography-h5 {
      font-size: 1.25rem;
    }
    
    .MuiTypography-h6 {
      font-size: 1rem;
    }
  }
`;

export default GlobalStyles;