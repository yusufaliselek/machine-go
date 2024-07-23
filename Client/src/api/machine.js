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

const update = async (machine, id) => {
  const form = new FormData();
  appendKey(machine, form);
  try {
    const response = await api.put(`/Machine/${id}`, form);
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

const list = async (page = 1, pageSize = 10, searchTerm = "", checkedKeys = [], priceRange = { min: 0, max: 99000000 }) => {
  try {
    const response = await api.get(`/Machine`, {
      params: {
        pageNumber: page,
        pageSize: pageSize,
        searchTerm: searchTerm,
        checkedKeys: checkedKeys.join(','),
        min: priceRange.min,
        max: priceRange.max
      }
    });
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
  list
};

export default machine;