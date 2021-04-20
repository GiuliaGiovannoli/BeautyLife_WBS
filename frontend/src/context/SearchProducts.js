import { createContext, useState } from 'react';

export const SearchProductsContext = createContext();

export const SearchProductsProvider = (props) => {
  const [searchProducts, setSearchProducts] = useState([]);
  return (
    <SearchProductsContext.Provider value={[searchProducts, setSearchProducts]}>
      {props.children}
    </SearchProductsContext.Provider>
  )
}