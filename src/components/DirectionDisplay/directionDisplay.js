import { useState, useContext } from 'react';
import { VehiclesContext } from '../../Context/vehiclesContext'

import './style.css';

const DirectionDisplay = () => {

    const [ textFromUser, setTextFromUser ] = useState('')
    const { setDirectionMode, setDirections, chosenVehicle } = useContext(VehiclesContext)

    const onGoClick = () => {

        const stringArr = textFromUser.split(',');
        const lat = parseFloat(stringArr[0])
        const lng = parseFloat(stringArr[1])

        const latLngFromUser = {lat: lat,lng: lng}
        const latLngVehicle = {lat: chosenVehicle.location.lat, lng: chosenVehicle.location.lng }
        const service = new window.google.maps.DirectionsService();
        service.route(
            {
                origin: latLngFromUser,
                destination: latLngVehicle,
                travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) =>{
                if(status === "OK" && result){
                    setDirections(result);
                }
            }
        )
    }

    const onBackClick = () => {
        setDirections(null)
        setDirectionMode(false)
    }

    return (
        <div className="controls">
        <h3>Enter your location:</h3>
        <input type="text" className='textInput' onChange={e => setTextFromUser(e.target.value)} placeholder="e.g. 51.509865,-0.118092"></input><br/><br/>
        <button type="button" className='button' id='back' onClick={onBackClick}>Back</button>
        <button type="button" className='button' id='go' onClick={onGoClick}>Go</button>
        </div>
    )
}

export default DirectionDisplay;