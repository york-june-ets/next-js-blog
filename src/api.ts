import { BlogProps } from "./Interfaces/blogs";

const url = "http://localhost:5000";

async function request<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {
    const res = await fetch(input, {
        headers: { "Content-Type": "application/json" },
        ...init,
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export const getBlogs = () => request<BlogProps[]>(`${url}/blogs`);
