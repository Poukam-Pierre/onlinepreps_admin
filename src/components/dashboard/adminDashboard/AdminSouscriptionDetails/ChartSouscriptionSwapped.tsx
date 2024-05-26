import { Box, IconButton, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import MenuActivePeriod from "./MenuActivePeriod";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { fetchingDataSelection } from "./SouscriptionDetails";
import { useTranslation } from "react-i18next";

interface chartSouscriptionProps {
    activePeriodSelection: fetchingDataSelection;
    setActivePeriodSelection: Dispatch<SetStateAction<fetchingDataSelection>>;
}
const souscriptionPeriodMonths: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const souscriptionPeriod: string[] = ["months", "years"]
export const souscriptionPeriodYears: number[] = Array.from({ length: new Date().getFullYear() - 2021 },
    (_, i) => new Date().getFullYear() - i)

export default function ChartSouscriptionSwapped({
    activePeriodSelection,
    setActivePeriodSelection
}: chartSouscriptionProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
    const { t } = useTranslation()

    const handleChangePeriod = (active: string) => {
        setActivePeriodSelection({
            ...activePeriodSelection,
            type: active,
            value: active === "years" ? new Date().getFullYear() :
                souscriptionPeriodMonths[new Date().getMonth()],
            period: active === "months" ? new Date().getFullYear() : undefined
        });
    }
    return (
        <>
            <MenuActivePeriod
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                souscriptionPeriod={
                    activePeriodSelection.type === 'years' ?
                        souscriptionPeriodYears : souscriptionPeriodMonths
                }
                setActivePeriod={setActivePeriodSelection}
                activePeriodSelection={activePeriodSelection}
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
                    value={activePeriodSelection.type}
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
                            {t(`${period}`)}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    width: 'fit-content',
                    alignItems: 'center'
                }}>
                    <Typography variant="body2">{activePeriodSelection.value}</Typography>
                    <Tooltip
                        arrow
                        title={`change ${activePeriodSelection.type}`}
                    >
                        <IconButton
                            size="small"
                            onClick={(event) => setAnchorEl(event.target as HTMLAnchorElement)}
                        >
                            <UnfoldMoreIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

        </>
    );
}
