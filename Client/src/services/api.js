import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/user-login';
    }
    return Promise.reject(error);
  }
);

// Notes API
export const notesAPI = {
  // Get all notes
  getAllNotes: async () => {
    const response = await api.get('/notes');
    const data = response.data;
    return Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
  },

  // Save a new note
  saveNote: async (title, content) => {
    // Create a file-like object from content
    const file = new File([content], `${title}.md`, { type: 'text/markdown' });
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    const response = await api.post('/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get note by ID
  getNoteById: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Update note
  updateNote: async (id, title, content) => {
    const file = new File([content], `${title}.md`, { type: 'text/markdown' });
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    const response = await api.put(`/notes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete note
  deleteNote: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },

  // Render note to HTML
  renderNote: async (id) => {
    const response = await api.get(`/notes/${id}/render`);
    return response.data;
  },
};

// Auth API (for future implementation)
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

export default api;
