import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'


interface dataSousType {
    typeAbon: string
    montant: number
}

const columns: {
    field: string
    headerName: string
    width: number
    renderCell?: any
}[] = [
        { field: 'typeAbon', headerName: "Type d'abonnment ", width: 130 },
        { field: 'montant', headerName: 'Prix (FCFA)', width: 100 },
    ]
function ChangeSousPrice() {
    const [rows, setRows] = useState<dataSousType[]>([
        {
            typeAbon: "Normal unique",
            montant: 5500
        }
    ])
    const [open, setOpen] = useState<boolean>(false)
    const [newAmount, setNewAmount] = useState<dataSousType>({
        typeAbon: "Normal unique",
        montant: 5500
    })

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getInfoSouscription`)
            .then((res) => {
                if (res?.status === 200 && res.data) {
                    setRows(res.data)
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return
                }
            })
    }, [open])



    const actionColumns: {
        field: string
        headerName: string
        width: number
        renderCell: any
    }[] = [
            {
                field: 'action',
                headerName: 'Action',
                width: 80,
                renderCell: (params: any) => {
                    return (
                        <Box display="flex" gap="10px">
                            <Tooltip title="Modifier">
                                <IconButton
                                    sx={{ color: '#1D689F' }}
                                    onClick={() => {
                                        setOpen(true)
                                        setNewAmount({ montant: 0, typeAbon: params.row.typeAbon })
                                    }}
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )
                },
            },
        ]

    // Functions
    const handleChange = () => {
        // Axios.put(`${process.env.REACT_APP_URL_REMOTE_LINK}/admin/SetNewSouscription`, {amount: newAmount, typeAbon: ""})
        // .then((res) => {
        //     if (res?.status === 200 && res.data) {
        //         setRows(res.data)
        //     }
        // })
        // .catch((err) => {
        //     if (err.response.status === 400) {
        //         return
        //     }
        // })
        console.log(newAmount)
    }
    return (
        <>
            <Paper sx={{ width: "20rem", bgcolor: '#F5F0F0' }}>
                <DataGrid
                    getRowId={(row) => row.typeAbon}
                    rows={rows ? rows : []}
                    columns={columns.concat(actionColumns)}
                    pageSize={2}
                    rowsPerPageOptions={[1]}
                    sx={{ maxWidth: '25rem' }}
                />
            </Paper>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Nouveau prix d'abonnement</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="standard"
                        type="number"
                        autoFocus
                        label="Prix"
                        onChange={(e) => setNewAmount({ ...newAmount, montant: Number(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleChange}>Valider</Button>
                </DialogActions>
            </Dialog>

        </>

    );
}

export default ChangeSousPrice;