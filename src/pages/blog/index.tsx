import Link from 'next/link';
import { GetStaticProps } from 'next';
import { BlogProps } from '@/Interfaces/blogs';

export default function BlogIndex({ blogs }: { blogs: BlogProps[] }) {
    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('http://localhost:5000/blogs');
    const blogs = await res.json();
    return { props: { blogs }, revalidate: 60 };
};
