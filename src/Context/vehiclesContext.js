import { useState, createContext } from 'react';

export const VehiclesContext = createContext();

export const VehiclesProvider = ({ children }) => {

    const [polygons, setPolygons] = useState([]);
    const [directionMode, setDirectionMode] = useState(false);
    const [latLngFromUser, setLatLngFromUser] = useState({lat: null, lng: null})
    const [chosenVehicle, setChosenVehicle] = useState();
    const [directions, setDirections] = useState();


    return (
        <VehiclesContext.Provider
          value={{
            polygons,
            setPolygons,
            directionMode,
            setDirectionMode,
            latLngFromUser,
            setLatLngFromUser,
            chosenVehicle,
            setChosenVehicle,
            directions,
            setDirections
          }}
        >
          {children}
        </VehiclesContext.Provider>
      );
};