import styled from "styled-components"

const StatItem = ({stars, count, color, bcg}) => {
  return (
    <Wrapper color={color}>
      <h6 className="title">{stars} Star Reviews</h6>
      <header>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            value={stars}
            className={`star ${value <= stars ? "filled" : ""}`}
          >
            &#9733;
          </span>
        ))}
      </header>
      <h4>
        <b>{count}</b>
      </h4>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    text-align: left;
    margin-top: 0.5rem;
  }
  h4 {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  /* .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  } */
  .star {
    font-size: 1em;
    color: #ccc;
    margin-right: 0.5em;
  }

  .filled {
    color: #ffc107;
  }
`
export default StatItem
