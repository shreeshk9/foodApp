// Home.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import vegBurger from "../assets/veg-burgerc.jpg";
import pizzaImage from "../assets/pizza.jpg";
import momosImage from "../assets/momos.jpg";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      response = await response.json();
      console.log(response);

      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="carousel-item active">
            <img src={vegBurger} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Veg Burger" />
          </div>
          <div className="carousel-item">
            <img src={pizzaImage} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src={momosImage} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Momos" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => (
              <div key={data._id} className="mb-4">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row">
                  {foodItem.length > 0
                    ? foodItem
                        .filter((item) =>
                          item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item) => (
                          <div key={item._id} className="col-md-4 col-lg-3 mb-3">
                            <Card foodName={item.name} options={item.options[0]} imgSrc={item.img} foodItem={item} />
                          </div>
                        ))
                    : <div>No such data found</div>}
                </div>
              </div>
            ))
          : ""}
      </div>

      <Footer />
    </div>
  );
}
