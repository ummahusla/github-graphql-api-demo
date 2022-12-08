import styled from 'styled-components';

const S = {
  Container: styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Description: styled.div``,
  List: styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0;
  `,
  Item: styled.li``,
  Button: styled.button<{ $active?: boolean }>`
    cursor: pointer;
    font-size: 14px;
    color: #000000;
    background-color: #e5e5e5;
    padding: 12px 18px;
    border: none;

    &:hover {
      background-color: #cecece;
    }

    ${({ $active }) =>
      $active &&
      `
        background-color: #000000;
        color: #ffffff;

        &:hover {
          background-color: #000000;

        }
      `}
  `,
};

interface Props {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  recordsNumber: number;
}

const ReposTablePagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
  recordsNumber,
}: Props) => {
  // Create an array of page numbers to display in the
  // pagination component below the table of repositories (e.g. [1, 2, 3, 4, 5])
  // We'll use the spread operator to create an array of the correct length
  // and then use the .keys() method to create an array of numbers
  // (e.g. [0, 1, 2, 3, 4, 5]) and then use the .slice() method to remove the
  // first element (e.g. [1, 2, 3, 4, 5])
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <S.Container>
      <S.Description>
        Showing <strong>{currentPage * 10 - 9}</strong> to{' '}
        <strong>{currentPage * 10}</strong> of <strong>{recordsNumber}</strong>{' '}
        results
      </S.Description>

      <S.List>
        <S.Item>
          <S.Button onClick={prevPage}>&#8592;</S.Button>
        </S.Item>

        {pageNumbers.map((pgNumber) => (
          <S.Item key={pgNumber}>
            <S.Button
              $active={currentPage === pgNumber}
              onClick={() => setCurrentPage(pgNumber)}
            >
              {pgNumber}
            </S.Button>
          </S.Item>
        ))}
        <S.Item>
          <S.Button onClick={nextPage}>&#8594;</S.Button>
        </S.Item>
      </S.List>
    </S.Container>
  );
};

export default ReposTablePagination;
