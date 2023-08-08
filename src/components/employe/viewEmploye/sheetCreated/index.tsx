// Made by Poukam Ngamaleu

import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { alertMsgInterface } from '../../createEmploy'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id_epreuve', headerName: 'ID', width: 270 },
  { field: 'libele_cat', headerName: 'Catégorie', width: 90 },
  {
    field: 'date_session',
    headerName: 'Session',
    width: 110,
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
                backgroundColor: '#CAD2FF',
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
                color: '#A95454',
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

function SheetCreate({
  setCreatedMsg,
  createdMsg,
  setOpen,
  id,
}: {
  setCreatedMsg: ({ message, severity }: alertMsgInterface) => void
  createdMsg: alertMsgInterface | undefined
  setOpen: (bool: boolean) => void
  id: string | undefined
}) {
  const [rows, setRows] = useState<rowsInterface[]>()

  useEffect(() => {
    // TODO fetch data from BDD
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getEpreuveByEmploye/${id}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setRows(res.data)
        }
      })
      .catch((err) => {
        // TODO add notification message here
        if (err.response.status === 404) {
          setCreatedMsg({
            message: err.response.data.message,
            severity: 'warning',
          })
          setOpen(true)
        }
      })
  }, [])

  const deleteEpreuve = (id: number) => {
    // TODO fetch data status to stop production of epreuve
    Axios.put(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/updateStatusEpreuve/${id}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'success',
          })
          setOpen(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: 'Erreur serveur, rééssayez plutard!',
            severity: 'error',
          })
          setOpen(true)
        }
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
      width: 140,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: 'red',
              }}
              onClick={() => deleteEpreuve(params.row.id_epreuve)}
              disabled={params.row.status === 'waiting'}
            >
              Supprimer
            </Button>
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
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      sx={{ maxWidth: '55rem' }}
    />
  )
}

export default SheetCreate
