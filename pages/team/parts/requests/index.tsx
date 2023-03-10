// import Layout from "@components/layout";
// import connect from "db/connection";
// import { GetServerSideProps } from "next";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import partSchema, { IPart } from "db/schemas/part.schema";
// import Link from "next/link";
// import Alert from "@mui/material/Alert";
// import { getServerSession } from "next-auth";
// import { authOptions } from "pages/api/auth/[...nextauth]";

// enum PriorityEnum {
//   "Low" = 1,
//   "Medium" = 2,
//   "High" = 3,
// }

// enum StatusEnum {
//   "Pending" = -1,
//   "Denied" = 0,
//   "Approved" = 1,
// }

// export default function PartRequests({ requests, error }: any) {
//   const columns: GridColDef[] = [
//     {
//       field: "priority",
//       align: "center",
//       headerName: "Priority",
//       renderCell(params) {
//         return (
//           <Alert
//             severity={
//               params.value === 1
//                 ? "info"
//                 : params.value === 2
//                 ? "warning"
//                 : "error"
//             }
//           >
//             {PriorityEnum[params.value]}
//           </Alert>
//         );
//       },
//       width: 150,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       renderCell(params) {
//         return (
//           <Alert
//             severity={
//               params.value === -1
//                 ? "warning"
//                 : params.value === 0
//                 ? "error"
//                 : "success"
//             }
//           >
//             {StatusEnum[params.value]}
//           </Alert>
//         );
//       },
//       align: "center",
//       width: 150,
//     },
//     {
//       field: "part",
//       headerName: "Part Link",
//       sortable: false,
//       renderCell(params) {
//         return (
//           <Link
//             href={params.value[0]}
//             target="_blank"
//             referrerPolicy="no-referrer"
//           >
//             {params.value[1]}
//           </Link>
//         );
//       },
//     },
//     {
//       field: "quantity",
//       sortable: false,
//       headerName: "Quantity",
//       align: "center",
//     },
//     {
//       field: "reason",
//       sortable: false,
//       headerName: "Reason",
//       minWidth: 100,
//     },
//   ];

//   return (
//     <Layout title="Part Requests">
//       <DataGrid
//         columns={columns}
//         rows={requests
//           .filter((request: any) => !!request)
//           .map((request: IPart) => {
//             return {
//               priority: request.priority,
//               part: [request.partUrl, request.partName],
//               id: (request as any)._id,
//               status: request.status,
//               quantity: request.quantity,
//               reason: request.reason,
//             };
//           })}
//         autoHeight
//         disableSelectionOnClick
//       />
//     </Layout>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const session = await getServerSession(
//       context.req,
//       context.res,
//       authOptions
//     );

//     if (!session || !session.user.id) {
//       return {
//         props: {
//           error: "Not Signed in",
//         },
//       };
//     }

//     if ((await connect()) === "NO URI PROVIDED")
//       throw new Error("NO Mongo URI");

//     const partRequests = (await partSchema.find().lean().exec()).filter(
//       (parts: any) => parts.user.userId.toString() === session.user.id
//     );

//     return {
//       props: {
//         requests: JSON.parse(JSON.stringify(partRequests)),
//       },
//     };
//   } catch (error: any) {
//     return {
//       props: {
//         error: error.toString(),
//       },
//     };
//   }
// };

// PartRequests.auth = {
//   accessLevel: "tm",
// };

export default function page(){ return <div></div>;} 
