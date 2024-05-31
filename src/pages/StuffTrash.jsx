import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function StuffTrash() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"

    ]

    const [ stuffs, setStuffs ] = useState({});
    useEffect(()=> {
        axios.get('http://localhost:8000/stuffs/trash',{
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
    }

    // namaObject[relasi][columnRelasi]

    const buttons = [
        "restore",
        "permanent-delete",
    ]

    const endpoints = {
        "restore": "http://localhost:8000/stuffs/trash/restore/{id}",
        "permanent-delete": "http://localhost:8000/stuffs/trash/permanent-delete/{id}",
    }
    const columnDetailModalDelete = ''

    const judulModalEdit = ''

    const inputData = {}

    return (
        <>
            <Navbar />
            <Table dataTh={dataThParent} dataTd={stuffs}  columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit}
            inputData={inputData}></Table>
        </>
    )
}