import { GoogleMap, LoadScript ,MarkerF} from '@react-google-maps/api'
import React from 'react'

const GoogleMapView = ({userLocation}) => {
  
    const ContainerStyle={
        width:'100%',
        height:'50vh'
    }

    
    // const cordinate={lat:-34.397,lng:150.644}
    console.log('USERLOCATION',userLocation);

    return (
    <div >
        <LoadScript googleMapsApiKey=''>
             <GoogleMap mapContainerStyle={ContainerStyle} center={userLocation} zoom={13}>
               <MarkerF position={userLocation} />
             </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default GoogleMapView