import { useEffect, useState } from 'react';

const emptyForm = { amount: '', date: '', category: 'Expense', description: '' };

export default function TransactionForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  // When the user clicks "Edit" on a row, fill the form with that row
  useEffect(() => { setForm(editing || emptyForm); }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    try {
      await onSave(form);
      setForm(emptyForm);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3>{editing ? 'Edit transaction' : 'Add transaction'}</h3>
      <div className="row">
        <input name="amount" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={change} />
        <input name="date" type="date" value={form.date} onChange={change} />
        <select name="category" value={form.category} onChange={change}>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <input name="description" placeholder="Description" value={form.description} onChange={change} />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" className="gray" onClick={onCancel}>Cancel</button>}
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
