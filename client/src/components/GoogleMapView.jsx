import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React from 'react';

const GoogleMapView = ({ userLocation }) => {

    const ContainerStyle = {
        width: '100%',
        height: '50vh'
    };

    const data = [
        {
            name: "City Hospital",
            location: { lat: "28.6139", lng: "77.2090" },
            email: "abcd0704200@gmail.com",
            contactNo: "9082049861"
        },
        {
            name: "Sunshine Medical Center",
            location: { lat: "28.6264", lng: "77.2189" },
            email: "sunshine_medical@gmail.com",
            contactNo: "9087654321"
        },
        {
            name: "Greenview Hospital",
            location: { lat: "28.6100", lng: "77.2400" },
            email: "greenview_hospital@gmail.com",
            contactNo: "9012345678"
        },
        {
            name: "Hope Clinic",
            location: { lat: "28.6167", lng: "77.2300" },
            email: "hope_clinic@gmail.com",
            contactNo: "9087654321"
        },
        {
            name: "Metro General Hospital",
            location: { lat: "28.6214", lng: "77.1928" },
            email: "metro_general@gmail.com",
            contactNo: "9012345678"
        }
    ];

    const places = data.map(item => ({
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng)
    }));

    console.log('USERLOCATION', userLocation);

    return (
        <div>
            <LoadScript googleMapsApiKey='AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU'>
                <GoogleMap mapContainerStyle={ContainerStyle} center={userLocation} zoom={13}>
                    <MarkerF position={userLocation} />
                    {places.map((item, index) => (
                        <MarkerF position={item} key={index} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapView;