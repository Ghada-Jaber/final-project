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

    firebaseLogin: (firebaseToken) =>
    axios.post(`${BASE_URL}/login`, firebaseToken),

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


    deleteUser: (id, active) =>
    axios.put(`${BASE_URL}/admin/user/delete/${id}`, active, token),

    activeUser: (id, active) =>
    axios.put(`${BASE_URL}/admin/user/active/${id}`, active, token),

    getInfoPharmacy: (id) =>
    axios.get(`${BASE_URL}/admin/pharmacy/getInfo/${id}`, token),

    getInfoDoctor: (id) =>
    axios.get(`${BASE_URL}/admin/doctor/getInfo/${id}`, token),

    getInfoMedicine: (id) =>
    axios.get(`${BASE_URL}/admin/medicine/getInfo/${id}`, token),

    updateMedicineInfo: (medicine, id) =>
    axios.put(`${BASE_URL}/admin/medicine/info/${id}`, medicine, token),

    updatePharmacy: (pharmacy, id) =>
    axios.put(`${BASE_URL}/admin/pharmacy/${id}`, pharmacy, token),

    

    deleteMedicine: (id) =>
    axios.delete(`${BASE_URL}/admin/medicine/${id}`, token),

    getMedicinePharmacy: (id) =>
    axios.get(`${BASE_URL}/admin/medicine/${id}/pharmacy`, token),

    getPharmacyMedicine: (id) =>
    axios.get(`${BASE_URL}/admin/pharmacy/${id}/medicine`, token),


    addSymptom: (symptom) =>
    axios.post(`${BASE_URL}/admin/symptom`, symptom, token),
    
    getAllMedicine: (url)=>
    axios.get(`${url}`, token),

    getUsers: (type)=>
    axios.get(`${BASE_URL}/admin/allUsers/${type}`, token),

    getAllSymptom: () =>
    axios.get(`${BASE_URL}/admin/getAllSymptom`, token),

    getAllAvailableMedicine: () =>
    axios.get(`${BASE_URL}/pharmacy/available/medicine`, token),

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

    showUserMedicine: (id) =>
    axios.get(`${BASE_URL}/user/medicine/${id}`, token),

    updateMedicineDetail: (detail, id) =>
    axios.put(`${BASE_URL}/pharmacy/medicine/${id}`, medicine, token),

    addMedicine: (medicine) =>
    axios.post(`${BASE_URL}/pharmacy/medicine`, medicine, token),

    addMedicineInfo: (medicine) =>
    axios.post(`${BASE_URL}/admin/medicine/addInfo`, medicine, token),

    editMedicine: (id) =>
    axios.get(`${BASE_URL}/pharmacy/medicine/${id}`, token),

    updateMedicineDetail: (detail, id) =>
    axios.put(`${BASE_URL}/pharmacy/medicine/${id}`, detail, token),

    getPharmacyOrder: () =>
    axios.get(`${BASE_URL}/pharmacy/order`, token),


    getPharmacyOrders: () =>
    axios.get(`${BASE_URL}/pharmacy/orders`, token),

    getPharmacyReservation: () =>
    axios.get(`${BASE_URL}/pharmacy/reservation`, token),


    deliver: (buy_id, deliver) =>
    axios.put(`${BASE_URL}/pharmacy/deliver/${buy_id}`, deliver, token),


    confirmReservation: (cart_id, conf) =>
    axios.put(`${BASE_URL}/pharmacy/confirm/${cart_id}`, conf, token),

    


    getAllMedicineAvailable: (id) =>
    axios.get(`${BASE_URL}/user/allMedicine/${id}`, token),

    addToCart: (id, addtocart) =>
    axios.post(`${BASE_URL}/user/medicine/addCartMedicine/${id}`, addtocart, token),


    getCartMedicine: () =>
    axios.get(`${BASE_URL}/user/cart/getCartMedicine`, token),


    deleteCartMedicine: (id) =>
    axios.delete(`${BASE_URL}/user/cart/deleteCart/${id}`, token),


    addPayment: (payment) =>
    axios.post(`${BASE_URL}/user/addPayment`, payment, token),

    askPrescription: (patient) =>
    axios.post(`${BASE_URL}/user/askPrescription`, patient, token),

    getPrescription: () =>
    axios.get(`${BASE_URL}/user/getPrescription`, token),


    ShowPrescription: (id)=>
    axios.get(`${BASE_URL}/user/prescription/${id}`, token),

    getAskPrescription: () =>
    axios.get(`${BASE_URL}/doctor/getAskPrescription`, token),

    getPatient: () =>
    axios.get(`${BASE_URL}/doctor/getPatient`, token),

    getMedicineAvailable: () =>
    axios.get(`${BASE_URL}/doctor/getMedicine`, token),

    getAddPrescription: (id) =>
    axios.get(`${BASE_URL}/doctor/prescription/${id}`, token),


    sendPrescription: (send, id) =>
    axios.post(`${BASE_URL}/doctor/send/${id}`, send, token),


    sendNotification: (data)=>
    axios.post(`${BASE_URL}/save_fcm_token`, data, token),


    getusers: () =>
    axios.get(`${BASE_URL}/all/users`, token),


    
}
