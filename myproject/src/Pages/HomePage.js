import { css } from '@emotion/css';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserState } from '../Context';
import { fetchSolArray } from '../service/api';

const rowclass = css`
  &:hover {
          background-color: #FFECAF;
  }
  cursor: pointer;
  font-family: Montserrat;
`
var problems = [{
  _id: "4",
  title: "Prob 1",
  difficulty: "Easy",
},
{
  _id: "7",
  title: "Prob 2",
  difficulty: "Medium",
}
];

const HomePage = () => {

  const [search, setSearch] = useState("");
  const [solutionsArr, setSolutionsArr] = useState([]);
  const {useremail} = UserState();

  const navigate = useNavigate();
  var solved = false;
  var mystatus;

  const handleSearch = () => {
    return problems.filter((problem) => (
      problem.title.toLowerCase().includes(search)
    ));
  }

  const findArray = async(useremail) => {
    const data = {
      email: useremail
    };
    return await fetchSolArray(data);
  }

  useEffect(()=>{
    const fetchData = async () => {
      const solutions = await findArray(useremail);
      setSolutionsArr(solutions);
    };
    fetchData();
  },[useremail]);
  console.log(solutionsArr);

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
              if(solutionsArr !== undefined) solved = solutionsArr.some(obj => obj.problem_id === row._id);
              mystatus = solved ? 'Solved' : 'Unsolved';
              return (
                <TableRow onClick={() => navigate(`/problems/${row._id}`)}
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
                    {mystatus}
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