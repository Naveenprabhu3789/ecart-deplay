import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BridalProducts from "../assets/bridal.json";
import Loader from "../components/Loader";
import { IoIosBackspace } from "react-icons/io";

const Bridal = () => {
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      const res = BridalProducts;
      setData(res);
    };
    loadData();
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <div className="back_btn_container">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="back_btn"
            >
              <IoIosBackspace />
              Back
            </button>
          </div>
          <div className="products">
            {data.map((item, index) => (
              <div className="product_container" key={index}>
                <Link
                  to={`/product_details/${item.asin}`}
                  className="product_details_wrapper"
                >
                  <img
                    src={item.product_photo}
                    alt="productImg"
                    className="productImage"
                  />
                  <p className="product_title">{item.product_title}</p>
                  <h3 className="product_price">
                    {item.product_original_price || item.product_price}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Bridal;
