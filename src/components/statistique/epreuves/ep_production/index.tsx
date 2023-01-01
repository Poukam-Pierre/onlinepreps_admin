// Made by Poukam Ngamaleu

import { Box, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { StyledLink } from '../../../sideBar/sideBarEmploye'
import { rowsInterface } from '../ep_total'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { alertMsgInterface } from '../../../employe/createEmploy'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id_epreuve', headerName: 'ID', width: 220 },
  { field: 'libele_cat', headerName: 'Catégorie', width: 90 },
  {
    field: 'date_session',
    headerName: 'Session',
    width: 180,
    renderCell: (params: any) => {
      return new Date(params.row.date_session).toLocaleDateString()
    },
  },
  { field: 'libele_depart', headerName: 'Département', width: 180 },
  { field: 'code_pays', headerName: 'Pays', width: 70 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: () => {
      return (
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
      )
    },
  },
]

function ProductionSheetTable({
  setMsg,
  setOpen,
}: {
  setMsg: ({ message, severity }: alertMsgInterface) => void
  setOpen: (bool: boolean) => void
}) {
  const [rows, setRows] = useState<rowsInterface[]>()

  useEffect(() => {
    // TODO fetch data from DATA
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getAllEpreuveInProduction`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setRows(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setMsg({
            message: err.response.data.message,
            severity: 'info',
          })
          setOpen(true)
        } else {
          setMsg({
            message: 'Erreur serveur, rééssayez plutard',
            severity: 'error',
          })
          setOpen(true)
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
      width: 120,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Tooltip title="Apperçu">
              <IconButton
                sx={{ color: '#1A9EA7' }}
                component={StyledLink}
                to={`/admin/epreuve/view/${params.row.id_epreuve}`}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Modifier">
              <IconButton
                sx={{ color: '#1D689F' }}
                component={StyledLink}
                to={`/admin/epreuve/modify/${params.row.id_epreuve}`}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
      },
    },
  ]
  return (
    <DataGrid
      getRowId={(row) => row.id_epreuve}
      rows={rows ? rows : []}
      columns={columns.concat(actionColumns)}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      sx={{ maxWidth: '67rem' }}
    />
  )
}

export default ProductionSheetTable
