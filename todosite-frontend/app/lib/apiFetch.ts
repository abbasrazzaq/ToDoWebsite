import { API_BASE_URL } from './config';

type ApiFetchOptions = RequestInit;

export async function apiFetch<T = any>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const { headers, ...rest } = options;

    const mergedHeaders = new Headers(headers as HeadersInit);
    if(!mergedHeaders.has('Content-Type')) {
        mergedHeaders.set('Content-Type', 'application/json');
    }

    const res = await fetch(`${API_BASE_URL}${path}`, { 
        headers: mergedHeaders,
        ...rest,
    });

    if (!res.ok) {
        let message = await res.text();
        try {
            const json = JSON.parse(message);
            message = json?.message ?? JSON.stringify(json);
        } catch {}
        throw new Error(`API request failed: ${message}`);
    }

    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    if (contentType.includes('application/json')) {
        return res.json() as Promise<T>;
    }

    return (await res.text()) as unknown as T;
}