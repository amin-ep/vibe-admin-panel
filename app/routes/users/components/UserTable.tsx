import { Table, TableCell, TableRow } from "@mui/material";
import TableHead from "~/components/TableHead";

type Props = { children: React.ReactNode };

function UserTable({ children }: Props) {
  const columns: ITableColumn[] = [
    { id: "c1", label: "Profile", minWidth: 50 },
    { id: "c2", label: "Email", minWidth: 150 },
    { id: "c3", label: "Username", minWidth: 100 },
    { id: "c4", label: "Role", minWidth: 60 },
    { id: "c5", label: "First Name", minWidth: 70 },
    { id: "c6", label: "Last Name", minWidth: 70 },
    { id: "c7", label: "Joined At", minWidth: 90 },
    { id: "c8", label: "Verified", minWidth: 25 },
  ];
  return (
    <div>
      <Table>
        <TableHead columns={columns} />
        {children}
      </Table>
    </div>
  );
}

export default UserTable;
