import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8028',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const fetchServices = async () => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.get('/api/services', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const fetchSingleService = async (id: string | number) => {
  const response = await api.get<ServiceSingleModel>(`/api/services/${id}`);
  return response.data;
};

const postService = async (fieldData: CreateServiceData) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.post('/api/services/create', fieldData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchUserServices = async () => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.get('/api/services/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

type UpdateServiceData = CreateServiceData & {
  serviceId: number
};

const updateService = async (fieldData:UpdateServiceData) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.put('/api/services/update', fieldData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteService = async (id: string | number) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.delete<UserServiceData>(`/api/services/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const likedService = async (serviceId: number) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  await api.post('/api/auth/liked', {
    serviceId,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const ApiService = {
  fetchServices,
  fetchSingleService,
  postService,
  fetchUserServices,
  updateService,
  deleteService,
  likedService,
};

export default ApiService;
