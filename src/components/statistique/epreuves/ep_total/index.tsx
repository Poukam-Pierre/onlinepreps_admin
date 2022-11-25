// Made by Poukam Ngamaleu

import { DataGrid } from '@mui/x-data-grid'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { alertMsgInterface } from '../../../employe/createEmploy'

export interface rowsInterface {
  id_epreuve: string
  libele_cat: string
  date_session: string
  libele_depart: string
  code_pays: string
  status: string
}

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id_epreuve', headerName: 'ID', width: 270 },
  { field: 'libele_cat', headerName: 'Catégorie', width: 130 },
  {
    field: 'date_session',
    headerName: 'Session',
    width: 150,
    renderCell: (params: any) => {
      return new Date(params.row.date_session).toLocaleDateString()
    },
  },
  { field: 'libele_depart', headerName: 'Département', width: 180 },
  { field: 'code_pays', headerName: 'Pays', width: 70 },
  {
    field: 'status',
    headerName: 'Status',
    width: 156,
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

function TotalTestSheet({
  setMsg,
  setOpen,
}: {
  setMsg: ({ message, severity }: alertMsgInterface) => void
  setOpen: (bool: boolean) => void
}) {
  const [rows, setRows] = useState<rowsInterface[]>()

  useEffect(() => {
    // TODO fetch from BDD
    Axios.get(`http://localhost:3000/api/admin/getAllEpreuveInfo`)
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

  return (
    <DataGrid
      getRowId={(row) => row.id_epreuve}
      rows={rows ? rows : []}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      sx={{ maxWidth: '63rem' }}
    />
  )
}

export default TotalTestSheet
