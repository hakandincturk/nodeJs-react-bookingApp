import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './reserve.css'

const Reserve = ({setOpen, hotelId}) => {

  const { data, loading, error} = useFetch(`http://localhost:8800/api/hotels/rooms/${hotelId}`)
  const [hotelDetail, setHotelDetail] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let list = [];
    
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  }

  const allDates = (getDatesInRange(dates[0].startDate, dates[0].endDate))

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))
    
    return !isFound;
  }


  useEffect(() => {
    setHotelDetail(data.data)
  }, [data])

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(checked ? 
      [...selectedRooms, value] : 
      selectedRooms.filter(item => item !== value))

  }

  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map(roomId => {
        const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {dates:allDates})
        return res.data
      }))
      setOpen(false);
      navigate('/');
    } catch (error) {
      
    }
  }

  console.log(selectedRooms)

  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon 
          icon={faCircleXmark} 
          className='rClose' 
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {!hotelDetail ? 'Room info doesnt have.' : hotelDetail.map( item => (
          <div className='rItem' key={item._id}>
            <div className='rItemInfo'>
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {!item ? 'Room info doesnt have.' : 
                item.roomNumbers.map(roomNumber => (
                  <div className="room" id={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect} />
                  </div>
                ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className='rButton'>Reserve Now</button>
      </div>
    </div>
  )
}

export default Reserve;