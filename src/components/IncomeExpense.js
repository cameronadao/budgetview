import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const IncomeExpenseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  
  .box {
    flex: 1;
    background: ${props => props.theme.cardBackground};
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
    text-align: center;
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
    
    h4 {
      margin-bottom: 10px;
    }
    
    .money {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    &.income .money {
      color: ${props => props.theme.incomeColor};
    }
    
    &.expense .money {
      color: ${props => props.theme.expenseColor};
    }
  }
`;

const IncomeExpense = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  return (
    <IncomeExpenseContainer>
      <div className="box income">
        <h4>Revenus</h4>
        <p className="money">+{income}€</p>
      </div>
      <div className="box expense">
        <h4>Dépenses</h4>
        <p className="money">-{expense}€</p>
      </div>
    </IncomeExpenseContainer>
  );
};

export default IncomeExpense;