import React, {useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function User(){
    const dataThParent = 
    [
      "#",
       "Username",
        "Email",
        "Role",
        "Action"
        ];
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8000/users", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            const sortedUsers = res.data.data.sort((a, b) => a.email.localeCompare(b.email));
                setUsers(sortedUsers);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const columnDatabase = {
        "username": null,
        "email": null,
        "role": null,
  };

      const buttons = [
        "edit",
        "delete",
        "create"
      ];
      
      const endpoints = {
        "detail":"http://localhost:8000/users/{id}",
        "delete":"http://localhost:8000/users/delete/{id}",
        "update":"http://localhost:8000/users/update/{id}",
        "store":"http://localhost:8000/users/store"
      }
      const columnDetailModalDelete = 'username'

      const judulModalEdit = 'User'

      const inputData = {
        "username":{
            "type": "text",
            "options": null,
        },
        "email":{
            "type":"text",
            "options": null,
        },
        "password":{
            "type":"password",
            "options": null,
        },
        "role":{
            "type": "select",
            "options": ['staff','admin']
        },
      }

return(
    <>
    <Navbar />
      <div class="p-10">
        <Table
         dataTh={dataThParent}
         dataTd={users}
         columnDb={columnDatabase}
         buttonData={buttons}
         endpoints={endpoints}
         columnDetail={columnDetailModalDelete}
         judulModalEdit={judulModalEdit}
         inputData={inputData}
        />
      </div>


    </>
);
}