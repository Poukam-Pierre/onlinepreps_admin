// Made by Poukam Ngamaleu

import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Axios from 'axios'
import { useEffect, useState } from 'react'

interface rowsInterface {
  num_paiement: number
  paiement_date: string
  montant: number
  status: string
}

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'num_paiement', headerName: 'TransactionID', width: 250 },
  {
    field: 'paiement_date',
    headerName: 'date',
    width: 150,
  },
  {
    field: 'montant',
    headerName: 'Montant',
    width: 210,
    renderCell: (params: any) => {
      return <Typography>{params.row.montant} frs CFA</Typography>
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'waiting' ? (
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
          ) : (
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
          )}
        </>
      )
    },
  },
]

function TransactionTable({ id }: { id: string | undefined }) {
  const [rows, setRows] = useState<rowsInterface[]>()

  useEffect(() => {
    // TODO change local link into remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getpartnerTransaction/${id}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setRows(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return
        }
      })
  }, [])

  return (
    <DataGrid
      getRowId={(row) => row.num_paiement}
      rows={rows ? rows : []}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      sx={{ maxWidth: '51rem' }}
    />
  )
}

export default TransactionTable
