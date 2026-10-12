export default function Filters({ filters, setFilters, onApply }) {
  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  function reset() {
    const empty = { from: '', to: '', category: '', search: '' };
    setFilters(empty);
    onApply(empty);
  }

  return (
    <div className="row">
      <input name="from" type="date" value={filters.from} onChange={change} />
      <input name="to" type="date" value={filters.to} onChange={change} />
      <select name="category" value={filters.category} onChange={change}>
        <option value="">All categories</option>
        <option>Income</option>
        <option>Expense</option>
      </select>
      <input name="search" placeholder="Search description" value={filters.search} onChange={change} />
      <button onClick={() => onApply(filters)}>Filter</button>
      <button className="gray" onClick={reset}>Reset</button>
    </div>
  );
}
