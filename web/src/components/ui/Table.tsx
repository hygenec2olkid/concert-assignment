import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type CustomTableProps = {
  header: string[];
  data: Record<string, string | boolean | number | null>[];
};

export default function CustomTable({ header, data }: CustomTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        overflow: "scroll",
        boxShadow: "none",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "collapse",
        }}
      >
        <TableHead>
          <TableRow>
            {header.map((head, index) => (
              <TableCell
                key={index}
                sx={{
                  border: "1px solid #e0e0e0",
                  fontWeight: 600,
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={header.length}
                align="center"
                sx={{
                  border: "1px solid #e0e0e0",
                  py: 2,
                  color: "#9e9e9e",
                }}
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
