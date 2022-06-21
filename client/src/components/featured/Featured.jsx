import "./featured.css";
import { useEffect, useState } from "react";
import axios from 'axios'

import useFetch from "../../hooks/useFetch";

const Featured = () => {
  
  const [cityHotelCount, setCityHotelCount] = useState([])
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchCitiesCount = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const returnedVal = await axios.get('http://localhost:8800/api/hotels/countByCity?cities=berlin,london,madrid')
      setCityHotelCount(returnedVal.data)
    }
    setLoading(true);
    fetchCitiesCount();
    setLoading(false);
  }, [])

  // const {data, loading} =  useF('http://localhost:8800/api/hotels/countByCity?cities=berlin,london,madrid')

  return (
    <div className="featured">
      {
        loading ? "loading, please wait" : 
        <>
        <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{cityHotelCount?.data?.[0] ?? 0} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{cityHotelCount?.data?.[1] ?? 0} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Madid</h1>
          <h2>{cityHotelCount?.data?.[2] ?? 0} properties</h2>
        </div>
      </div>      
      </>
    }
    </div>
  );
};

export default Featured;
