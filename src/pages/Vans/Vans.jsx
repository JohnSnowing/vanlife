import { useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  return getVans();
}
//return the value here first before so that hindi mauna ang useEffect

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  // handling url variables searchParams

  const typeFilter = searchParams.get("type");
  //getting the variables on url

  // const [vans, setVans] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const vans = useLoaderData();
  // console.log(data);

  // useEffect(() => {
  //   async function loadVans() {
  //     setLoading(true);
  //     try {
  //       const data = await getVans();
  //       console.log(data);
  //       setVans(data);
  //     } catch (err) {
  //       setError(err);
  //       console.log("error", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadVans();
  // }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans?.map((van) => (
    <div key={van.id} className="van-title">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        {/* state prop on link makes you remember last history of url */}
        <img src={van.imageUrl} alt="van-logo" />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  if (error) {
    <h1>There was an error {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>

        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
