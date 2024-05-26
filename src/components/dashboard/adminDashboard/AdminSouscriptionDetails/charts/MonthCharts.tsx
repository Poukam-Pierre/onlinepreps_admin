// Made by Poukam Ngamaleu
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { souscriptionDataFetched } from '../SouscriptionDetails'

interface monthChartProps {
    monthsDataFetched: souscriptionDataFetched[]
}

export default function MonthCharts({ monthsDataFetched }: monthChartProps) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={730}
                height={250}
                data={monthsDataFetched}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="days" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#value)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

