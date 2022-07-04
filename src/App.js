import { useState } from "react";
import "./App.css";
import axios from "axios";

export const App = () => {
  const [product, setProduct] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/curses", product)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  if (product) {
    console.log(product);
  }

  return (
    <div className="bg-black h-screen">
      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <h1 className=" text-white text-center p-4">
            Tremend app de Productos
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex justify-between">
              <input
                onChange={handleChange}
                name="curse"
                type="text"
                placeholder="añada curso"
              />
              <input
                onChange={handleChange}
                name="price"
                type="number"
                placeholder="añada precio"
              />
            </div>
            <button className="text-white bg-cyan-600 w-1/4 m-auto pt-2 pl-4 pr-4 pb-2  mt-5 rounded-2xl hover:bg-white hover:text-teal-600">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
