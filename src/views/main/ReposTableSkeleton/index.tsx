import { TableRow, TableData } from '../../../components/table/Table';

interface Props {
  rows?: number;
}

const ReposTableSkeleton = ({ rows = 10 }: Props) => {
  const tableRows = [];

  // To make the skeleton more attractive, we'll alternate between two rows
  for (let i = 0; i < rows; i++) {
    tableRows.push(
      <TableRow key={i}>
        <TableData>{i % 2 === 0 ? '███████' : '██████ ██████'}</TableData>
        <TableData>
          {i % 2 === 0
            ? '██████████ ███ ██████ ███ ████ ██ ███ ███ ██████████'
            : '██ ███ ████ ██████ ███ ███'}
        </TableData>
        <TableData>██</TableData>
        <TableData>██</TableData>
      </TableRow>
    );
  }

  return <>{tableRows}</>;
};

export default ReposTableSkeleton;
