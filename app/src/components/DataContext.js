import { createContext, useContext } from "react";

export const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);
