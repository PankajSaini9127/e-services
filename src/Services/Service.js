import axios from 'axios'

const API_LIVE = 'http://localhost:8080'

export async function sing_up (data){
    return await axios.post(`${API_LIVE}/auth/register`,data)
}

export async function auth_in (data){
    return await axios.post(`${API_LIVE}/auth/sign-in`,data)
}

export async function register (data){
    return await axios.post(`${API_LIVE}/service/register`,data)
}

export async function update_service (id,data){
    return await axios.put(`${API_LIVE}/service/update/${id}`,data)
}

export async function get_all_user (){
    return await axios.get(`${API_LIVE}/service/get-all-service`)
}

export async function get_service_id (id){
    return await axios.get(`${API_LIVE}/service/get-service/${id}`)
}

export async function get_service_user (location){
    return await axios.get(`${API_LIVE}/service/get_all_user_service/${location}`)
}

export async function get_provider (location){
    return await axios.get(`${API_LIVE}/service/get-provide?location=${location}`)
}

export async function submit_contact_query (data){
    return await axios.post(`${API_LIVE}/contact/submit/contact-query`,data)
}

export async function get_all_contact_query (){
    return await axios.get(`${API_LIVE}/contact/get-all/contact-query`)
}

