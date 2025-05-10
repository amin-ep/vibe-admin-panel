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
            className="!bg-white !text-neutral-800 dark:!bg-neutral-900 dark:!text-neutral-400"
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
}

export default TableHead;
