import deleteIcon from '../../assets/images/remove.png';

const defaultCenter = {
    lat: 51.509865,
    lng: -0.118092
}

const defaultZoom = {
    level: 13
}

const containerStyle = {
    width: '100%',
    height: '100%',
}

const deleteIconStyle = {
    cursor: 'pointer',
    backgroundImage: `url(${deleteIcon})`,
    height: '24px',
    width: '24px',
    marginTop: '5px',
    backgroundColor: '#fff',
    position: 'absolute',
    top: "1px",
    left: "55%",
    zIndex: 99999
}

const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: '#ff0000',
    strokeColor: '#ff0000',
    strokeWeight: 2,
    draggable: true,
    editable: true
}

export {defaultCenter, containerStyle, polygonOptions, deleteIconStyle, defaultZoom}