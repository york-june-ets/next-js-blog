import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BlogProps } from '@/Interfaces/blogs';

export default function BlogPost() {
    const [post, setPost] = useState<BlogProps | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (!slug || typeof slug !== 'string') return;

        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/blogs?slug=${slug}`);
                const data = await res.json();
                setPost(data[0] || null);
            } catch (err) {
                console.error('Failed to fetch post:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <h1>404 - Post not found</h1>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>By: {post.author}</p>
        </div>
    );
}
