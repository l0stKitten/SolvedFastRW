import axios from "axios";

//create
export const createTecnicoRequest = async (Tecnico) =>
  axios.post("/api/tecnico", Tecnico);

//read
export const getAllTecnicosRequest = async (page) =>
  axios.get(`/api/tecnicos?page=${page}`);

export const getTecnicoRequest = async (id) => axios.get(`/api/tecnico/${id}`);

export const findTecnicoRequest = async (data, page) =>
  axios.post(`/api/tecnico/find?page=${page}`, data);

//update
export const updateTecnicoRequest = async (id, Tecnico) =>
  axios.put(`/api/tecnico/${id}`, Tecnico);

//delete
export const deleteTecnicoRequest = async (id) =>
  axios.delete(`/api/tecnico/${id}`);