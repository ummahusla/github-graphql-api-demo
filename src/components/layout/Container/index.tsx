import styled from 'styled-components';

const StyledContainer = styled.main`
  margin: 10px 20px;
`;

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => (
  <StyledContainer>{children}</StyledContainer>
);

export default Container;
