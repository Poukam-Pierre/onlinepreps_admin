// Made by Poukam Ngamaleu
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Axios from 'axios'
import { useState, useEffect } from 'react'

function ChartConnexion({ id }: { id: string | undefined }) {
  const [connexionRecord, setConnexionRecord] = useState([
    {
      name: 'Janvier',
      total: 0,
    },
  ])
  useEffect(() => {
    // TODO change local link to remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getRecordConnexion/${id}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setConnexionRecord(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return
        }
      })
  }, [])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={connexionRecord}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#total)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ChartConnexion
