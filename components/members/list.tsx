import { IUserSchema } from "db/schemas/user.schema";
import { LeanDocument, Types, Document } from "mongoose";
import styles from "styles/pages/Members.module.scss"
import { DataGrid } from "@mui/x-data-grid"
import Table from "@mui/material/Table";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function MemberList({ members }: { members: LeanDocument<
  Document<unknown, any, IUserSchema> &
    IUserSchema & { _id: Types.ObjectId }
>[]}) {
  return (
    <aside className={styles.memberList}>
      <Table>
        {members.map(member => (
          <TableRow key={member._id.toString()}><TableCell>{member._id.toString()}</TableCell></TableRow>
        ))}
      </Table>
    </aside>
  )
}