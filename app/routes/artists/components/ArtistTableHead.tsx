import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

function ArtistTableHead() {
  const columns: ITableColumn[] = [
    { id: "c1", label: "Name", minWidth: "100%" },
    { id: "c2", label: "Actions", minWidth: 30 },
  ];
  return (
    <TableHead>
      <TableRow>
        {columns.map((col, idx) => (
          <TableCell
            key={col.id}
            sx={{
              minWidth: col.minWidth,
              width: idx === 1 ? "100px" : "unset",
            }}
            className="border-b bg-white !font-semibold !text-neutral-800 dark:!border-b-neutral-800 dark:!bg-neutral-900 dark:!text-neutral-200"
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default ArtistTableHead;
