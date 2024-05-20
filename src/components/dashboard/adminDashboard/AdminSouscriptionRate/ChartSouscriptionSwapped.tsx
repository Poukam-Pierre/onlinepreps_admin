import { Box, IconButton, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuActivePeriod from "./MenuActivePeriod";



export default function ChartSouscriptionSwapped() {
    const [activePeriodSelection, setActivePeriodSelection] = useState<string>('years')
    const [activePeriod, setActivePeriod] = useState<string | number>(2024)
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
    const souscriptionPeriod: string[] = ["months", 'years']
    const souscriptionPeriodYears: number[] = [2024, 2023, 2022]
    const souscriptionPeriodMonths: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const handleChangePeriod = (active: string) => {
        setActivePeriodSelection(active)
        setActivePeriod(active === 'years' ? souscriptionPeriodYears[0] : souscriptionPeriodMonths[0])
    }
    return (
        <>
            <MenuActivePeriod
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                souscriptionPeriod={
                    activePeriodSelection === 'years' ?
                        souscriptionPeriodYears : souscriptionPeriodMonths
                }
                setActivePeriod={setActivePeriod}
            />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                width: 'fit-content',
                alignItems: 'center',
                columnGap: 1,
            }}>
                <TextField
                    size="small"
                    select
                    value={activePeriodSelection}
                    onChange={(event) =>
                        handleChangePeriod(event.target.value)

                    }
                    sx={{
                        '&.MuiFormControl-root': {
                            background: 'transparent',
                        },
                        '& .MuiInputBase-root': {
                            background: 'transparent',
                        },
                    }}
                >
                    {souscriptionPeriod.map((period, index) => (
                        <MenuItem
                            key={index}
                            value={period}
                        >
                            {period}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    width: 'fit-content',
                    alignItems: 'center'
                }}>
                    <Typography variant="body2">{activePeriod}</Typography>
                    <Tooltip
                        arrow
                        title={`change ${activePeriodSelection}`}
                    >
                        <IconButton
                            size="small"
                            onClick={(event) => setAnchorEl(event.target as HTMLAnchorElement)}
                        >
                            <ChevronRightIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

        </>
    );
}
