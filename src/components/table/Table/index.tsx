import styled from 'styled-components';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeaderCell = styled.th`
  border: 1px solid #f2f2f2;
  text-align: left;
  padding: 8px;
`;

const TableHeader = styled.thead``;

const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableData = styled.td`
  border: 1px solid #f2f2f2;
  text-align: left;
  padding: 8px;
`;

const Table = ({ headers, children }: TableProps) => {
  return (
    <StyledTable>
      <TableHeader>
        <TableRow>
          {headers.map((header: string, i: number) => (
            <TableHeaderCell key={`${header}-${i}`}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </StyledTable>
  );
};

export default Table;
