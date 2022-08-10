import { useEffect, useState } from "react";
import axios from "axios";

const curseForm = {
  curse: " ",
  price: " ",
};

export const GetProducts = () => {
  const [movement, setMovement] = useState();
  const [movementId, setMovementId] = useState();
  const [product, setProduct] = useState();
  const [productList, setProductList] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log(process.env);
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/curses`)
      .then((resul) => {
        setProductList(resul.data.data);
        console.log(resul.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/curses`, product)
      .then(function (response) {
        console.log(response.data.data, productList);
        setProduct(curseForm);
        getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/v1/curses/${id}`)
      .then((response) => {
        console.log(response.data.data);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleMovementChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setMovement({
      ...movement,
      [e.target.name]: e.target.value,
    });

    console.log(movement, "movemenntt");
  };

  const handleMovementSubmit = async (e) => {
    e.preventDefault();
    console.log(movementId);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/curses/movement/${movementId}`,
        movement
      )
      .then((movement) => {
        console.log(movement);
        getProducts();
        setMovementId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-black h-full">
      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <div>
            <div>
              <h1 className=" text-white text-center p-4">
                Tremend app de Productos
              </h1>
              <h2 className=" text-white text-center p-4">
                {process.env.REACT_APP_API_URL}
              </h2>
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
            <div>
              <form onSubmit={handleMovementSubmit} className="flex flex-col">
                <div className="flex justify-between">
                  <select name="type" onChange={handleMovementChange}>
                    <option hidden selected>
                      Selecciona una opción
                    </option>
                    <option name="compra">Compra</option>
                    <option name="venta">Venta</option>
                  </select>
                  <input
                    onChange={handleMovementChange}
                    name="quantity"
                    type="number"
                    placeholder="añada cantidad"
                  />
                </div>
                <button className="text-white bg-cyan-600 w-1/4 m-auto pt-2 pl-4 pr-4 pb-2  mt-5 rounded-2xl hover:bg-white hover:text-teal-600">
                  Listo
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col">
            {productList.length !== 0
              ? Object.entries(productList).map(([key, product]) =>
                  // product.curse && !product.delete ? (
                  product.curse ? (
                    <div
                      className={`w-10/12 p-5 m-auto my-10 text-white  border  rounded-md flex justify-between ${
                        product.delete ? "border-pink-600" : null
                      } ${
                        product._id._id === movementId ? "bg-green-700" : null
                      }`}
                      key={key}
                      onClick={() => setMovementId(product._id._id)}
                    >
                      <div>
                        <p>{key}</p>
                        <p>Nombre del curso: {product.curse} </p>
                        <p>precio del curso: {product.price}</p>
                        <p>Disponibilidad: {product.stock}</p>
                      </div>
                      <button onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </div>
                  ) : null
                )
              : console.log("no existo")}
          </div>
        </div>
      </div>
    </div>
  );
};
