import { Box, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import ChartSouscriptionSwapped, { souscriptionPeriodYears } from "./ChartSouscriptionSwapped";
import { useEffect, useState } from "react";
import YearCharts from "./charts/YearCharts";
import MonthCharts from "./charts/MonthCharts";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTranslation } from "react-i18next";
import { theme } from "../../../../utils/style/theme";
import apiMiddleware from "../../../../utils/utilis/apiMiddleware";

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
        apiMiddleware({
            url: "/admin/getSouscriptionDate",
            data: activePeriodSelection,
            method: 'GET',
            onSuccess: (data) => {
                setSouscriptionDatas({
                    data: data as souscriptionDataFetched[],
                    loaded: false
                })
            },
            onFailure: (data) => { }
        })
    }, [activePeriodSelection])

    const forwardDate = () => {
        setIndexValue(souscriptionPeriodYears
            .indexOf(souscriptionPeriodYears[indexValue]) + 1)

        setActivePeriodSelection(
            {
                ...activePeriodSelection,
                period: souscriptionPeriodYears[indexValue + 1]
            }
        )
    }
    const backwardDate = () => {
        setIndexValue(souscriptionPeriodYears
            .indexOf(souscriptionPeriodYears[indexValue]) - 1)

        setActivePeriodSelection(
            {
                ...activePeriodSelection,
                period: souscriptionPeriodYears[indexValue - 1]
            }
        )
    }

    return (
        <Box sx={{
            backgroundColor: theme.palette.secondary.contrastText,
            height: 'auto',
            display: 'grid',
            rowGap: 0.5,
            padding: '10px',
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
                {!souscriptionDatas.loaded ?
                    activePeriodSelection.type === 'years' ?
                        (
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
