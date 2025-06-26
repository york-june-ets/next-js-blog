import { BlogProps, Comment } from '@/Interfaces/blogs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export default function BlogPost({ blog }: { blog: BlogProps }) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            const res = await fetch(`http://localhost:5000/blogs/${blog.id}`);
            const data = await res.json();
            console.log({ data })
            setComments(data.comments);
        };

        fetchComments();
    }, [blog.id]);

    return (
        <div>
            <h1>{blog.title}</h1>
            <p><i>By {blog.author}</i></p>
            <p>{blog.content}</p>

            <hr />
            <h2>Comments</h2>
            {comments.length === 0 ? <p>No comments yet.</p> : (
                <div>
                    {comments.map((c) => (
                        <div>
                            <p key={c.id}><b>{c.firstName} {c.lastName}</b>: {c.comment}</p>
                            <span>Commented on: {new Date(c.commentedAt).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('http://localhost:5000/blogs');
    const blogs = await res.json();
    const paths = blogs.map((blog: BlogProps) => ({
        params: { slug: blog.slug },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug;
    const res = await fetch(`http://localhost:5000/blogs?slug=${slug}`);
    const blogData = await res.json();

    if (!blogData[0]) return { notFound: true };

    return {
        props: {
            blog: blogData[0],
        },
        revalidate: 10, // ISR every 10 seconds
    };
};
