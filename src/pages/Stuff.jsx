import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useState } from "react";
import axios from "axios";

export default function Stuff() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"

    ]

    const [ stuffs, setStuffs ] = useState({});
    useEffect(()=> {
        axios.get('http://localhost:8000/stuffs',{
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
        setStuffs(res.data.data)
        })
        .catch(err => {
        console.log(err)
        })
    
    }, []);

    const columnDatabase = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec",
    }

    // namaObject[relasi][columnRelasi]

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ]

    const endpoints = {
        "detail": "http://localhost:8000/stuffs/{id}",
        "delete": "http://localhost:8000/stuffs/delete/{id}",
        "update": "http://localhost:8000/stuffs/update/{id}",
        "store": "http://localhost:8000/stuffs/store",
        "trash": "http://localhost:8000/stuffs/trash",
    }
    const columnDetailModalDelete = 'name'

    const judulModalEdit = 'stuff'

    const inputData = {
        // kalau tag input, typenya bisa text, number, email, password, file
        "name": {
            "type": "text",
            "options": null,
        },
        // kalau tag select, perlu murun data options
        "category": {
            "type": "select",
            "options": ['KLN', 'HTL', 'Sarpras/Teknisi']
        },
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="p-10">
                <Table dataTh={dataThParent} dataTd={stuffs}  columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit}
                inputData={inputData}></Table>
            
            </div>
        </>
    )
}