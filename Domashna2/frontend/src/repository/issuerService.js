import instance from '../custom-axios/axios'

export async function getIssuers(page = 1){
    try {
        const response = await instance.get(`/issuers/?page=${page}`);
        return response.data;
    } catch (error){
        console.log("Error fetching issuers: " + error);
        throw error;
    }
}
export async function getIssuer(id){
    try {
        const response = await instance.get(`/issuers/${id}/`);
        return response.data;
    } catch (error){
        console.log("Error fetching issuer by id: " + error);
        throw error;
    }
}

export async function addIssuer(data) {
    try {
        const response = await instance.post('/issuers/add/', data);
        return response.data;
    }
    catch(error) {
        console.error('Error adding issuer: ', error);
        throw error;
    }
}
export async function updateIssuer(id, data) {
    try {
        const response = await instance.put(`/issuers/update/${id}/`, data);
        return response.data
    }
    catch(error) {
        console.log('Error updating issuer: ', error);
        throw error;
    }
}

export async function deleteIssuer(id) {
    try {
        const response = await instance.delete(`/issuers/delete/${id}`);
          return `Issuer with id ${id} deleted.`;
    }
     catch(error) {
        console.log(`Error deleting issuer with id ${id}: `, error);
        throw error;
    }
}
