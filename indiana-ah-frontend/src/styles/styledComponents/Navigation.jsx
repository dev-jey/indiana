import styled from 'styled-components';

const Header = styled.header`
  background: #ffffff;
  color: #333;
  min-width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0rem 0.2rem 0.5rem -0.1rem rgba(0, 0, 0, 0.4);
  padding-bottom: 17px;

  img {
    height: 65px;
  }
`;

const Nav = styled.nav`
  float: right;

  a {
    margin: 0.3rem 0;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 19px;
    text-align: center;
    color: #000000;
    letter-spacing: 0.1em;
    font-family: 'Alegreya', serif;
  }

  img {
    height: 35px;
    width: 35px;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    float: none;
  }
`;

const ProfileImg = styled.img`
  height: 35px;
  width: 35px;
  object-fit: cover;
  border-radius: 30rem;
`;

const ImageLogo = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: inline;
  margin-top: -1rem;
`;

const Ul = styled.ul`
  margin: 10px 0 0 0;
  padding: 0;
`;

const Li = styled.li`
  display: inline;
  padding: 0 1rem 0 1rem;
`;

export {
  Header, Nav, Li, Ul, ImageLogo, ProfileImg
};
