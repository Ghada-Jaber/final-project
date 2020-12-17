import axios from 'axios';
import CookieService from './Service/CookieService';

const BASE_URL = '/api'

const cookie = CookieService.get('access_token');

const token = {
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + cookie
    },
}


export default{

    checkLogin: (login) =>
    axios.post(`${BASE_URL}/login`,login),

    register: (register) =>
    axios.post(`${BASE_URL}/register`,register),

    details: () =>
    axios.get(`${BASE_URL}/details`, token),

    changeProfile: (profile) =>
    axios.put(`${BASE_URL}/user/profile`, profile, token),

    logout: () =>
    axios.get(`${BASE_URL}/logout`, token),

    getCountry: () =>
    axios.get(`${BASE_URL}/country`),

    getCity: (country_id) =>
    axios.get(`${BASE_URL}/city/${country_id}`),

    getStreet: (city_id) =>
    axios.get(`${BASE_URL}/street/${city_id}`),

    getInfoMedicine: (id) =>
    axios.get(`${BASE_URL}/admin/medicine/getInfo/${id}`, token),

    updateMedicineInfo: (medicine, id) =>
    axios.put(`${BASE_URL}/admin/medicine/info/${id}`, medicine, token),

    deleteMedicine: (id) =>
    axios.delete(`${BASE_URL}/admin/medicine/${id}`, token),

    getMedicinePharmacy: (id) =>
    axios.get(`${BASE_URL}/admin/medicine/${id}/pharmacy`, token),
    
    getAllMedicine: ()=>
    axios.get(`${BASE_URL}/pharmacy/medicine/allMedicine`, token),

    getMedicine: () =>
    axios.get(`${BASE_URL}/pharmacy/medicine`, token),

    getMedicineByName: (name) =>
    axios.post(`${BASE_URL}/pharmacy/medicine/getByName`, name, token),

    getOrderMedicineByNameAsc: () =>
    axios.get(`${BASE_URL}/pharmacy/medicine/orderNameAsc`, token),

    getOrderMedicineByNameDesc: () =>
    axios.get(`${BASE_URL}/pharmacy/medicine/orderNameDesc`, token),

    getOrderMedicineByPriceAsc: () =>
    axios.get(`${BASE_URL}/pharmacy/medicine/orderPriceAsc`, token),

    getOrderMedicineByPriceDesc: () =>
    axios.get(`${BASE_URL}/pharmacy/medicine/orderPriceDesc`, token),
    

    showMedicine: (id) =>
    axios.get(`${BASE_URL}/pharmacy/medicine/${id}`, token),

    addMedicine: (medicine) =>
    axios.post(`${BASE_URL}/pharmacy/medicine`, medicine, token),

    addMedicineInfo: (medicine) =>
    axios.post(`${BASE_URL}/admin/medicine/addInfo`, medicine, token),

    editMedicine: (id) =>
    axios.get(`${BASE_URL}/pharmacy/medicine/${id}`, token),

    updateMedicine: (medicine, id) =>
    axios.put(`${BASE_URL}/pharmacy/medicine/${id}`, medicine, token),


    getAllMedicineAvailable: () =>
    axios.get(`${BASE_URL}/user/pharmacyMedicine`, token),
}
