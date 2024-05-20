import { Box, Typography } from "@mui/material";
import ChartSouscriptionSwapped from "./ChartSouscriptionSwapped";

export default function SouscriptionDetails() {
    return (
        <Box sx={{
            backgroundColor: '#fff',
            minWidth: '50%',
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
                <ChartSouscriptionSwapped />
            </Box>
            <Typography>
                I'm here
            </Typography>
        </Box>

    );
}
