// Made by Poukam Ngamaleu

import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id', headerName: 'TransactionID', width: 130 },
  {
    field: 'date',
    headerName: 'date',
    width: 150,
  },
  {
    field: 'montant',
    headerName: 'Montant',
    width: 180,
    renderCell: (params: any) => {
      return <Typography>{params.row.montant} frs CFA</Typography>
    },
  },
  { field: 'payement', headerName: 'N°payement', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'en attente' ? (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En attente
            </span>
          ) : params.row.status === 'valider' ? (
            <span
              style={{
                backgroundColor: '#D2F0F2',
                color: '#41B2BA',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Valider
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
              Refuser
            </span>
          )}
        </>
      )
    },
  },
]

const rows: {
  id: number
  date: string
  payement: number
  montant: number
  status: string
}[] = [
  {
    id: 1,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'valider',
  },
  {
    id: 2,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'refuser',
  },
  {
    id: 3,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'valider',
  },
  {
    id: 4,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'en attente',
  },
  {
    id: 5,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'valider',
  },
  {
    id: 6,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'refuser',
  },
  {
    id: 7,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'valider',
  },
  {
    id: 8,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'en attente',
  },
  {
    id: 9,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'valider',
  },
  {
    id: 10,
    date: '11 Juin 2022',
    payement: 696841451,
    montant: 20000,
    status: 'en attente',
  },
]

function TransactionTable() {
  const actionColumns: {
    field: string
    headerName: string
    width: number
    renderCell: any
  }[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 230,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1A9EA7',
              }}
              disabled={
                params.row.status === 'valider' ||
                params.row.status === 'refuser'
                  ? true
                  : false
              }
            >
              Accepter
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#FF0000',
              }}
              disabled={
                params.row.status === 'valider' ||
                params.row.status === 'refuser'
                  ? true
                  : false
              }
            >
              Refuser
            </Button>
          </Box>
        )
      },
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns.concat(actionColumns)}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      sx={{ maxWidth: '70rem' }}
    />
  )
}

export default TransactionTable
