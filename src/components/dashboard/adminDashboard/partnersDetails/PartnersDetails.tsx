import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BarCharts from "./BarChart";
import { theme } from "../../../../utils/style/theme";

export default function PartnerDetails() {
    return (
        <Box sx={{
            display: "grid",
            background: theme.palette.secondary.contrastText,
            width: "fit-content",
            padding: "8px"
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
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <BarCharts />
            <Box>
                <Typography>Total students</Typography>
                <Typography>35</Typography>
            </Box>
        </Box>
    );
}
