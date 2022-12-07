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
  Input: styled.input`
    font-size: 14px;
    color: #000000;
    background-color: #e5e5e5;
    padding: 12px 18px;
    border-radius: 2px;
    border: none;
    min-width: 200px;

    &::placeholder {
      color: #7e7e7e;
    }
  `,
};

const Navbar = () => {
  return (
    <S.NavbarContainer>
      <S.NavbarContent>
        <S.Title>GitHub Repositories</S.Title>
        <S.Input placeholder="Quick search..." />
      </S.NavbarContent>
    </S.NavbarContainer>
  );
};

export default Navbar;
