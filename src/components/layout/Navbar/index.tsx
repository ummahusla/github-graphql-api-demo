import styled from 'styled-components';

const S = {
  NavbarContainer: styled.header`
    background-color: #f2f2f2;
    height: 60px;
    display: flex;
    align-items: center;
    z-index: 50;
  `,
  NavbarContent: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 20px;
    width: 100%;
  `,
  Title: styled.h3`
    font-size: 18px;
    margin: 0;
    align-items: center;
    display: flex;
  `,
  Subtitle: styled.a`
    font-size: 18px;
    margin: 0;
  `,
};

const Navbar = () => (
  <S.NavbarContainer>
    <S.NavbarContent>
      <S.Title>GitHub Repositories</S.Title>
      <S.Subtitle
        target="_blank"
        href="https://github.com/ummahusla/github-graphql-api-demo"
      >
        Source Code
      </S.Subtitle>
    </S.NavbarContent>
  </S.NavbarContainer>
);

export default Navbar;
