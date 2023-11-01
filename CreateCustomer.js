import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const CreateCustomer = () => {
            const[customerID, setcustomerID] = useState('');
            const[email, setemail] = useState('customer@emailservice.com');
            const[firstName, setfirstName] = useState('first name');
            const[lastName, setlastName] = useState('last name');
            const[skinTypeID, setskinTypeID] = useState('1');
            const[phoneNumber, setphoneNumber] = useState('000-000-0000');

        const redirect = useNavigate();


const addCustomer  = async () => {

    const newCustomer = { customerID, email, firstName, lastName, skinTypeID, phoneNumber }; 

    const response = await fetch('/log', {
            method: 'post',
            body: JSON.stringify newCustomer), 
            headers: {
                'Content-Type': 'application/json', 
            }, 
        });


        if(response.status === 201){
            alert(`document added`);
            redirect("/log");
        } else {
            alert(`document not added status code = ${response.status}`);
            redirect("/log");
        }

    };


    return (
        <>
        <article>
            <h2>Add a customer to the database</h2>
            <p> Let's input customer data correctly! </p>
            <form >
                <fieldset>
                    <legend>What are the customer's details?</legend>
                    <label for="customerID">Customer ID</label>
                    <input
                        type="text"
                        placeholder=""
                        value={customerID}
                        onChange={e => setcustomerID(e.target.value)} 
                        id="customerID" />
                    
                    <label for="email">Email Address</label>
                    <input
                        type="date"
                        placeholder="customer@emailservice.com"
                        value={email}
                        onChange={e => setemail(e.target.value)} 
                        id="email" />

                    <label for="firstName">First Name</label>
                    <input
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChange={e => setfirstName(e.target.value)} 
                        id="firstName" />

                    <label for="lastName">Last Name</label>
                    <input
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={e => setlastName(e.target.value)} 
                        id="lastName" />

                    <label for="skintypeID">Skin Type</label>
                    <input
                        type="number"
                        placeholder="1"
                        value={lastName}
                        onChange={e => setskinTypeID(e.target.value)} 
                        id="skintypeID" />

                    <label for="phonenumber">Phone Number</label>
                    <input
                        type="text"
                        placeholder="000-000-0000"
                        value={phoneNumber}
                        onChange={e => setphoneNumber(e.target.value)} 
                        id="phonenumber" />



                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addCustomer}
                        id="submit"
                    >Add</button> to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    ); 
}
 export default CreateCustomer;
 