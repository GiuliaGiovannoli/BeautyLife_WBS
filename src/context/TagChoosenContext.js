import { createContext, useState } from 'react';

export const TagChoosenContext = createContext();

export const TagChoosenProvider = (props) => {
  const [tagChoosen, setTagChoosen] = useState([]);
  return (
    <TagChoosenContext.Provider value={[tagChoosen, setTagChoosen]}>
      {props.children}
    </TagChoosenContext.Provider>
  )
}