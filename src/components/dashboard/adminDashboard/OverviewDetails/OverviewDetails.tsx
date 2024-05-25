import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../../../utils/style/theme";
import { shortenNumber } from "../../../../utils/utilis/ShorterNumber";
import BarCharts from './BarChart';
import MenuList from './MenuList';
import { overviewStat } from '../../../../utils/context';



interface overviewDetailsProps {
    label: string;
    dataList: overviewStat[];
}

export default function OverviewDetails({
    label,
    dataList,
}: overviewDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
    const [isSelected, setIsSelected] = useState<overviewStat>(dataList[0])
    const { name, total, uniqueId, testCategory } = isSelected

    useEffect(() => {
        setIsSelected(dataList[0])
    }, [dataList])

    return (
        <>
            <MenuList
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                dataList={dataList}
                setSelected={setIsSelected}
            />
            <Box sx={{
                display: "grid",
                background: theme.palette.secondary.contrastText,
                width: "fit-content",
                padding: "10px",
                borderRadius: "10px",
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Box>
                        <Typography variant="h6">{label} Details</Typography>
                        <Typography variant="caption">{name}</Typography>
                    </Box>
                    <Tooltip
                        arrow
                        title={`${label} list`}
                    >
                        <IconButton
                            size="small"
                            sx={{
                                alignSelf: "baseline"
                            }}
                            onClick={(event) => setAnchorEl(event.target as HTMLAnchorElement)}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <BarCharts dataSet={testCategory} />
                {uniqueId ? (
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        gap: 2
                    }}>
                        <Box sx={{
                            width: "fit-content",
                            border: "2px solid #0D3A4A",
                            borderRadius: "5px",
                            padding: "5px",
                            flex: 1
                        }}>
                            <Typography variant="caption">Total students</Typography>
                            <Typography
                                variant="body1"
                            >{shortenNumber(total)}</Typography>
                        </Box>
                        <Box sx={{
                            width: "fit-content",
                            border: "2px solid #0D3A4A",
                            borderRadius: "5px",
                            padding: "5px",
                            flex: 1,
                        }}>
                            <Typography variant="caption">Code Preps</Typography>
                            <Typography
                                variant="body1"
                            >{uniqueId}</Typography>
                        </Box>

                    </Box>
                ) : (
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}>
                        <Box sx={{
                            width: "fit-content",
                            border: "2px solid #0D3A4A",
                            borderRadius: "5px",
                            padding: "5px",
                        }}>
                            <Typography variant="caption">Total tests</Typography>
                            <Typography
                                variant="body1"
                            >{shortenNumber(total)}</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}
