import { Box, Typography } from "@mui/material";
import ChartSouscriptionSwapped from "./ChartSouscriptionSwapped";
import { useEffect, useState } from "react";
import YearCharts from "./charts/YearCharts";
import MonthCharts from "./charts/MonthCharts";

export interface fetchingDataSelection {
    type: string;
    value: string | number;
    period?: number;

}
export interface souscriptionDataFetched {
    [key: string]: number | string;
}
interface souscriptionDatas {
    data?: souscriptionDataFetched[],
    loaded: boolean,
}
const monthsDataFetched: souscriptionDataFetched[] = [
    {
        day1: 1,
        value: 2
    },
    {
        day1: 5,
        value: 20
    },
    {
        day1: 7,
        value: 10
    },
    {
        day1: 8,
        value: 8
    },
    {
        day1: 9,
        value: 15
    },
    {
        day1: 10,
        value: 20
    },
    {
        day1: 12,
        value: 20
    },
    {
        day1: 18,
        value: 7
    },
    {
        day1: 25,
        value: 2
    },
]
const yearsDataFetched: souscriptionDataFetched[] = [
    {
        month: 'Jan',
        total: 2
    },
    {
        month: 'Feb',
        total: 10
    },
    {
        month: 'Mar',
        total: 20
    },
    {
        month: 'Apr',
        total: 3
    },
    {
        month: 'May',
        total: 5
    },
    {
        month: 'Jun',
        total: 8
    },
    {
        month: 'Jul',
        total: 7
    },
    {
        month: 'Aug',
        total: 10
    },
    {
        month: 'Sep',
        total: 13
    },
    {
        month: 'Oct',
        total: 27
    },
    {
        month: 'Nov',
        total: 18
    },
    {
        month: 'Dec',
        total: 26
    },

]

export default function SouscriptionDetails() {
    const [activePeriodSelection, setActivePeriodSelection] = useState<fetchingDataSelection>({
        type: "years",
        value: new Date().getFullYear(),
    })
    const [souscriptionDatas, setSouscriptionDatas] = useState<souscriptionDatas>({
        loaded: true
    })
    useEffect(() => {
        // Fetch data fro the selection month and year
        setSouscriptionDatas({
            data: yearsDataFetched,
            loaded: false
        })
    }, [activePeriodSelection])

    return (
        <Box sx={{
            backgroundColor: '#fff',
            height: 'auto',
            display: 'grid',
            rowGap: 2,
            padding: 1
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography>Souscription details</Typography>
                <ChartSouscriptionSwapped
                    activePeriodSelection={activePeriodSelection}
                    setActivePeriodSelection={setActivePeriodSelection}
                />
            </Box>
            {activePeriodSelection.type === 'years' ? (
                <Box sx={{
                    height: 200,
                    width: 'auto'
                }}>
                    <YearCharts yearsDataFetched={souscriptionDatas.data as souscriptionDataFetched[]} />
                </Box>

            ) : (
                <Box sx={{
                    height: 200,
                    width: 'auto'
                }}>
                    <MonthCharts monthsDataFetched={souscriptionDatas.data as souscriptionDataFetched[]} />
                </Box>
            )}
        </Box>
    );
}
