import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {data, loading} =  useFetch('http://localhost:8800/api/hotels?featured=true&limit=4')
  const [featuredList, setFeaturedList] = useState([])
  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {
    setFeaturedList(data.data)
    setLoadingState(false)
  }, [data])
  
  console.log(featuredList)

  return (
    <div className="fp">
      { loadingState ? 'Featured List is loading, please wait..' :
        <>
          { !featuredList ? 'not loaded' : featuredList.map((item, index) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))
          
          }
        </>
      }
    </div>
  );
};

export default FeaturedProperties;
