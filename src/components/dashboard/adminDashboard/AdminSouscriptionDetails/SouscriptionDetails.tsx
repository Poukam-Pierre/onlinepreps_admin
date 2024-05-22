import { Box, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import ChartSouscriptionSwapped, { souscriptionPeriodYears } from "./ChartSouscriptionSwapped";
import { useEffect, useState } from "react";
import YearCharts from "./charts/YearCharts";
import MonthCharts from "./charts/MonthCharts";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTranslation } from "react-i18next";

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
        days: 1,
        value: 2
    },
    {
        days: 5,
        value: 20
    },
    {
        days: 7,
        value: 10
    },
    {
        days: 8,
        value: 8
    },
    {
        days: 9,
        value: 15
    },
    {
        days: 10,
        value: 20
    },
    {
        days: 12,
        value: 20
    },
    {
        days: 18,
        value: 7
    },
    {
        days: 25,
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
    const [indexValue, setIndexValue] = useState<number>(0)
    const { t } = useTranslation()
    useEffect(() => {
        // Fetch data fro the selection month and year
        setSouscriptionDatas({
            data: monthsDataFetched,
            loaded: false
        })
    }, [activePeriodSelection])

    const forwardDate = () => {
        setIndexValue(souscriptionPeriodYears
            .indexOf(souscriptionPeriodYears[indexValue]) + 1)
        setActivePeriodSelection({ ...activePeriodSelection, period: souscriptionPeriodYears[indexValue] })
    }
    const backwardDate = () => {
        setIndexValue(souscriptionPeriodYears
            .indexOf(souscriptionPeriodYears[indexValue]) - 1)
        setActivePeriodSelection({ ...activePeriodSelection, period: souscriptionPeriodYears[indexValue] })
    }
    return (
        <Box sx={{
            backgroundColor: '#fff',
            height: 'auto',
            display: 'grid',
            rowGap: 0.5,
            padding: 1,
            borderRadius: '10px'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography
                    variant="h6"
                >{t('souscriptionCharts')}</Typography>
                <ChartSouscriptionSwapped
                    activePeriodSelection={activePeriodSelection}
                    setActivePeriodSelection={setActivePeriodSelection}
                />
            </Box>
            <Box sx={{
                height: 200,
                width: 'auto'
            }}>
                {!souscriptionDatas.loaded ? activePeriodSelection.type === 'years' ? (
                    <YearCharts yearsDataFetched={souscriptionDatas.data as souscriptionDataFetched[]} />

                ) : (
                    <MonthCharts monthsDataFetched={souscriptionDatas.data as souscriptionDataFetched[]} />
                ) :
                    <CircularProgress
                        disableShrink
                        variant="indeterminate"
                        size={20}
                    />
                }
            </Box>
            <Box sx={{
                display: activePeriodSelection.type === "months" ? "grid" : "none",
                gridAutoFlow: 'column',
                alignItems: 'center',
                width: 'fit-content',
            }}>
                <Tooltip arrow title={'backward'}>
                    <IconButton
                        size='small'
                        onClick={backwardDate}
                        disabled={indexValue === 0}
                    >
                        <KeyboardArrowLeftIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Typography variant="caption">
                    {souscriptionPeriodYears[indexValue]}
                </Typography>
                <Tooltip arrow title={'forward'}>
                    <IconButton
                        size='small'
                        onClick={forwardDate}
                        disabled={souscriptionPeriodYears.length - 1 === indexValue}
                    >
                        <KeyboardArrowRightIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
