import { BarChart } from '@mui/x-charts/BarChart';

export default function BarCharts() {
    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'G'] }]}
            series={[{ data: [20, 30, 5, 0, 10] }]}
            width={250}
            height={170}
        />
    );
}
