export const formDataForObj = (data:any) => {
    const formData = new FormData();
    for(const [k,v] of Object.entries(data)){
        formData.set(k,""+v);
    }
    return formData;
}