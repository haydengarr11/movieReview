import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts"
import styled from "styled-components"

const AreaCharts = ({data}) => {
  return (
    <Wrapper>
      <ResponsiveContainer width="85%" height={300}>
        <AreaChart data={data} margin={{top: 50}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            fill="#536dfe"
            stroke="#3d48a2"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  display: inherit;
  justify-content: center;
  margin-left: -4rem;
`

export default AreaCharts
