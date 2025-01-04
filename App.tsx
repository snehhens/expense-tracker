import React, { useState } from 'react';


interface Expense {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleAddExpense = () => {
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount: type === 'income' ? amount : -amount,
      type,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount(0);
  };

  const totalBalance = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="min- bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Expense Tracker</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setType('income')}
                className={`flex-1 p-2 rounded-lg ${
                  type === 'income' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setType('expense')}
                className={`flex-1 p-2 rounded-lg ${
                  type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                Expense
              </button>
            </div>
            <button
              onClick={handleAddExpense}
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="text-2xl font-bold">
            Balance: <span className={totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}>${totalBalance}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
          ) : (
            <ul className="space-y-3">
              {expenses.map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(expense.id).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      expense.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {expense.type === 'income' ? '+' : '-'}${Math.abs(expense.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;