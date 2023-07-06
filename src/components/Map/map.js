import { useRef, useState, useContext } from 'react';
import { DrawingManager, GoogleMap, Polygon, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { VehiclesContext } from '../../Context/vehiclesContext'
import {defaultCenter, containerStyle, polygonOptions, deleteIconStyle, defaultZoom} from './options'
import { useQuery } from 'react-query';
import instance from '../../rest-utils'
import './style.css';

const libraries = ['drawing'];
const MapComponent = () => {

    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defaultZoom.level);
    const mapRef = useRef();
    const polygonRefs = useRef([]);
    const activePolygonIndex = useRef();
    const drawingManagerRef = useRef();
    const {polygons, setPolygons, directions } = useContext(VehiclesContext)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    // Getting all vehicles from server.
    const { isLoading, error, data } = useQuery('',async () => {
                
        const resp = await instance.get('');
        return resp.data;
    });

    const drawingManagerOptions = {
        polygonOptions: polygonOptions,
        drawingControl: true,
        drawingControlOptions: {
            position: window.google?.maps?.ControlPosition?.TOP_CENTER,
            drawingModes: [
                window.google?.maps?.drawing?.OverlayType?.POLYGON
            ]
        }
    }

    const onLoadMap = (map) => {
        mapRef.current = map;
    }

    const onLoadPolygon = (polygon, index) => {
        polygonRefs.current[index] = polygon;
    }

    const onClickPolygon = (index) => {
        activePolygonIndex.current = index;
    }

    const onLoadDrawingManager = drawingManager => {
        drawingManagerRef.current = drawingManager;
    }

    const onOverlayComplete =  ($overlayEvent) => {
        drawingManagerRef.current.setDrawingMode(null);
        if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
            const newPolygon = $overlayEvent.overlay.getPath()
                .getArray()
                .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))

            const startPoint = newPolygon[0];
            newPolygon.push(startPoint);
            $overlayEvent.overlay?.setMap(null);
            setPolygons([...polygons, newPolygon]);
        }
    }

    const onDeleteDrawing = () => {
        const filtered = polygons.filter((polygon, index) => index !== activePolygonIndex.current)
        setPolygons(filtered)
    }

    const onEditPolygon = (index) => {
        const polygonRef = polygonRefs.current[index];
        if (polygonRef) {
            const coordinates = polygonRef.getPath()
                .getArray()
                .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));

            const allPolygons = [...polygons];
            allPolygons[index] = coordinates;
            setPolygons(allPolygons)
        }
    }

    const onMarkerClick = (e) => {
        setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()})
        setZoom(defaultZoom.level - 10)
    }

    const handleZoomChanged = () => {
        setZoom(defaultZoom.level)
    }

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    
    return (
        isLoaded
        ?
        <div className='content'>
        <div className='app' style={{ position: 'relative' }}>
                {
                    drawingManagerRef.current
                    &&
                    <div
                        onClick={onDeleteDrawing}
                        title='Delete shape'
                        style={deleteIconStyle}
                        >
                    </div>
                }           
                <GoogleMap
                    zoom={zoom}
                    center={center}
                    onLoad={onLoadMap}
                    mapContainerStyle={containerStyle}
                    onZoomChanged={handleZoomChanged}
                    onTilesLoaded={() => setCenter(null)}
                >
                    {directions && <DirectionsRenderer directions={directions}/>}
                    <DrawingManager
                        onLoad={onLoadDrawingManager}
                        onOverlayComplete={onOverlayComplete}
                        options={drawingManagerOptions}
                    />
                    {
                        polygons.map((iterator, index) => (
                            <Polygon
                                key={index}
                                onLoad={(event) => onLoadPolygon(event, index)}
                                onMouseDown={() => onClickPolygon(index)}
                                onMouseUp={() => onEditPolygon(index)}
                                onDragEnd={() => onEditPolygon(index)}
                                options={polygonOptions}
                                paths={iterator}
                                draggable
                                editable
                            />
                        ))
                    }
                     {
                data.map((vehicle) => 
                <Marker key={vehicle.id} position={{lat : vehicle.location.lat ,lng : vehicle.location.lng}}
                onClick={onMarkerClick} icon={{url: (require('../../assets/images/autofleet-logo.png')), scaledSize: new window.google.maps.Size(16, 16)}} />)
            }
                </GoogleMap>
            </div>
            </div>
            :
            null
    );
}

export default MapComponent; 