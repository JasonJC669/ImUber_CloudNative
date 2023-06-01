import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3080/api',
})


export const getAllDriver = () => api.get(`/driver`)

export const Driver_login = Driver_ID => api.post(`/movie`, Driver_ID)
export const Passenger_login = payload => api.post(`/movie`, payload)

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    getAllDriver,
    Driver_login,
    Passenger_login,
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis