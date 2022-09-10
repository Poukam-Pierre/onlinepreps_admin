// Made by Poukam Ngamaleu

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { StyledLink } from '../../sideBar/sideBarEmploye'

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
          {params.row.status ? (
            <span
              style={{
                backgroundColor: '#D2F0F2',
                color: '#41B2BA',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En production
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En arrêt
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
  status: boolean
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
    status: true,
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
    status: true,
  },
]

function TestSheetTable() {
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
            <Box component={StyledLink} to={`/epreuve/view/${params.row.id}`}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#CBCBCB',
                  color: '#1A9EA7',
                }}
              >
                Apperçu
              </Button>
            </Box>
            <Box component={StyledLink} to={`/epreuve/modify/${params.row.id}`}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#CBCBCB',
                  color: '#1D689F',
                }}
              >
                Modifier
              </Button>
            </Box>
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
      sx={{ maxWidth: '60rem' }}
    />
  )
}

export default TestSheetTable
