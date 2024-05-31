import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, columnDb, buttonData, endpoints, columnDetail, judulModalEdit, inputData }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointReplaced, setEndpointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    function handleModalDelete(id) {
        const endpointsDetail = endpoints['detail'];
        const endpointsDelete = endpoints['delete'];
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const deleteReplaced = endpointsDelete.replace('{id}', id);
        const replaced = {
            "detail": detailReplaced,
            "delete": deleteReplaced
        };
        setEndpointReplaced(replaced);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const endpointsDetail = endpoints['detail'];
        const endpointsUpdate = endpoints['update'];
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const updateReplaced = endpointsUpdate.replace('{id}', id);
        const replaced = {
            "detail": detailReplaced,
            "update": updateReplaced
        };
        setEndpointReplaced(replaced);
        setIsOpenModalEdit(true);
    }

    function handleModalAdd() {
        const replace = {
            "store": endpoints['store'],
        }
        setEndpointReplaced(replace);
        setIsOpenModalAdd(true);
    }

    const navigate = useNavigate();

    function handleRestore(id) {
        // ubah {id} menjadi id yang di klik
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore ,{
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            //ketika berhasil, arahkan ke path / stuffs
        navigate('/stuffs')
        })
        .catch(err => {
        console.log(err)
        })
    
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10 ">
                <div className="flex justify-end mb-5">
                    {
                        buttonData.includes("create") ? (
                            <button type="button" onClick={handleModalAdd} class="focus:outline-none text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-800">Create</button>
                        ) : ''
                    }
                    {
                        buttonData.includes("trash") ? (
                            <Link to={'/stuffs/trash'} type="button" class=" ml-1 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Trash</Link>
                        ) : ''
                    }
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {dataTh.map((data, index) => (
                                <th scope="col" className="px-6 py-3 items-center bg-blue-100" key={index}>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dataTd).map(([index, value]) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{parseInt(index) + 1}.</td>
                                {Object.entries(columnDb).map(([i, v]) => (
                                    <td key={i} className={`px-6 py-4 ${(!v ? value[i] : value[i.replace(/[!@#$%^&*]/, '')] ? value[i.replace(/[!@#$%^&*]/, '')][v] : 0) === 0 ? 'text-red-500' : ''}`}>
                                        {!v ? value[i] : value[i.replace(/[!@#$%^&*]/, '')] ? value[i.replace(/[!@#$%^&*]/, '')][v] : 0}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    {
                                        buttonData.includes("edit") ? (
                                        <button onClick={() => handleModalEdit(value.id)} href="#" className="text-white bg-blue-400 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit </button>
                                        ): ''
                                    }
                                    {
                                        buttonData.includes("delete") ? (
                                        <button onClick={() => handleModalDelete(value.id)} href="#" className="focus:outline-none text-white bg-red-400 hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> Delete</button>
                                        ): ''
                                    }
                                    {
                                        buttonData.includes("restore") ? (
                                        <button onClick={() => handleRestore(value.id)} href="#" className="focus:outline-none text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"> Restore</button>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes("permanent-delete") ? (
                                        <button onClick={() => handleModalDelete(value.id)} href="#" className="focus:outline-none text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> Permanent-delete</button>
                                        ) : ''
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointReplaced} columnDetail={columnDetail}></ModalDelete>
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced}></ModalEdit>
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} ></ModalAdd>
        </>
    );
}
