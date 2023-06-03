import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3080/api',
})

export const driver_login = driver_info => api.post(`login/driver`, driver_info)
export const passenger_login = driver_info => api.post(`/login/passenger`, driver_info)

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    driver_login,
    passenger_login,
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis