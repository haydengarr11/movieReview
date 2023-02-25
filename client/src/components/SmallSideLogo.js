import MB from "../assets/MB.svg"
import styled from "styled-components"

const SmallSideLogo = () => {
  return (
    <Wrapper>
      <img src={MB} alt="movie boy" className="small-logo" height="80" />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  @media (min-width: 992px) {
    display: none;
  }
`

export default SmallSideLogo
