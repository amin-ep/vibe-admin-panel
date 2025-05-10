import { TableCell, TableHead as MUITableHead, TableRow } from "@mui/material";

type Props = { columns: ITableColumn[] };

function TableHead({ columns }: Props) {
  return (
    <MUITableHead>
      <TableRow>
        {columns.map((col, i) => (
          <TableCell
            key={col.id}
            sx={{
              minWidth: col.minWidth,
              borderBottom: "none",
              background: "var(--color-blue-500)",
              border: "none",
              borderRight: "none",
              margin: 0,
            }}
          >
            <span className="text-white">{col.label}</span>
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
}

export default TableHead;
