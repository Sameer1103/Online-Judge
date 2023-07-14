import { css } from '@emotion/css';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const rowclass = css`
  &:hover {
          background-color: #FFECAF;
  }
  cursor: pointer;
  font-family: Montserrat;
`
var problems = [{
  _id: 4,
  title: "Prob 1",
  difficulty: "Easy",
},
{
  _id: 7,
  title: "Prob 2",
  difficulty: "Medium",
}
];

const HomePage = () => {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    return problems.filter((problem) => (
      problem.title.toLowerCase().includes(search)
    ));
  }


  return (
    <Container style={{ textAlign: "center" }}>
      <TextField
        label="Search for a problem"
        variant='outlined'
        style={{ marginTop: 20, marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: "#EEBC1D" }}>
            <TableRow>
              {["Title", "Solution", "Difficulty", "Status"].map((head) => (
                <TableCell
                  style={{ color: "black", fontSize: 18, fontWeight: 700, fontFamily: "Montserrat" }}
                  key={head}
                  align={head === "Title" ? "left" : "right"}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {handleSearch().map((row) => {
              return (
                <TableRow onClick={() => navigate(`/problems/${row.id}`)}
                  className={rowclass}
                  key={row.title}
                >
                  <TableCell
                    component="th"
                    scope='row'
                    style={{ display: "flex", gap: 15 }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell align="right">
                    This{/* solution if user has done else lock */}
                  </TableCell>
                  <TableCell align="right">
                    {row.difficulty}
                  </TableCell>
                  <TableCell align="right">
                    This{/* Solved if user has done else Unsolved */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default HomePage