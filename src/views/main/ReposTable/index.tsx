import styled from 'styled-components';

import ExternalIcon from '../../../assets/icons/ExternalIcon';
import Table, { TableRow, TableData } from '../../../components/table/Table';
import { Repository } from '../../../hooks/useRepositories';

interface Props {
  headers: string[];
  repos: Repository[];
}

const ExternalLink = styled.a`
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

const ReposTable = ({ headers, repos }: Props) => (
  <Table headers={headers}>
    {repos.map(
      ({ id, url, name, description, stargazers, forkCount }: Repository) => (
        <TableRow key={id}>
          <TableData>
            <ExternalLink href={url} target="_blank" rel="noreferrer">
              {name} <ExternalIcon />
            </ExternalLink>
          </TableData>
          <TableData>{description}</TableData>
          <TableData>{stargazers.totalCount}</TableData>
          <TableData>{forkCount}</TableData>
        </TableRow>
      )
    )}
  </Table>
);

export default ReposTable;
