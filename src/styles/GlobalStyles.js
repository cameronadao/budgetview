import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  h1 {
    color: ${props => props.theme.primary};
  }

  h3 {
    margin-bottom: 15px;
    color: ${props => props.theme.secondary};
  }

  .form-control {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 5px;
    background-color: ${props => props.theme.cardBackground};
    color: ${props => props.theme.text};
  }

  .radio-group {
    display: flex;
    gap: 15px;
  }

  .btn {
    background-color: ${props => props.theme.primary};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: ${props => props.theme.secondary};
    }
  }

  .list {
    list-style: none;
    max-height: 300px;
    overflow-y: auto;
  }

  @media (max-width: 600px) {
    .container {
      padding: 10px;
    }
    
    header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .box {
      margin: 0 5px !important;
    }
  }
`;