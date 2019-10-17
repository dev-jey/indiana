import styled from 'styled-components';
// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  display: flex;
  padding: 0.8rem;
  margin: ${props => props.margin || '0.1rem auto'};
  height: 4.3rem;
  fill: #fbfcff;
  border: 0.05rem solid rgba(0, 0, 0, 0.4);
  border-radius: 0.4rem;
  width: ${props => props.inputWidth || '94%'};
  box-sizing: border-box;
  padding: 0.8rem 1.9rem;
  height: 4.3rem;
  background: #ffffff;
  border: 0.05rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  @media (max-width: 76.8rem) {
    width: 100%;
    padding: 0.8rem;
    flex-direction: column;
    height: 3.5rem;
    font-size: 1.5rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1.9rem;
  background: #ffffff;
  border: 0.05rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  width: ${props => props.inputWidth || '37.1rem'};
  box-sizing: border-box;
`;

export { Input, TextArea };
