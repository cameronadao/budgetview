import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionsSlice';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const dispatch = useDispatch();
  const [category, setCategory] = useState('Autre');

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim() || !amount) return;
    
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount * (type === 'expense' ? -1 : 1),
      type,
      date: new Date().toISOString(),
    };
    
    dispatch(addTransaction(newTransaction));
    setText('');
    setAmount('');
  };

  return (
    <FormContainer>
      <h3>Ajouter une transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Libellé</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez un libellé..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Montant</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Entrez un montant..."
          />
        </div>
        <div className="form-control">
          <label>Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
              />
              Revenu
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
              />
              Dépense
            </label>
          </div>
        </div>
        <div className="form-control">
  <label>Catégorie</label>
  <select value={category} onChange={(e) => setCategory(e.target.value)}>
    <option value="Alimentation">Alimentation</option>
    <option value="Logement">Logement</option>
    <option value="Transport">Transport</option>
    <option value="Loisirs">Loisirs</option>
    <option value="Santé">Santé</option>
    <option value="Autre">Autre</option>
  </select>
</div>
        <button className="btn">Ajouter</button>
      </form>
    </FormContainer>
  );
};

export default AddTransaction;