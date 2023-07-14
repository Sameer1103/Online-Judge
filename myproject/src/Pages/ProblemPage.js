import { css } from '@emotion/css';
import React from 'react'
import { useParams } from 'react-router-dom'

const container = css`
  display: flex;
  @media(max-width: 992px){
    flex-direction: column;
    align-items: center;
  }
`
const description = css`
  width: 50%;
  @media(max-width: 992px){
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 0%;
  margin-left: 1%;
  border-right: 2px solid grey;
`
const compiler = css`
  margin-left: 1%;
  margin-top: 1%;
`

const ProblemPage = () => {
  const { id } = useParams();
  var diffcolor;

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
        <textarea rows='30' cols='90' style={{ marginBottom: 20 }}></textarea>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '60%' }}>
            <div style={{ display: 'flex' }}>
              <h3 style={{ fontFamily: "Montserrat" }}>Input:</h3>
              <textarea rows='5' cols='40' style={{ marginLeft: 10 }}></textarea>
            </div>
            <div style={{ display: 'flex' }}>
              <h3 style={{ fontFamily: "Montserrat" }}>Output:</h3>
              <p style={{ marginLeft: '2%' }}>output</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <button>Run</button>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage