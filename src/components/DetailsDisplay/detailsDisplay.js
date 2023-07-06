import { useState, useContext, useEffect } from 'react';
import { VehiclesContext } from '../../Context/vehiclesContext';
import Collapsible from '../CollapsibleCard/collapsible'
import instance from '../../rest-utils'
import './style.css';

const DetailsDisplay = () =>{

    const { polygons } = useContext(VehiclesContext);
    const [markedVehicles, setMarkedVehicles] = useState([])
    const { setDirectionMode } = useContext(VehiclesContext)
    const { setChosenVehicle } = useContext(VehiclesContext)

    useEffect(() => {
        async function getData(){
            const resp = await instance.post('polygon', {polygons})
            setMarkedVehicles(resp.data)
            }
            getData()
      }, [polygons]);

      const handleGetDirection = (markedVehicle) => {
        setChosenVehicle(markedVehicle)
        setDirectionMode(true)
      }


    return(
        <div className="controls">
        <h3>Vehicles In Polygons:</h3>
        {
            markedVehicles.map((markedVehicle) => 
            <Collapsible key={markedVehicle.id} title={markedVehicle.id}>
                    state : {markedVehicle.state}<br/>
                    seats : {markedVehicle.seats}<br/>
                    class : {markedVehicle.class.name}<br/><br/>
                    {
                     markedVehicle.state === "online"
                     ?  
                     <button type="button" className='button' id='online' onClick={() => handleGetDirection(markedVehicle)}>Get Direction</button>
                     :
                      <button type="button" className='button' id='in-ride'>Busy</button>          
                    }
            </Collapsible>)
        }

        </div>
    )
}

export default DetailsDisplay