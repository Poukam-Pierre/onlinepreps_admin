import { BarChart } from '@mui/x-charts/BarChart';
import { testCategoryStat } from './PartnersDetails';
import { theme } from '../../../../utils/style/theme';

interface barChartProps {
    dataSet: testCategoryStat[]
}
export default function BarCharts({ dataSet }: barChartProps) {
    return (
        <BarChart
            dataset={dataSet}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'category',
                    colorMap: {
                        type: 'piecewise',
                        thresholds: [0],
                        colors: [theme.palette.primary.light]
                    }
                },
            ]}
            series={[{ dataKey: 'value' }]}
            width={250}
            height={170}
        />
    );
}
