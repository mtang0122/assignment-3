import { Link } from 'react-router-dom';
import { useState } from 'react';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newCredit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0] // yyyy-mm-dd format
    };

    props.addCredit(newCredit);
    setDescription('');
    setAmount('');
  };

  const formatAmount = (num) => {
    return parseFloat(num).toFixed(2);
  };

  return (
    <div>
      <h1>Credits</h1>
      
      <div>
        <h2>Account Balance: ${formatAmount(props.accountBalance)}</h2>
      </div>
      
      <div>
        <h2>Add New Credit</h2>
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
          <button type="submit">Add Credit</button>
        </form>
      </div>

      <div>
        <h2>Credit History</h2>
        <ul>
          {props.credits.map((credit, index) => (
            <li key={index}>
              <div>Description: {credit.description}</div>
              <div>Amount: ${formatAmount(credit.amount)}</div>
              <div>Date: {credit.date}</div>
            </li>
          ))}
        </ul>
      </div>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
