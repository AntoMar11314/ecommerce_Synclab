import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {

    const userAddressMap = useSelector(state => state.userAddressMap);
    const { address: addressMap } = userAddressMap;
    

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng);

    if (!userInfo) {
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const newLat = addressMap ? addressMap.lat : lat;
        const newLng = addressMap ? addressMap.lng : lng;
        if (addressMap) {
            setLat(addressMap.lat);
            setLng(addressMap.lng);
        }
        let moveOn = true;
        if (!newLat || !newLng) {
            moveOn = window.confirm(
                'Non hai selezionato la tua posizione sulla mappa. Continuare?'
            );
        }

        if (moveOn) {
            dispatch(
                saveShippingAddress({ fullName, address, city, postalCode, country, lat: newLat, lng: newLng })
            )
            props.history.push('/payment');
        }
    }

    const chooseOnMap = () => {
        dispatch(saveShippingAddress({
            fullName,
            address,
            city,
            postalCode,
            country,
            lat,
            lng
        }));
        props.history.push('/map')
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Indirizzo di spedizione</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Nominativo completo</label>
                    <input
                        type="text" id="fullName"
                        placeholder="Inserisci il nome completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="address">Indirizzo</label>
                    <input
                        type="text" id="address"
                        placeholder="Inserisci l'indirizzo"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="city">Città</label>
                    <input
                        type="text" id="city"
                        placeholder="Inserisci la città"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="postalCode">Codice postale</label>
                    <input
                        type="text" id="postalCode"
                        placeholder="Inserisci il codice postale"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="country">Paese</label>
                    <input
                        type="text" id="country"
                        placeholder="Inserisci il Paese"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="chooseOnMap">Posizione</label>
                    <button type="button" onClick={chooseOnMap}>
                        Scegli sulla mappa
          </button>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Continua</button>
                </div>
            </form>
        </div>
    )
}
