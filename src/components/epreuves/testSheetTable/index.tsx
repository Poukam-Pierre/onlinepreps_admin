// Made by Poukam Ngamaleu

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { StyledLink } from '../../sideBar/sideBarEmploye'
import { useState, useEffect } from 'react'
import Axios from 'axios'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id_epreuve', headerName: 'ID', width: 200 },
  { field: 'libele_cat', headerName: 'Catégorie', width: 130 },
  {
    field: 'date_session',
    headerName: 'Session',
    width: 180,
    renderCell: (params: any) => {
      return new Date(params.row.date_session).toDateString()
    },
  },
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

interface rowsInterface {
  id_epreuve: string
  libele_cat: string
  date_session: string
  status: string
}
function TestSheetTable({ id_ }: { id_: number }) {
  const [rows, setRows] = useState<rowsInterface[]>([])
  useEffect(() => {
    // TODO fetch data in epreuve table
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/employe/getAllTestCreated/${id_}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) setRows(res.data)
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return
        }
      })
  }, [])

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
            <Box
              component={StyledLink}
              to={`/epreuve/view/${params.row.id_epreuve}`}
            >
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
            <Box
              component={StyledLink}
              to={`/epreuve/modify/${params.row.id_epreuve}`}
            >
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
      getRowId={(rows) => rows.id_epreuve}
      rows={rows}
      columns={columns.concat(actionColumns)}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      sx={{ maxWidth: '65rem' }}
    />
  )
}

export default TestSheetTable
