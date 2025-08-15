import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BalanceContainer = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Balance = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <BalanceContainer>
      <h4>Votre Solde</h4>
      <h1>{total}€</h1>
    </BalanceContainer>
  );
};

export default Balance;