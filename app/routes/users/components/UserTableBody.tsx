import { TableBody, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { FILE_BASE_URL } from "~/utils/constants";
import RoleCell from "./RoleCell";

type Props = { data: IUser[] };

function UserTableBody({ data }: Props) {
  return (
    <TableBody>
      {data?.map((item) => (
        <TableRow key={item._id}>
          <TableCell className="table-cell-classes">
            <span>
              {item.imageUrl ? (
                <img
                  src={`${FILE_BASE_URL}/${item.imageUrl}`}
                  alt={`${item.username ?? item.email}-image`}
                  className="aspect-square w-13 rounded-full object-cover"
                />
              ) : (
                <span className="flex aspect-square w-13 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-200 text-2xl text-white">
                  {item.username.split("")[0].toUpperCase()}
                </span>
              )}
            </span>
          </TableCell>
          <TableCell className="table-cell-classes">{item.email}</TableCell>
          <TableCell className="table-cell-classes">{item.username}</TableCell>
          <RoleCell id={item._id} role={item.role} />
          <TableCell className="table-cell-classes">
            {item.firstName ?? (
              <span className="text-xs text-neutral-400 italic dark:text-neutral-600">
                Not set
              </span>
            )}
          </TableCell>
          <TableCell className="table-cell-classes">
            {item.lastName ?? (
              <span className="text-xs text-neutral-400 italic dark:text-neutral-600">
                Not set
              </span>
            )}
          </TableCell>
          <TableCell className="table-cell-classes">
            {moment(item.createdAt).fromNow()}
          </TableCell>
          <TableCell className="table-cell-classes">
            {" "}
            <img
              src={`/icons/${item.verified ? "heavy-check-mark.svg" : "cross-mark.svg"}`}
              alt="verified"
              className="w-6"
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default UserTableBody;
