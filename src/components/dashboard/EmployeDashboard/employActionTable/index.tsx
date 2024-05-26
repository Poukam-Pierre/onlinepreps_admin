//  Made by Poukam Ngamaleu

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../utils/context'

function ActionTable() {
  const {
    userData: {
      userInfo: { id }
    }
  } = useAuth()
  const [rows, setRows] = useState<
    {
      id: number
      transaction_type: string
      date: string
      status: string
    }[]
  >()

  useEffect(() => {
    // TODO Change local link to remote link
    Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/employe/getState/${id}`)
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
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '60rem', bgcolor: '#F5F0F0' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1.1rem' }}>Type transaction</TableCell>
            <TableCell align="left" sx={{ fontSize: '1.1rem' }}>
              ID
            </TableCell>
            <TableCell align="left" sx={{ fontSize: '1.1rem' }}>
              Date
            </TableCell>
            <TableCell align="left" sx={{ fontSize: '1.1rem' }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.transaction_type}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">
                {new Date(row.date).toLocaleDateString()}
              </TableCell>
              <TableCell align="left">
                {row.status === 'stopped' || row.status === 'waiting' ? (
                  <span
                    style={{
                      backgroundColor: '#CAD2FF',
                      color: '#626DA9',
                      padding: '10px',
                      borderRadius: '15px',
                    }}
                  >
                    En attente
                  </span>
                ) : row.status === 'production' || row.status === 'buy' ? (
                  <span
                    style={{
                      backgroundColor: '#D2F0F2',
                      color: '#41B2BA',
                      padding: '10px',
                      borderRadius: '15px',
                    }}
                  >
                    Approuvé
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
                    Réjeté
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ActionTable
