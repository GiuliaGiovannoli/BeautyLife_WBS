import { createContext, useState } from 'react';

export const HeartContext = createContext();

export const HeartProvider = (props) => {
  const [heart, setHeart] = useState([]);
  return (
    <HeartContext.Provider value={[heart, setHeart]}>
      {props.children}
    </HeartContext.Provider>
  )
}
