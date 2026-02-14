import { createClient } from '@/lib/supabase/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ApiClientOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: Record<string, string>;
}

/**
 * API Client for making authenticated requests to the backend
 */
export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Get the authorization token from Supabase session
     */
    private async getAuthToken(): Promise<string | null> {
        const supabase = createClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session?.access_token || null;
    }

    /**
     * Make an API request
     */
    async request<T = any>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
        const { method = 'GET', body, headers = {} } = options;

        // Get auth token
        const token = await this.getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Prepare request options
        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials: 'include',
        };

        if (body && method !== 'GET') {
            fetchOptions.body = JSON.stringify(body);
        }

        // Make request
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, fetchOptions);

        // Handle error responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `API request failed with status ${response.status}`);
        }

        // Parse response
        return response.json();
    }

    // Convenience methods
    get<T = any>(endpoint: string, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'GET', headers });
    }

    post<T = any>(endpoint: string, body: any, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'POST', body, headers });
    }

    put<T = any>(endpoint: string, body: any, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'PUT', body, headers });
    }

    delete<T = any>(endpoint: string, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'DELETE', headers });
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience functions
export const api = {
    get: <T = any>(endpoint: string) => apiClient.get<T>(endpoint),
    post: <T = any>(endpoint: string, body: any) => apiClient.post<T>(endpoint, body),
    put: <T = any>(endpoint: string, body: any) => apiClient.put<T>(endpoint, body),
    delete: <T = any>(endpoint: string) => apiClient.delete<T>(endpoint),
};
