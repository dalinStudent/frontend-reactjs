import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../layouts/client/Footer";
import Navbar from "../../layouts/client/Navbar";

const styles = {
  itemContainer: {
    marginTop: "3%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "2em",
  },
  itemCard: {
    textAlign: "center",
    padding: "10px",
    width: "300px",
    borderRadius: "5px",
    padding: "1em",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    backgroundColor: "rgb(255, 255, 255)",
  },
  img: {
    height: "200px",
    width: "auto",
    marginBottom: "20px",
  },

  h6: {
    textAlign: "left",
    color: "brown",
  },
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [phones, setPhone] = useState([]);

  const fetchPhone = async () => {
    axios.get(`/phones`).then((response) => {
      if (response.status === 200) {
        setPhone(response.data.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPhone();
  }, []);

  if (loading) {
    return <h4>Loading Phone...</h4>;
  }

  return (
    <div>
      <Navbar />

      <div style={styles.itemContainer}>
        {phones.map((phone) => {
          return (
            <div key={phone.id} style={styles.itemCard}>
              <img
                src={`http://localhost:8000/${phone.img}`}
                style={styles.img}
                alt=""
              />
              <h4>{phone.name}</h4>
              <h6 style={styles.h6}>
                <s>{phone.original_price}</s> $ &nbsp; {phone.sell_price} $
              </h6>
              <span className="float-end badge btn-sm btn-primary badge-pil">
                {phone.category.name}
              </span>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
