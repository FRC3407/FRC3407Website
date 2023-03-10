import Layout from "@components/layout";
import connect from "db/connection";
import { GetServerSideProps } from "next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import partSchema, { IPart } from "db/schemas/part.schema";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

enum PriorityEnum {
  "Low" = 1,
  "Medium" = 2,
  "High" = 3,
}

enum StatusEnum {
  "Pending" = -1,
  "Denied" = 0,
  "Approved" = 1,
}

export default function PartRequests({ requests, error }: any) {
  const [modifiable, setMod] = useState(true);
  const [errorMessage, setError] = useState<string | undefined>();

  const columns: GridColDef[] = [
    {
      field: "priority",
      align: "center",
      headerName: "Priority",
      renderCell(params) {
        return (
          <Alert
            severity={
              params.value === 1
                ? "info"
                : params.value === 2
                ? "warning"
                : "error"
            }
          >
            {PriorityEnum[params.value]}
          </Alert>
        );
      },
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell(params) {
        return (
          <Alert
            severity={
              params.value === -1
                ? "warning"
                : params.value === 0
                ? "error"
                : "success"
            }
          >
            {StatusEnum[params.value]}
          </Alert>
        );
      },
      align: "center",
      width: 150,
    },
    {
      field: "part",
      headerName: "Part Link",
      sortable: false,
      renderCell(params) {
        return (
          <Link
            href={params.value[0]}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {params.value[1]}
          </Link>
        );
      },
    },
    {
      field: "quantity",
      sortable: false,
      headerName: "Quantity",
      align: "center",
    },
    {
      field: "reason",
      sortable: false,
      headerName: "Reason",
      minWidth: 100,
    },
    {
      field: "name",
      align: "center",
      headerName: "Requested By",
      width: 200,
    },
    {
      field: "Actions",
      width: 250,
      renderCell(params) {
        if (params.row.status === -1)
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                height: "80%",
              }}
            >
              <Button
                color="success"
                variant="contained"
                sx={{
                  color: "white",
                }}
                onClick={async () => {
                  setMod(false);
                  try {
                    const res = await axios.post(
                      `/api/admin/parts/${params.row.id}/update`,
                      {
                        update: {
                          status: 1,
                        },
                      }
                    );

                    requests[
                      (requests as any[]).findIndex(
                        (val) => val._id === params.row.id
                      )
                    ].status = 1;
                    setMod(true);
                  } catch (error: any) {
                    setError(
                      error.message ||
                        error.error.message ||
                        JSON.stringify(error)
                    );
                    setMod(true);
                  }
                }}
                disabled={!modifiable}
              >
                Approve
              </Button>
              <Button
                color="error"
                variant="contained"
                disabled={!modifiable}
                onClick={async () => {
                  setMod(false);
                  try {
                    const res = await axios.post(
                      `/api/admin/parts/${params.row.id}/update`,
                      {
                        update: {
                          status: 0,
                        },
                      }
                    );

                    requests[
                      (requests as any[]).findIndex(
                        (val) => val._id === params.row.id
                      )
                    ].status = 0;
                    setMod(true);
                  } catch (error: any) {
                    setError(
                      error.message ||
                        error.error.message ||
                        JSON.stringify(error)
                    );
                    setMod(true);
                  }
                }}
              >
                Deny
              </Button>
            </div>
          );

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              height: "80%",
            }}
          >
            <Button
              color="info"
              variant="contained"
              sx={{ color: "white" }}
              onClick={async () => {
                setMod(false);
                try {
                  const res = await axios.post(
                    `/api/admin/parts/${params.row.id}/delete`
                  );

                  requests[
                    (requests as any[]).findIndex(
                      (val) => val?._id === params.row.id
                    )
                  ] = null;
                  setMod(true);
                } catch (error: any) {
                  setError(
                    error.message ||
                      error.error.message ||
                      JSON.stringify(error)
                  );
                  setMod(true);
                }
              }}
              disabled={!modifiable}
            >
              Delete Request
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Layout title="Part Requests">
      {errorMessage ? (
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      ) : null}
      <DataGrid
        columns={columns}
        rows={requests
          .filter((request: any) => !!request)
          .map((request: IPart) => {
            return {
              priority: request.priority,
              name: request.user.name,
              part: [request.partUrl, request.partName],
              id: (request as any)._id,
              status: request.status,
              quantity: request.quantity,
              reason: request.reason,
            };
          })}
        autoHeight
        disableSelectionOnClick
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    if ((await connect()) === "NO URI PROVIDED")
      throw new Error("NO Mongo URI");

    const partRequests = await partSchema.find().lean().exec();

    return {
      props: {
        requests: JSON.parse(JSON.stringify(partRequests)),
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.toString(),
      },
    };
  }
};

PartRequests.auth = {
  accessLevel: "admin",
};
