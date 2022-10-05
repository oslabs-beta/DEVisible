import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

interface RepoItemDependenciesProps {
  dependencies: string;
}
const RepoItemDependencies = ({ dependencies }: RepoItemDependenciesProps) => {
  const parsedDependencies = JSON.parse(dependencies);
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {Object.keys(parsedDependencies).map((depRow) => (
            <TableRow>
              <TableCell>{depRow}</TableCell>
              <TableCell>{parsedDependencies[depRow]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RepoItemDependencies;
