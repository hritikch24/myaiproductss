import { Check, X } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  ai: boolean | string;
  traditional: boolean | string;
}

interface ComparisonTableProps {
  title: string;
  rows: ComparisonRow[];
}

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-slate-300">{value}</span>;
  }
  if (value) {
    return <Check className="h-5 w-5 text-emerald-400 mx-auto" aria-label="Yes" />;
  }
  return <X className="h-5 w-5 text-red-400 mx-auto" aria-label="No" />;
}

export default function ComparisonTable({ title, rows }: ComparisonTableProps) {
  return (
    <section aria-label={title}>
      <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900">
              <th
                scope="col"
                className="px-6 py-4 text-sm font-semibold text-white"
              >
                Feature
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-semibold text-indigo-400"
              >
                AI Automation
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-semibold text-slate-400"
              >
                Traditional / Manual
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? 'bg-slate-950'
                    : 'bg-slate-900/50'
                }
              >
                <td className="px-6 py-3.5 text-sm text-slate-300">
                  {row.feature}
                </td>
                <td className="px-6 py-3.5 text-center">
                  <CellValue value={row.ai} />
                </td>
                <td className="px-6 py-3.5 text-center">
                  <CellValue value={row.traditional} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
