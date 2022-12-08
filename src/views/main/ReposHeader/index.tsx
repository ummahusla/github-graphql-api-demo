import { ChangeEvent } from 'react';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Title: styled.h1``,
  Subtitle: styled.p`
    color: #737373;
  `,
  Input: styled.input`
    font-size: 14px;
    color: #000000;
    background-color: #e5e5e5;
    padding: 12px 18px;
    border: none;
    min-width: 200px;

    &::placeholder {
      color: #7e7e7e;
    }
  `,
};

interface Props {
  searchHandler: (inputValue: string) => void;
}

const ReposHeader = ({ searchHandler }: Props) => {
  return (
    <S.Container>
      <div>
        <S.Title>Hello friend 👋</S.Title>
        <S.Subtitle>
          Below is a list of the public repositories I have worked on over the
          years. Source code found there can give you nightmares, so look at
          your own risk.
        </S.Subtitle>
      </div>

      <div>
        <S.Input
          placeholder="Search by name or description"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            searchHandler(e.target.value)
          }
        />
      </div>
    </S.Container>
  );
};

export default ReposHeader;
