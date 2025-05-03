import { TableCell, TableHead, TableRow } from "@mui/material";

const columns: ITableColumn[] = [
  { id: "c1", label: "Song", minWidth: 300 },
  { id: "c2", label: "Genre", minWidth: 105 },
  { id: "c3", label: "Categories", minWidth: 270 },
  { id: "c4", label: "Likes", minWidth: 70 },
  { id: "c5", label: "Release Year", minWidth: 120 },
  { id: "c6", label: "Artist", minWidth: 120 },
  { id: "c7", label: "FT By", minWidth: 120 },
  { id: "c8", label: "Actions", minWidth: 80 },
];

function MusicTableHead() {
  return (
    <TableHead>
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
    </TableHead>
  );
}

export default MusicTableHead;
