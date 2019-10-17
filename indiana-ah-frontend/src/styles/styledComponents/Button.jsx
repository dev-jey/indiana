import styled from 'styled-components';

const Button = styled.button`
  background: ${(props) => {
    if (props.danger) {
      return '#CD160B';
    }
    if (props.bgColor) {
      return '#0B41CD';
    }
    return '#fff';
  }}
  font-size: 2rem;
  line-height: 2.7rem;
  align: Center;
  letterspacing: 5%;
  margin: ${props => (props.margin ? props.margin : '')};
  height: ${props => (props.height ? props.height : '')};
  border-radius: 0.4rem;
  text-align: center;
  color: ${(props) => {
    if (props.danger) {
      return '#fff';
    }
    if (props.bgColor) {
      return '#fff';
    }
    return '#0B41CD';
  }}
  cursor: pointer;
  border: ${(props) => {
    if (props.danger) {
      return '0.2rem solid #CD160B';
    }
    if (props.bgColor) {
      return 'none';
    }
    return '0.2rem solid #0B41CD';
  }}
  text-transform: capitalize;
  transition: all 0.3s;
  width: ${props => (props.width ? props.width : 'auto')};
  padding: ${props => (props.sm ? '.4rem 2.5rem' : '.8rem 1.3rem')};
  display: ${props => (props.inlineButton ? 'inline-block' : 'block')};
  :disabled {
    color: #dddddd;
    border: 0.2rem solid #dddddd;
  }
  @media (max-width: 830px) {
    width: auto;
    line-height: 2rem;
    font-size: 1.7rem;
  }
  @media (max-width: 355px) {
    width: auto;
    line-height: 1.5rem;
    padding: ${props => (props.sm ? '.4rem 1.5rem' : '.8rem 1.1rem')};
  }
`;

export default Button;
