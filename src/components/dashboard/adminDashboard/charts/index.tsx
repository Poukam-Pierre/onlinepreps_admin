// Made by Poukam Ngamaleu
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data: { name: string; total: number }[] = [
  { name: 'Janvier', total: 540 },
  { name: 'Fevrier', total: 9000 },
  { name: 'Mars', total: 80 },
  { name: 'Avril', total: 7000 },
  { name: 'Mai', total: 6500 },
  { name: 'Juin', total: 1540 },
  { name: 'Juillet', total: 3500 },
  { name: 'Septembre', total: 5000 },
  { name: 'Octobre', total: 7500 },
  { name: 'Novembre', total: 10000 },
  { name: 'Decembre', total: 15000 },
]

function Charts() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#total)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Charts
