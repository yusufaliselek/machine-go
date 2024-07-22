import api, { appendKey } from "./config";

const create = async (machine) => {
  const form = new FormData();
  appendKey(machine, form);
  try {
    const response = await api.post("/Machine", form);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const update = async (machine) => {
  const form = new FormData();
  appendKey(machine, form);
  try {
    const response = await api.put("/Machine", form);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const remove = async (id) => {
  try {
    const response = await api.delete(`/Machine/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const get = async (id) => {
  try {
    const response = await api.get(`/Machine/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const list = async (page = 1, pageSize = 10, searchTerm = "") => {
  try {
    const response = await api.get(`/Machine?pageNumber=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const machine = {
  create,
  update,
  remove,
  get,
  list,
}

export default machine;