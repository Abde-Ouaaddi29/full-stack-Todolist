import { useEffect } from 'react';

export const UseCsrfToken = () => {
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch CSRF token');
                }
                console.log('CSRF token fetched successfully');
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);
};
