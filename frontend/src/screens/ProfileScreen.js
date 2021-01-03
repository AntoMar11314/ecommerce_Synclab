import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            setName(user.name);
            setEmail(user.email);
            if(user.seller){
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }
    }, [dispatch, userInfo._id, user])
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password diversa da quella confermata')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password,
            sellerName, sellerLogo, sellerDescription
            }))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Profilo Utente</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <>
                                    {loadingUpdate && <LoadingBox></LoadingBox>}
                                    {errorUpdate && (
                                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                                    )}
                                    {successUpdate && <MessageBox variant="success">Profilo aggiornato correttamente</MessageBox>}
                                    <div>
                                        <label htmlFor="name" >Nome</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Inserisci nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email" >Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Inserisci email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password" >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Inserisci password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" >Conferma password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Inserisci conferma password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        ></input>
                                    </div>
                                    {
                                        user.isSeller && (
                                            <>
                                                <h2>Venditore</h2>
                                                <div>
                                                    <label htmlFor="sellerName">Nome venditore</label>
                                                    <input id="sellerName" type="text"
                                                        placeholder="Inserisci il nome venditore"
                                                        value={sellerName}
                                                        onChange={(e) => setSellerName(e.target.value)}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="sellerLogo">Logo venditore</label>
                                                    <input id="sellerLogo" type="text"
                                                        placeholder="Inserisci il logo venditore"
                                                        value={sellerLogo}
                                                        onChange={(e) => setSellerLogo(e.target.value)}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="sellerDescription">Descrizione venditore</label>
                                                    <input id="sellerDescription" type="text"
                                                        placeholder="Inserisci la descrizione venditore"
                                                        value={sellerDescription}
                                                        onChange={(e) => setSellerDescription(e.target.value)}
                                                    ></input>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div>
                                        <label />
                                        <button className="primary" type="submit">
                                            Modifica
                                        </button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    )
}
