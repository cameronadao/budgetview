import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../features/transactions/transactionsSlice';
import styled from 'styled-components';

const ListContainer = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  
  &:last-child {
    border-bottom: none;
  }
  
  .amount {
    font-weight: bold;
    color: ${props => props.type === 'income' ? props.theme.incomeColor : props.theme.expenseColor};
  }
  
  .delete-btn {
    background: none;
    border: none;
    color: ${props => props.theme.dangerColor};
    cursor: pointer;
    font-size: 1.2rem;
    
    &:hover {
      color: ${props => props.theme.dangerHoverColor};
    }
  }
`;

const TransactionList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  return (
    <ListContainer>
      <h3>Historique des transactions</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} type={transaction.type}>
            <div>
              <span>{transaction.text}</span>
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="amount">
                {transaction.amount < 0 ? '-' : '+'}
                {Math.abs(transaction.amount).toFixed(2)}€
              </span>
              <button 
                className="delete-btn"
                onClick={() => dispatch(deleteTransaction(transaction.id))}
              >
                ×
              </button>
            </div>
          </TransactionItem>
        ))}
      </ul>
    </ListContainer>
  );
};

export default TransactionList;