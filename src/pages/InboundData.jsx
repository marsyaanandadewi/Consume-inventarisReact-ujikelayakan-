import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function InboundData() {
    const dataThParent = [
        "#",
        "Date",
        "Stuff",
        "Total Stuff",
        "Proof File",
        "Action"
    ];

    const [inbounds, setInbounds] = useState([]);
    const [stuffOptions, setStuffOptions] = useState([]); // State untuk menyimpan data stuff

    useEffect(() => {
        axios.get('http://localhost:8000/inbound/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setInbounds(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });

        
        axios.get('http://localhost:8000/inbound/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            const options = res.data.data.map(stuff => ({
                value: stuff.id,
                label: stuff.name
            }));
            setStuffOptions(options);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const columnDatabase = {
        "date": null,
        "stuff_id": null, 
        "total": null,
        "proof_file": null,
    };

    const buttons = [
        "show",
        "delete",
    ];

    const endpoints = {
        "detail": "http://localhost:8000/inbound/{id}",
        "delete": "http://localhost:8000/inbound/delete/{id}",
        "update": "http://localhost:8000/inbound/update/{id}",
        "store": "http://localhost:8000/inbound/store",
        "trash": "http://localhost:8000/inbound/trash",
        "show": "http://localhost:8000/inbound/{id}",
        "add": "http://localhost:8000/inbound/store"
    };

    const columnDetail = 'stuffs.name'; 

    const inputData = {
        "date": {
            "type": "date",
            "options": null,
        },
        "stuff_id": {
            "type": "select",
            "options": stuffOptions 
        },
        "total": {
            "type": "number",
            "options": null,
        },
        "proof_file": {
            "type": "file",
            "options": null,
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Table 
                    dataTh={dataThParent} 
                    dataTd={inbounds}  
                    columnDb={columnDatabase} 
                    buttonData={buttons} 
                    endpoints={endpoints}
                    columnDetail={columnDetail} 
                    inputData={inputData}
                />
            </div>
        </>
    );
}