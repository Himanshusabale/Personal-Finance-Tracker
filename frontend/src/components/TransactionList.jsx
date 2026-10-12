import { money } from '../utils.js';

// Shows a table. Edit/Delete buttons only appear if those handlers are given.
export default function TransactionList({ items, onEdit, onDelete }) {
  if (items.length === 0) return <p>No transactions yet.</p>;

  return (
    <table>
      <thead>
        <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th>{onEdit && <th></th>}</tr>
      </thead>
      <tbody>
        {items.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.description}</td>
            <td>{t.category}</td>
            <td className={t.category === 'Income' ? 'green' : 'red'}>{money(t.amount)}</td>
            {onEdit && (
              <td>
                <button onClick={() => onEdit(t)}>Edit</button>{' '}
                <button className="gray" onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
