// Made by Poukam Ngamaleu

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id', headerName: 'ID', width: 180 },
  { field: 'category', headerName: 'Catégorie', width: 130 },
  { field: 'session', headerName: 'Session', width: 180 },
  { field: 'department', headerName: 'Département', width: 180 },
  { field: 'pays', headerName: 'Pays', width: 70 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status ? (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Non validé
            </span>
          ) : null}
        </>
      )
    },
  },
]

const rows: {
  id: string
  category: string
  session: string
  department: string
  pays: string
  status: boolean
}[] = [
  {
    id: 'cgdho-21548-gdiys',
    category: 'B',
    session: '12 Février 2022',
    department: 'Manfé',
    pays: 'CMR',
    status: true,
  },
  {
    id: 'cgdho-29748-pgiys',
    category: 'B',
    session: '12 Janvier 2022',
    department: 'Kébé poto',
    pays: 'GBA',
    status: true,
  },
  {
    id: 'ceghh-26348-gaoys',
    category: 'A',
    session: '12 Mai 2002',
    department: 'Mbam-et-Kim',
    pays: 'CMR',
    status: true,
  },
  {
    id: 'cgdho-21548-bolys',
    category: 'C',
    session: '12 Mars 2021',
    department: 'Bouda',
    pays: 'CMR',
    status: true,
  },
  {
    id: 'cgdho-21946-gdiys',
    category: 'D',
    session: '12 Juin 2022',
    department: 'Librevile',
    pays: 'GBA',
    status: true,
  },
  {
    id: 'cgdho-21548-topys',
    category: 'E',
    session: '12 Mars 2022',
    department: 'Wouri 1',
    pays: 'CMR',
    status: true,
  },
  {
    id: 'cajgo-21548-gdiys',
    category: 'G',
    session: '02 Juillet 2022',
    department: 'Poste Akébé',
    pays: 'GBA',
    status: true,
  },
  {
    id: 'cgper-21548-payys',
    category: 'B',
    session: '12 Decembre 2022',
    department: 'Mifi',
    pays: 'CMR',
    status: true,
  },
]

function UnvalidedSheetTable() {
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
      renderCell: () => {
        return (
          <Box display="flex" gap="10px">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1A9EA7',
              }}
            >
              Apperçu
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1D689F',
              }}
            >
              Valider
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
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      sx={{ maxWidth: '74rem' }}
    />
  )
}

export default UnvalidedSheetTable
