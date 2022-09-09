// Made by Poukam Ngamaleu

import { Box, Button, Divider, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id', headerName: 'ID', width: 180 },
  { field: 'category', headerName: 'Catégorie', width: 130 },
  { field: 'session', headerName: 'Session', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === undefined ? (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En vente
            </span>
          ) : params.row.status ? (
            <span
              style={{
                backgroundColor: '#D2F0F2',
                color: '#41B2BA',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Acheter
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#CAD2FF',
                color: '#626DA9',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Contacter
            </span>
          )}
        </>
      )
    },
  },
]

const rows: {
  id: string
  category: string
  session: string
  status: boolean | undefined
}[] = [
  {
    id: 'cgdho-21548-gdiys',
    category: 'B',
    session: '12 Février 2022',
    status: true,
  },
  {
    id: 'cgdho-29748-pgiys',
    category: 'B',
    session: '12 Janvier 2022',
    status: false,
  },
  {
    id: 'ceghh-26348-gaoys',
    category: 'A',
    session: '12 Mai 2002',
    status: true,
  },
  {
    id: 'cgdho-21548-bolys',
    category: 'C',
    session: '12 Mars 2021',
    status: false,
  },
  {
    id: 'cgdho-21946-gdiys',
    category: 'D',
    session: '12 Juin 2022',
    status: undefined,
  },
  {
    id: 'cgdho-21548-topys',
    category: 'E',
    session: '12 Mars 2022',
    status: true,
  },
  {
    id: 'cajgo-21548-gdiys',
    category: 'G',
    session: '02 Juillet 2022',
    status: true,
  },
  {
    id: 'cgper-21548-payys',
    category: 'B',
    session: '12 Decembre 2022',
    status: undefined,
  },
]

function SelleSheetTable() {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => {
    // var epreuveTable = [...rows]
    // epreuveTable[index].status = false
    // console.log(index)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const actionColumns: {
    field: string
    headerName: string
    width: number
    renderCell: any
  }[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1A9EA7',
              }}
              disabled={params.row.status ? true : false}
              onClick={handleOpen}
            >
              Contacter
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1D689F',
              }}
              disabled={params.row.status ? true : false}
            >
              Acheter
            </Button>
          </Box>
        )
      },
    },
  ]
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumns)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        sx={{ maxWidth: '74rem' }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: '#F5F0F0',
            width: '25rem',
            height: '15rem',
            borderRadius: '20px',
            padding: '10px',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            color="#555"
            padding="0 0 15px 10px"
          >
            Coordonnées du vendeur
          </Typography>
          <Divider />
          <Box p={2} display="grid" gap="20px">
            <Box display="flex" gap="10px" alignItems="center">
              <Typography variant="h6">Nom :</Typography>
              <Typography>Ngamaleu poukam Pierre</Typography>
            </Box>
            <Box display="flex" gap="10px" alignItems="center">
              <Typography variant="h6">Email :</Typography>
              <Typography>ngamaleu2011@gmail.com</Typography>
            </Box>
            <Box display="flex" gap="10px" alignItems="center">
              <Typography variant="h6">Numéro de téléphone :</Typography>
              <Typography>+237 696841451</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default SelleSheetTable
