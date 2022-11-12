import { getSECURE_API, API, baseURL } from 'api';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/categories`;
  return req;
});

export const getAllCategories = () => SECURE_API.get('');
export const deleteCategory = (id) => SECURE_API.delete(`/${id}`);

export const createCategory = (body) => SECURE_API.post('', body);

export const updateCategory = (id, body) => SECURE_API.patch(`/${id}`, body);
