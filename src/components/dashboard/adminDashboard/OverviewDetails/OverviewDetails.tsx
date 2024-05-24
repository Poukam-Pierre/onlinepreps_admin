import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../../../utils/style/theme";
import { shortenNumber } from "../../../../utils/utilis/ShorterNumber";
import { partnersDetails } from '../partnersDetails/PartnersDetails';
import BarCharts from './BarChart';
import MenuList from './MenuList';


interface overviewDetailsProps {
    label: string;
    dataList: partnersDetails[];
}

export default function OverviewDetails({
    label,
    dataList,
}: overviewDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
    const [selectedPartner, setSelectedPartner] = useState<partnersDetails>(dataList[0])
    const { name, total, uniqueId, testCategory } = selectedPartner
    useEffect(() => {
        setSelectedPartner(dataList[0])
    }, [dataList])
    return (
        <>
            <MenuList
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                dataNameList={dataList.map(partner => partner.name)}
                setPartnerSelected={setSelectedPartner}
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
                        title="Partners list"
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
                        flex: 1
                    }}>
                        <Typography variant="caption">Code Preps</Typography>
                        <Typography
                            variant="body1"
                        >{uniqueId}</Typography>
                    </Box>

                </Box>
            </Box>
        </>
    );
}
