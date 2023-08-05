import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from 'react-router-dom';
const Search = () => {
  // eslint-disable-next-line no-unused-vars
  const [search, setsearch] = useSearch();
  const navigate = useNavigate()
  console.log(search)
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {search?.results.length < 1
              ? "No Products Found"
              : `Found ${search?.results.results.length}`}
          </h6>
          <button className="btn btn-warning text-white" onClick={() => navigate("/")}>Go Back</button>
          <div className="d-flex flex-wrap mt-4">
            {search?.results.results.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"200"}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name.substring(0,18)}...</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>        
        </div>
      </div>
    </Layout>
  );
};

export default Search;
