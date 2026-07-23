import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ActivityPoint } from '../../domain/entities/dashboardStats';

const AXIS_COLOR = '#94a3b8';

export function ActivityLineChart({ data }: { data: ActivityPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#418839" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#418839" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={AXIS_COLOR} strokeOpacity={0.2} />
        <XAxis
          dataKey="day"
          tick={{ fill: AXIS_COLOR, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
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
        <Area
          type="monotone"
          dataKey="count"
          stroke="#418839"
          strokeWidth={2.5}
          fill="url(#activityFill)"
          dot={{ fill: '#418839', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
