import React, { useState, useEffect } from 'react';
import {useSelector , useDispatch} from 'react-redux'; 
import { Link } from 'react-router-dom';
import { register, Register } from '../actions/userActions';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';

export default function RegisterScreen(props) {

    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const redirect = props.location.search 
    ? props.location.search.split('=')[1]
    : '/';
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo , loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler= (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password diversa da quella confermata')
        }
        else{
            dispatch(register(name, email, password));
        }        
    }
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect , userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Registrazione</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" placeholder="Inserisci nome" required
                        onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Indirizzo email</label>
                    <input type="email" id="email" placeholder="Inserisci email" required
                        onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Inserisci password" required
                        onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Conferma Password</label>
                    <input type="password" id="confirmPassword" placeholder="Conferma password" required
                        onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Registrati</button>
                </div>
                <div>
                    <label />
                    <div>
                        Hai già un account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Accedi</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
