import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const OJ = createContext();

const Context = (props) => {
    const [useremail, setUserEmail] = useState();

  return (
    <OJ.Provider value={{useremail,setUserEmail}}>
        {props.children}
    </OJ.Provider>
  )
}

export default Context;

export const UserState = () => {
    return useContext(OJ);
}