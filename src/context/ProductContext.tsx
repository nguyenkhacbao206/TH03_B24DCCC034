import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Product } from "../types/Product";
import { initialProducts } from "../data/initialProducts";

type State = {
  products: Product[];
};

type Action =
  | { type: "ADD"; payload: Product }
  | { type: "UPDATE"; payload: Product }
  | { type: "DELETE"; payload: number };

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: { products: [] }, dispatch: () => null });

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { products: initialProducts });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
