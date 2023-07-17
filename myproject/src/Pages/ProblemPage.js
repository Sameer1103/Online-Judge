import { css } from '@emotion/css';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { compileTheCode } from '../service/api';

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
  const [output, setOutput] = useState("");
  var diffcolor;

  const handleClick = async() => {
    const data = {
      language: "cpp",
      code: code,
      inputs : [10,20],
    };
    const response = await compileTheCode(data);
    if(response.success === false) alert(response.error);
    else{
      const formattedOutput = response.output.replace(/\r\n/g, '<br>');
      setOutput(formattedOutput);
    }
  };

  const handleSubmit = async() => {

  };

  var problem = {
    title: "Longest Common Prefix",
    difficulty: "Easy",
    solution: ['public String longestCommonPrefix(String[] strs) {',
      '    if (strs.length == 0) return "";',
      '    String prefix = strs[0];',
      '    for (int i = 1; i < strs.length; i++)',
      '        while (strs[i].indexOf(prefix) != 0) {',
      '            prefix = prefix.substring(0, prefix.length() - 1);',
      '            if (prefix.isEmpty()) return "";',
      '        }',
      '    return prefix;',
      '}'],
      input_format: "This is my input format",
      output_format: "This is my output format",
    discription: {
      statement: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
      constraints: ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] consists of only lowercase English letters."],
      sampleio: [['strs = ["flower","flow","flight"]', '"fl"'], ['strs = ["dog","racecar","car"]', '""']]
    }
  };

  if (problem.difficulty === "Easy") diffcolor = "#16FF00";
  else if (problem.difficulty === "Medium") diffcolor = "#F1C93B";
  else diffcolor = "#FE0000";

  return (
    <div className={container}>
      <div className={description}>
        <h2>{problem.title}</h2>
        <h4 style={{ marginTop: 1, color: `${diffcolor}` }}>{problem.difficulty}</h4>
        <p style={{ fontFamily: "Montserrat", fontSize: 19 }}>{problem.discription.statement}</p>
        <h3 style={{ fontFamily: "Montserrat" }}>Input Format:</h3>
        <p style={{ marginTop: 1 }}>{problem.input_format}</p>
        <h3 style={{ fontFamily: "Montserrat" }}>Output Format:</h3>
        <p style={{ marginTop: 1 }}>{problem.output_format}</p>
        {problem.discription.sampleio.map((samplearray, index) => {
          return (
            <>
              <h3 style={{ fontFamily: "Montserrat" }}>Sample Input {index + 1}: </h3>
              <p style={{ marginTop: 1 }}>{samplearray[0]}</p>
              <h3 style={{ fontFamily: "Montserrat" }}>Sample Output {index + 1}: </h3>
              <p style={{ marginTop: 1 }}>{samplearray[1]}</p>
            </>
          );
        })}
        <h3 style={{ fontFamily: "Montserrat" }}>Constraints: </h3>
        {problem.discription.constraints.map((constraint => <p style={{ marginTop: 1 }}>{constraint}</p>))}
      </div>

      <div className={compiler}>
        <textarea rows='30' cols='90' style={{ marginBottom: 20 }} onChange={(e)=>setCode(e.target.value)}></textarea>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '60%' }}>
            <div style={{ display: 'flex' }}>
              <h3 style={{ fontFamily: "Montserrat" }}>Input:</h3>
              <textarea rows='5' cols='40' style={{ marginLeft: 10 }}></textarea>
            </div>
            <div style={{ display: 'flex' }}>
              <h3 style={{ fontFamily: "Montserrat" }}>Output:</h3>
              <p style={{ marginLeft: '2%' }} dangerouslySetInnerHTML={{ __html: output }}></p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <button className={runbtn} onClick={handleClick}>Run</button>
              <button className={submitbtn} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage