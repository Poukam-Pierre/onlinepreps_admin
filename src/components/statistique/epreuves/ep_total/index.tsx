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
    width: 180,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'production' ? (
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
          ) : params.row.status === 'stopped' ? (
            <span
              style={{
                backgroundColor: ' #CAD2FF',
                color: '#626DA9',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En arrêt
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454 ',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Non validé
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
  department: string
  pays: string
  status: string
}[] = [
  {
    id: 'cgdho-21548-gdiys',
    category: 'B',
    session: '12 Février 2022',
    department: 'NDE',
    pays: 'CMR',
    status: 'unvalided',
  },
  {
    id: 'cgdho-29748-pgiys',
    category: 'B',
    session: '12 Janvier 2022',
    department: 'NDE',
    pays: 'CMR',
    status: 'production',
  },
  {
    id: 'ceghh-26348-gaoys',
    category: 'A',
    session: '12 Mai 2002',
    department: 'NDE',
    pays: 'CMR',
    status: 'unvalided',
  },
  {
    id: 'cgdho-21548-bolys',
    category: 'C',
    session: '12 Mars 2021',
    department: 'NDE',
    pays: 'CMR',
    status: 'production',
  },
  {
    id: 'cgdho-21946-gdiys',
    category: 'D',
    session: '12 Juin 2022',
    department: 'NDE',
    pays: 'CMR',
    status: 'stopped',
  },
  {
    id: 'cgdho-21548-topys',
    category: 'E',
    session: '12 Mars 2022',
    department: 'NDE',
    pays: 'CMR',
    status: 'production',
  },
  {
    id: 'cajgo-21548-gdiys',
    category: 'G',
    session: '02 Juillet 2022',
    department: 'NDE',
    pays: 'CMR',
    status: 'unvalided',
  },
  {
    id: 'cgper-21548-payys',
    category: 'B',
    session: '12 Decembre 2022',
    department: 'NDE',
    pays: 'CMR',
    status: 'stopped',
  },
]

function TotalTestSheet() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      sx={{ maxWidth: '64rem' }}
    />
  )
}

export default TotalTestSheet
