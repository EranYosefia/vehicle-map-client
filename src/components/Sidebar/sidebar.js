
import { useContext } from 'react';
import DetailsDisplay from "../DetailsDisplay/detailsDisplay";
import DirectionDisplay from "../DirectionDisplay/directionDisplay";
import { VehiclesContext } from '../../Context/vehiclesContext'
import './style.css';

const Sidebar = () => {

    const { directionMode } = useContext(VehiclesContext)

    return(
        <>
        {(!directionMode) ? <DetailsDisplay /> : <DirectionDisplay />}
        </>
    )

}

export default Sidebar