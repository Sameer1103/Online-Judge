import { css } from '@emotion/css';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { addSolution, compileTheCode, fetchSpecificProblems } from '../service/api';
import { UserState } from '../Context';

const container = css`
  display: flex;
  @media(max-width: 992px){
    flex-direction: column;
    align-items: center;
  }
`
const description = css`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 0%;
  margin-left: 1%;
  border-right: 2px solid grey;
  @media(max-width: 992px){
    width: 100%;
    margin-left: 2 %;
  }
`
const compiler = css`
  margin-left: 1%;
  margin-top: 1%;
`
const runbtn = css`
  border: none;
  border-radius: 8px;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 24px;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid #555555;
  &:hover {
    background-color: #555555;
    color: white;
  }
`
const submitbtn = css`
  background-color: #4CAF50;
  border: 1px solid green;
  border-radius: 8px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #3e8e41;
  }
`

const ProblemPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [inputs, setInputs] = useState("");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState();
  const [verdict, setVerdict] = useState();
  const [flag, setFlag] = useState(0);
  const { useremail } = UserState();
  var diffcolor;

  const handleClick = async () => {
    const data = {
      language: "cpp",
      code: code,
      inputs: inputs,
    };
    const response = await compileTheCode(data);
    if (response.success === false) alert(response.error);
    else {
      const formattedOutput = response.output.replace(/\r\n/g, '<br>');
      setOutput(formattedOutput);
    }
  };


  useEffect(() => {
    const data = {
      id: id,
    };
    const fetchProblem = async (data) => {
      const response = await fetchSpecificProblems(data);
      setProblem(response);
    };
    fetchProblem(data);
  }, [id]);

  if (problem === undefined) return <CircularProgress style={{ color: "blue" }} size={200} thickness={1} />;


  if (problem.difficulty === "Easy") diffcolor = "#16FF00";
  else if (problem.difficulty === "Medium") diffcolor = "#F1C93B";
  else diffcolor = "#FE0000";

  const handleSubmit = async () => {
    let result = 1;
    setFlag(1);
    setVerdict();
    for (const samplearray of problem.testcases) {
      const data = {
        language: "cpp",
        code: code,
        inputs: samplearray[0],
      };
      const response = await compileTheCode(data);
      if (response.success === false || response.output === "Error!") {
        result = -1;
      } else {
        const output = response.output.replace(/[\n\r]/g, '').trim();
        samplearray[1] = samplearray[1].replace(/[\n\r]/g, '').trim();
        if (output !== samplearray[1]) {
          result = 0;
          console.log("output is " + output);
          console.log("required is " + samplearray[1]);
        }
      }
    }

    if (result === 0) setVerdict("Wrong Answer!");
    else if (result === 1){
      setVerdict("Accepted!");
      if(useremail === undefined) alert('You need to Login to save your progress.');
      else{
        const data = {
          email: useremail,
          id: problem._id,
          solution: code
        };
        const response = addSolution(data);
        console.log(response);
      }
    }
    else setVerdict("Error!");
  };


  const formattedSamples = problem.discription.sampleio.map((samplearray, index) => {
    const formattedInput = samplearray[0].split('\n');
    const formattedOutput = samplearray[1].split('\n');

    return (
      <React.Fragment key={index}>
        <h3 style={{ fontFamily: "Montserrat" }}>Sample Input {index + 1}: </h3>
        {formattedInput.map((line, index) => (
          <div key={index}>
            {line}
            <br />
          </div>
        ))}
        <p style={{ marginTop: 1 }}></p>
        <h3 style={{ fontFamily: "Montserrat" }}>Sample Output {index + 1}: </h3>
        {formattedOutput.map((line, index) => (
          <div key={index}>
            {line}
            <br />
          </div>
        ))}
      </React.Fragment>
    );
  });

  return (
    <div className={container}>
      <div className={description}>
        <h2>{problem.title}</h2>
        <h4 style={{ marginTop: 1, color: `${diffcolor}` }}>{problem.difficulty}</h4>
        <p style={{ fontFamily: "Montserrat", fontSize: 19 }}>{problem.discription.statement}</p>
        <h3 style={{ fontFamily: "Montserrat" }}>Input Format:</h3>
        <p style={{ marginTop: 1 }}>{problem.discription.input_format}</p>
        <h3 style={{ fontFamily: "Montserrat" }}>Output Format:</h3>
        <p style={{ marginTop: 1 }}>{problem.discription.output_format}</p>
        {formattedSamples}
        <h3 style={{ fontFamily: "Montserrat" }}>Constraints: </h3>
        {problem.discription.constraints.map((constraint => <p style={{ marginTop: 1 }}>{constraint}</p>))}
      </div>

      <div className={compiler}>
        <textarea rows='30' cols='90' style={{ marginBottom: 20 }} onChange={(e) => setCode(e.target.value)}></textarea>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '60%' }}>
            <div style={{ display: 'flex' }}>
              <h3 style={{ fontFamily: "Montserrat" }}>Input:</h3>
              <textarea rows='5' cols='40' style={{ marginLeft: 10 }} onChange={(e) => setInputs(e.target.value)}></textarea>
            </div>
            <div style={{ display: 'flex' }}>
              <h3 style={{ fontFamily: "Montserrat" }}>Output:</h3>
              <p style={{ marginLeft: '2%' }} dangerouslySetInnerHTML={{ __html: output }}></p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <button className={runbtn} onClick={handleClick}>Run</button>
                <button className={submitbtn} onClick={handleSubmit}>Submit</button>
              </div>
              {verdict ? <><h3>Verdict: </h3>
                <h3 style={{ color: verdict === "Accepted!" ? 'green' : 'red' }}>{verdict}</h3></>
                : (flag === 1) && <CircularProgress style={{ color: "blue", marginTop: 50 }} size={50} thickness={1} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage