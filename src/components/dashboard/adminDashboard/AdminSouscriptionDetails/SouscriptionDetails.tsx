import { Box, Typography } from "@mui/material";
import ChartSouscriptionSwapped from "./ChartSouscriptionSwapped";
import { useState } from "react";

export interface fetchingDataSelection {
    type: string;
    value: string | number;
    period?: number;

}

export default function SouscriptionDetails() {
    const [activePeriodSelection, setActivePeriodSelection] = useState<fetchingDataSelection>({
        type: "years",
        value: new Date().getFullYear(),
    })

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
                <ChartSouscriptionSwapped
                    activePeriodSelection={activePeriodSelection}
                    setActivePeriodSelection={setActivePeriodSelection}
                />
            </Box>
            <Typography>
                I'm here
            </Typography>
        </Box>

    );
}
