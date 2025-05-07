import { TableCell, TableHead as MUITableHead, TableRow } from "@mui/material";

type Props = { columns: ITableColumn[] };

function TableHead({ columns }: Props) {
  return (
    <MUITableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            sx={{ minWidth: col.minWidth, borderBottom: "none" }}
          >
            <span className="text-neutral-800 dark:text-neutral-400">
              {col.label}
            </span>
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
}

export default TableHead;
