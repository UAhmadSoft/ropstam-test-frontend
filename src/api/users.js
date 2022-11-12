import { getSECURE_API, API, baseURL } from 'api';
import axios from 'axios';
import { toast } from 'react-toastify';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/users`;
  return req;
});

// API.interceptors.request.use((req) => {
//   req.baseURL = `${req.baseURL}/users`;
//   return req;
// });

export const getMe = () => SECURE_API.get('/me');
export const getMyNotifications = () => SECURE_API.get('/notifications');
export const updateMe = (newProfile) =>
  SECURE_API.patch('/me', {
    ...newProfile,
  });
export const updatePassword = (body) =>
  axios.patch(
    `${baseURL}/auth/update-password`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );

export const getAllUsers = (values) => SECURE_API.get('');
export const deleteUser = (id) => SECURE_API.delete(`/${id}`);

export const logIn = (values) => API.post('/auth/login', values);
export const signUp = (values) => API.post('/auth/signup', values);

export const createUser = (user) => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  console.log('formData', formData);

  return fetch(`${baseURL}/users`, {
    body: formData,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || null}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(await res.json());
    }
    // callBack?.();
  });
};
export const updateUser = (id, user) => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  if (!user.avatar) formData.delete('avatar');

  console.log('formData', formData);

  return fetch(`${baseURL}/users/${id}`, {
    body: formData,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || null}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      toast.success('Document Created Successfully');
      return await res.json();
    } else {
      return Promise.reject(await res.json());
    }
    // callBack?.();
  });
};
