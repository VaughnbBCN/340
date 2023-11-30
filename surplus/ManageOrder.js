
import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


import LogTable from '../components/LogTable';

function LogPage(setMakeUpItem) {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [MakeUpItems, setMakeUpItems] = useState([]);

    // RETRIEVE the entire list of MakeUpItems
    const loadMakeupItems = async () => {
        const response = await fetch('/log');
        const MakeUpItems = await response.json();
        setMakeUpItems(MakeUpItems);
    } 
    

    // UPDATE a single MakeUpItem
    const editMakeUpItem = async MakeUpItem => {
        setMakeUpItem(MakeUpItem);
        redirect("/log");
    }


    // DELETE a single MakeUpItem  
    const DeleteMakeUpItem = async _id => {
        const response = await fetch(`/MakeUpItems/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/log');
            const MakeUpItems = await getResponse.json();
            setMakeUpItems(MakeUpItems);
        } else {
            console.error(`Failed to delete MakeUpItem with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD all the MakeUpItems
    useEffect(() => {
        loadMakeupItems();
    }, []);

    // DISPLAY the MakeUpItems
    return (
        <div>
            <h2>Makeup Inventory</h2>
            <p>Did you know expired makeup can cause acne, skin and eye infections? I decided to make a page to track my purchases. </p>
            <LogTable
                MakeUpItems={MakeUpItems} 
                onEdit={editMakeUpItem} 
                onDelete={DeleteMakeUpItem} 
            />
        </div>
    );
}

export default LogPage;
