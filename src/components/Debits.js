import { Link } from 'react-router-dom';
import { useState } from 'react';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newDebit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0] // yyyy-mm-dd format
    };

    props.addDebit(newDebit);
    setDescription('');
    setAmount('');
  };

  const formatAmount = (num) => {
    return parseFloat(num).toFixed(2);
  };

  return (
    <div>
      <h1>Debits</h1>
      
      <div>
        <h2>Account Balance: ${formatAmount(props.accountBalance)}</h2>
      </div>
      
      <div>
        <h2>Add New Debit</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description: </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Amount: </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Debit</button>
        </form>
      </div>

      <div>
        <h2>Debit History</h2>
        <ul>
          {props.debits.map((debit, index) => (
            <li key={index}>
              <div>Description: {debit.description}</div>
              <div>Amount: ${formatAmount(debit.amount)}</div>
              <div>Date: {debit.date}</div>
            </li>
          ))}
        </ul>
      </div>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
