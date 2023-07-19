import { css } from '@emotion/css';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserState } from '../Context';
import { fetchAllProblems, fetchSolArray } from '../service/api';
import file from '../Images/file-icon.png';
import lock from '../Images/locked.png';
import Solution from '../components/Solution';

const rowclass = css`
  &:hover {
          background-color: #FFECAF;
  }
  cursor: pointer;
  font-family: Montserrat;
`

const HomePage = () => {

  const [search, setSearch] = useState("");
  const [solutionsArr, setSolutionsArr] = useState([]);
  const [problems, setProblems] = useState([]);
  const { useremail } = UserState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  var solved = false;
  var mystatus;

  const handleSearch = () => {
    return problems.filter((problem) => (
      problem.title.toLowerCase().includes(search)
    ));
  }

  const findArray = async (useremail) => {
    const data = {
      email: useremail
    };
    return await fetchSolArray(data);
  }

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetchAllProblems();
      setProblems(response);
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const solutions = await findArray(useremail);
      setSolutionsArr(solutions);
    };
    fetchData();
  }, [useremail]);


  const handleFileClick = () => {
    handleOpen();
  };

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
              if (solutionsArr !== undefined) solved = solutionsArr.some(obj => obj.problem_id === row._id);
              mystatus = solved ? 'Solved' : 'Unsolved';

              return (
                <TableRow
                  className={rowclass}
                  key={row.title}
                >
                  <TableCell onClick={() => navigate(`/problems/${row._id}`)}
                    component="th"
                    scope='row'
                    style={{ display: "flex", gap: 15 }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell align="right" style={{ paddingBottom: 0, paddingTop: 0 }}>
                    {
                      solved ? <img src={file} alt='file-img' height='20px' width='20px' onClick={() => handleFileClick()}></img> :
                        <img src={lock} alt='lock-img' height='20px' width='20px' style={{ cursor: 'default' }}></img>
                    }
                    <Solution content={row.solution} open={open} onClose={handleClose} />
                  </TableCell>
                  <TableCell align="right" style={{ cursor: 'default' }}>
                    {row.difficulty}
                  </TableCell>
                  <TableCell align="right" style={{ cursor: 'default' }}>
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