import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CategoryCount } from '../../domain/entities/dashboardStats';
import { categoryLabel } from '@/shared/domain/wasteCategory';

const AXIS_COLOR = '#94a3b8';

export function CategoryBarChart({ data }: { data: CategoryCount[] }) {
  const chartData = data.map((d) => ({
    name: categoryLabel(d.category),
    count: d.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={AXIS_COLOR} strokeOpacity={0.2} />
        <XAxis
          dataKey="name"
          tick={{ fill: AXIS_COLOR, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(65,136,57,0.08)' }}
          contentStyle={{
            borderRadius: 12,
            border: '1px solid rgb(var(--tf-stroke))',
            background: 'rgb(var(--tf-card))',
            color: 'rgb(var(--tf-content))',
            fontSize: 13,
          }}
          labelStyle={{ color: 'rgb(var(--tf-content))', fontWeight: 600 }}
          formatter={(value) => [`${value} publicaciones`, '']}
        />
        <Bar dataKey="count" fill="#418839" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
