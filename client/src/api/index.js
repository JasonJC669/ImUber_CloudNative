import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3080/api',
})

export const driver_login = driver_info => api.post(`login/driver`, driver_info)
export const passenger_login = passenger_info => api.post(`/login/passenger`, passenger_info)
export const create_group_driver = payload => api.post(`/group/creat`, payload)
export const get_group_driver = payload => api.post(`/group/get`, payload)
export const get_driver_routes_passenger = payload => api.post('/group/getNear', payload)
export const add_routes_passenger = payload => api.post('/group/join', payload)
export const get_group_passenger = payload => api.post('/group/passengerGet', payload)

const apis = {
    driver_login,
    passenger_login,
    create_group_driver,
    get_group_driver,
    get_driver_routes_passenger,
    add_routes_passenger,
    get_group_passenger,
}

export default apis