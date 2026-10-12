import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { money } from '../utils.js';
import SummaryChart from './SummaryChart.jsx';
import TransactionForm from './TransactionForm.jsx';
import Filters from './Filters.jsx';
import TransactionList from './TransactionList.jsx';


export default function Dashboard({ name, onLogout }) {
  const [dashboard, setDashboard] = useState(null);   // totals, recent, monthly
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ from: '', to: '', category: '', search: '' });
  const [editing, setEditing] = useState(null);       // the transaction being edited (or null)

  // Fetch fresh data from the backend
  async function loadData(currentFilters = filters) {
    setDashboard(await api.getDashboard());
    setTransactions(await api.getTransactions(currentFilters));
  }

  useEffect(() => { loadData().catch(onLogout); }, []); // run once when the page opens

  async function handleSave(data) {
    if (editing) await api.updateTransaction(editing.id, data);
    else await api.addTransaction(data);
    setEditing(null);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this transaction?')) return;
    await api.deleteTransaction(id);
    loadData();
  }

  if (!dashboard) return <p>Loading...</p>;

  return (
    <main>
      <header>
        <h1>Hello, {name}</h1>
        <button className="gray" onClick={onLogout}>Logout</button>
      </header>

      <div className="cards">
        <div className="card"><small>Income</small><h2 className="green">{money(dashboard.totalIncome)}</h2></div>
        <div className="card"><small>Expense</small><h2 className="red">{money(dashboard.totalExpense)}</h2></div>
        <div className="card"><small>Balance</small><h2>{money(dashboard.balance)}</h2></div>
      </div>

      <div className="card">
        <h3>Monthly income vs expense</h3>
        <SummaryChart monthly={dashboard.monthly} />
      </div>

      <div className="card">
        <h3>Recent transactions</h3>
        <TransactionList items={dashboard.recent} />
      </div>

      <TransactionForm editing={editing} onSave={handleSave} onCancel={() => setEditing(null)} />

      <div className="card">
        <h3>All transactions</h3>
        <Filters filters={filters} setFilters={setFilters} onApply={loadData} />
        <TransactionList items={transactions} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </main>
  );
}
