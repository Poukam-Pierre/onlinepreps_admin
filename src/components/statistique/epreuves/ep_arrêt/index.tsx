// Made by Poukam Ngamaleu

import { Box, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { alertMsgInterface } from '../../../employe/createEmploy'
import { rowsInterface } from '../ep_total'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id_epreuve', headerName: 'ID', width: 250 },
  { field: 'libele_cat', headerName: 'Catégorie', width: 90 },
  {
    field: 'date_session',
    headerName: 'Session',
    width: 180,
  },
  { field: 'libele_depart', headerName: 'Département', width: 180 },
  { field: 'code_pays', headerName: 'Pays', width: 70 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: () => {
      return (
        <span
          style={{
            backgroundColor: '#CAD2FF',
            color: '#626DA9',
            padding: '10px',
            borderRadius: '15px',
          }}
        >
          En arrêt
        </span>
      )
    },
  },
]

function StoppedSheetTable({
  setMsg,
  setOpen,
}: {
  setMsg: ({ message, severity }: alertMsgInterface) => void
  setOpen: (bool: boolean) => void
}) {
  const [rows, setRows] = useState<rowsInterface[]>()

  useEffect(() => {
    // TODO change local link into remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getAllEpreuveStopped`
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

  const productionStatement = (id: string) => {
    Axios.put(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/putInProduction/${id}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setMsg({
            message: res.data.message,
            severity: 'success',
          })
          setOpen(true)
        }
      })
      .catch((err) => {
        setMsg({
          message: err.response.data.message,
          severity: 'error',
        })
        setOpen(true)
      })
  }
  const actionColumns: {
    field: string
    headerName: string
    width: number
    renderCell: any
  }[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 110,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Tooltip title="Valider">
              <IconButton
                sx={{ color: '#1D689F' }}
                onClick={() => productionStatement(params.row.id_epreuve)}
              >
                <ThumbUpIcon />
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

export default StoppedSheetTable
