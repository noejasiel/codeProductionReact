import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetProducts } from "./getProducts/getProducts";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetProducts />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
