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