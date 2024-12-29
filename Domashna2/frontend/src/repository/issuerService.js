import instance from '../custom-axios/axios'

const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
export async function getIssuers(page = 1, search = '', filters = {}) {
    const token = localStorage.getItem('accessToken');
    const query = new URLSearchParams({ page, search, ...filters });

    try {
        const response = await fetch(`http://127.0.0.1:8000/issuers/?${query.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch issuers.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching issuers:', error);
        throw error;
    }
}
export async function getIssuer(id){
    try {
        const response = await instance.get(`/issuers/${id}/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error){
        console.log("Error fetching issuer by id: " + error);
        throw error;
    }
}

export async function addIssuer(data) {
    try {
        const response = await instance.post('/issuers/add/', data, {
            headers: getAuthHeader(),
        });
        return response.data;
    }
    catch(error) {
        console.error('Error adding issuer: ', error);
        throw error;
    }
}
export async function updateIssuer(id, data) {

    try {
        const response = await instance.put(`/issuers/update/${id}/`, data, {
            headers: getAuthHeader(),
        });
        return response.data
    }
    catch(error) {
        console.log('Error updating issuer: ', error);
        throw error;
    }
}

export async function deleteIssuer(id) {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`/issuers/delete/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete issuer.');
        }
    } catch (error) {
        console.error('Error deleting issuer:', error);
        throw error;
    }
}
export async function getIssuerData(issuerCode, dataField) {
  try {
    const response = await instance.get(`/api/issuers/${issuerCode}/data/`, {
      params: { field: dataField }, headers : getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for issuer ${issuerCode}:`, error);
    throw error;
  }
}


