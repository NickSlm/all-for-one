import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(
                    'http://localhost:5000/refresh',
                    {}, 
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }
                    }
                );
                const token  = response.data.access_token;
                localStorage.setItem('token', token);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            }   catch (error) {
                console.log(error)
                // redirect to login
            }
        }
    
        return Promise.reject(error);
    }
);

export default api