import React, { useEffect, useState, useRef } from 'react';
import {
    LoadScript,
    GoogleMap, StandaloneSearchBox,
    Marker
} from '@react-google-maps/api';
import LoadingBox from '../components/shared/LoadingBox';
import Axios from 'axios';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
import { useDispatch } from 'react-redux';

const libs = ['places'];
const defaultLocation = { lat: 40.863, lng: 14.277 }

export default function MapScreen(props) {

    const [googleApiKey, setGoogleApiKey] = useState('');
    const [center, setCenter] = useState(defaultLocation);
    const [location, setLocation] = useState(center);

    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);


    useEffect(() => {
        const fetch = async () => {
            const { data } = await Axios('/api/config/google');
            setGoogleApiKey(data);
            getUserCurrentLocation();
        };

        fetch();

    }, [])

    const onIdle = () => {
        setLocation({
            lat: mapRef.current.center.lat(),
            lng: mapRef.current.center.lng()
        })
    }

    const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng() })
        setLocation({ lat: place.lat(), lng: place.lng() })
    }

    const onLoad = (map) => {
        mapRef.current = map;
    }

    const onMarkerLoad = (marker) => {
        markerRef.current = marker;
    }

    const onLoadPlaces = (place) => {
        placeRef.current = place
    }

    const dispatch = useDispatch();
    const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        console.log(places + ' places')
        if (places && places.length === 1) {
            //dispach select action
            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id,
                },
            });
            alert("Posizione impostata correttamente")
            props.history.push('/shipping')
        } else {
            alert("Per favore inserisci il tuo indirizzo")
        }
    }

    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocalizzazione non supportata da questo browser")
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            })
        }
    }


    return googleApiKey ? (
        <div className="full-container">
            <LoadScript libraries={libs}
                googleMapsApiKey={googleApiKey}
            >
                <GoogleMap
                    id="sample-map"
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}
                >
                    <StandaloneSearchBox
                        onLoad={onLoadPlaces}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <div className="map-input-box">
                            <input type="text" placeholder="Inserisci il tuo indirizzo"></input>
                            <button type="button" className="primary"
                                onClick={onConfirm}
                            >Conferma</button>
                        </div>
                    </StandaloneSearchBox>
                    <Marker position={location} onLoad={onMarkerLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    ) : <LoadingBox></LoadingBox>
}
