import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import styled from "styled-components"

const BarCharts = ({data}) => {
  return (
    <Wrapper>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={data} margin={{top: 50}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#536dfe" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  margin-left: -4rem;
  display: inherit;
  justify-content: center;
`

export default BarCharts
