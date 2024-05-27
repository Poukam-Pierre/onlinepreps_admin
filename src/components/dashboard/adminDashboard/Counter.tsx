import { Box, CircularProgress, Typography } from "@mui/material";
import { shortenNumber } from "../../../utils/utilis/ShorterNumber";
import { useEffect, useState } from "react";
import { theme } from "../../../utils/style/theme";
import apiMiddleware from "../../../utils/utilis/apiMiddleware";

interface counterStat {
    [key: string]: number | string;
    label: string,
    value: number,
}
interface counterStatDatas {
    data?: counterStat[]
    loaded: boolean
}

export default function Counter() {
    const [counterDatas, setCounterDatas] = useState<counterStatDatas>(
        {
            loaded: true
        }
    )
    useEffect(() => {
        apiMiddleware({
            url: "/admin/getStatAdmin",
            method: "GET",
            onSuccess: (data) => {
                setCounterDatas({
                    data: data as counterStat[],
                    loaded: false
                })
            },
            onFailure: (data) => { }
        })
    }, [])
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '300px',
            height: 'fit-content',
            gap: '30px'
        }}>
            {!counterDatas.loaded ? counterDatas.data?.map(({ label, value }, index) => (
                <Box
                    key={index}
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "10px",
                        flex: 1
                    }}>
                    <Typography
                        variant='h3'
                        sx={{
                            fontSize: '56px',
                            fontWeight: 'bold',
                            lineHeight: '70.5px',
                            letterSpacing: '-0.02em',
                            padding: 0,
                            color: '#333333',
                        }}>{shortenNumber(value)}</Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            lineHeight: '28px',
                            color: '#F5FA05',
                            bgcolor: theme.palette.primary.light,
                            padding: '2px 5px',
                            borderRadius: '5px',
                            fontWeight: '600',
                            width: 'fit-content'
                        }}
                    >{label}</Typography>
                </Box>
            )) :
                <CircularProgress size={25} />
            }
        </Box>
    );
}
