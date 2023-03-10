import {axiosClient} from "../app/axios";
import {formDataForObj} from "./utils";

export const addUser = async (data:any) => {
    let res = await axiosClient().post("/users/add.json",formDataForObj(data),{headers:{ "Content-Type": "multipart/form-data" }});
    return res.data;
};


export const editUser = async (data:any) => {
    let res = await axiosClient().post("/users/edit.json",formDataForObj(data),{headers:{ "Content-Type": "multipart/form-data" }});
    return res.data;
};

export const editPassword = async (data:any) => {
    let res = await axiosClient().post("/users/edit-password.json",formDataForObj(data),{headers:{ "Content-Type": "multipart/form-data" }});
    return res.data;
};


export const deleteUser = async (id:number) => {
    let res = await axiosClient().get("/users/delete.json?id="+id);
    return res.data;
};