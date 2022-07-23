import { createContext, useState } from 'react';

export const PrevProductsContext = createContext();

export const PrevProductsProvider = (props) => {
  const [prevProducts, setPrevProducts] = useState([]);
  return (
    <PrevProductsContext.Provider value={[prevProducts, setPrevProducts]}>
      {props.children}
    </PrevProductsContext.Provider>
  )
}