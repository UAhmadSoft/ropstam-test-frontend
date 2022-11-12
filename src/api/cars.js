import { getSECURE_API, API, baseURL } from 'api';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/cars`;
  return req;
});

export const getAllCars = () => SECURE_API.get('');
export const deleteCar = (id) => SECURE_API.delete(`/${id}`);

export const createCar = (body) => SECURE_API.post('', body);

export const updateCar = (id, body) => SECURE_API.patch(`/${id}`, body);
