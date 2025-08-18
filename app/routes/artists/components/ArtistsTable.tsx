import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import moment from "moment";
import { useCallback, useState } from "react";
import { FILE_BASE_URL } from "~/utils/constants";
import ArtistTableActions from "./ArtistTableActions";

type Props = { artists: IArtist[] };

function ArtistsTable({ artists }: Props) {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const columnHelper = createColumnHelper<IArtist>();

  const columns = [
    columnHelper.accessor("imageUrl", {
      header: "Image",
      cell: ({ row }) => (
        <img
          src={
            row.original.imageUrl
              ? `${FILE_BASE_URL}/${row.original.imageUrl}`
              : "/artist-image-placeholder.png"
          }
          alt={row.original.name}
          className="aspect-square w-14 rounded-full"
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("_id", {
      header: "Actions",
      cell: ({ row }) => (
        <>
          <ArtistTableActions
            name={row.original.name}
            id={row.original._id}
            imageUrl={row.original.imageUrl}
          />
        </>
      ),
    }),
  ];

  const table = useReactTable<IArtist>({
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    data: artists,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(e.target.value);
    },
    [],
  );

  return (
    <div>
      <div className="mb-2 md:mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="input"
          value={globalFilter ?? ""}
          onChange={handleSearchChange}
        />
      </div>
      <div className="max-h-100 overflow-y-auto">
        <table className="w-full border-collapse overflow-y-auto text-xs sm:text-sm md:text-base">
          <thead className="sticky top-0 text-left">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={clsx(
                  "rounded-lg font-semibold text-gray-800 dark:text-gray-200",
                )}
              >
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "dark:bg- border-b border-gray-300 bg-gray-200 p-3 dark:border-neutral-600 dark:bg-neutral-700",
                      index === 0 && "rounded-tl-xl",
                      index === headerGroup.headers.length - 1 &&
                        "rounded-tr-xl",
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-50 dark:even:bg-neutral-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-gray-300 p-3 font-light dark:border-neutral-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArtistsTable;
