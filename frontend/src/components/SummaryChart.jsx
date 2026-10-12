import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SummaryChart({ monthly }) {
  const data = {
    labels: monthly.map((m) => m.month),
    datasets: [
      { label: 'Income', data: monthly.map((m) => m.income), backgroundColor: '#16a34a' },
      { label: 'Expense', data: monthly.map((m) => m.expense), backgroundColor: '#dc2626' },
    ],
  };
  return <Bar data={data} />;
}
