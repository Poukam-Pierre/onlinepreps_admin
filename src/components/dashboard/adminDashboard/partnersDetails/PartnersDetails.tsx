import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BarCharts from "./BarChart";
import { theme } from "../../../../utils/style/theme";
import { useState } from "react";
import MenuList from "./MenuList";

interface testCategoryStat {
    category: string;
    value: number
}
interface partnersDetails {
    name: string,
    uniqueId: string,
    totalSouscriber: number,
    testCategory: testCategoryStat[],

}
export default function PartnerDetails() {
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
    const partnersDetailsData: partnersDetails[] = [
        {
            name: "A.E Princèsse",
            uniqueId: "nppi0245",
            totalSouscriber: 25,
            testCategory: [
                {
                    category: "A",
                    value: 20
                },
                {
                    category: "B",
                    value: 40
                },
                {
                    category: "C",
                    value: 10
                },
                {
                    category: "D",
                    value: 8
                },
                {
                    category: "G",
                    value: 30
                }
            ]
        },
        {
            name: "A.E La Colombe",
            uniqueId: "inpn0245",
            totalSouscriber: 10,
            testCategory: [
                {
                    category: "A",
                    value: 10
                },
                {
                    category: "B",
                    value: 20
                },
                {
                    category: "C",
                    value: 150
                },
                {
                    category: "D",
                    value: 10
                },
                {
                    category: "G",
                    value: 12
                }
            ]
        },
        {
            name: "A.E Peuple",
            uniqueId: "peu0245",
            totalSouscriber: 30,
            testCategory: [
                {
                    category: "A",
                    value: 25
                },
                {
                    category: "B",
                    value: 9
                },
                {
                    category: "C",
                    value: 9
                },
                {
                    category: "D",
                    value: 8
                },
                {
                    category: "G",
                    value: 20
                }
            ]
        },
        {
            name: "A.E ITGES",
            uniqueId: "ites0245",
            totalSouscriber: 100,
            testCategory: [
                {
                    category: "A",
                    value: 20
                },
                {
                    category: "B",
                    value: 40
                },
                {
                    category: "C",
                    value: 10
                },
                {
                    category: "D",
                    value: 8
                },
                {
                    category: "G",
                    value: 30
                }
            ]
        },
    ]
    return (
        <>
            <MenuList
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                dataList={partnersDetailsData.map(partner => partner.name)}
            />
            <Box sx={{
                display: "grid",
                background: theme.palette.secondary.contrastText,
                width: "fit-content",
                padding: 2,
                borderRadius: "10px",
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Box>
                        <Typography variant="h6">Partner Details</Typography>
                        <Typography variant="caption">A.E La COLOMBE</Typography>
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
                <BarCharts />
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
                        <Typography variant="body1">35</Typography>
                    </Box>
                    <Box sx={{
                        width: "fit-content",
                        border: "2px solid #0D3A4A",
                        borderRadius: "5px",
                        padding: "5px",
                        flex: 1
                    }}>
                        <Typography variant="caption">Code Preps</Typography>
                        <Typography variant="body1">nppi204</Typography>
                    </Box>

                </Box>
            </Box>
        </>
    );
}
