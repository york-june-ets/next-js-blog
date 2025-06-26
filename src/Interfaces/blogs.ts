export interface Comment {
    id: number,
    firstName: string;
    lastName: string;
    commentedAt: Date;
    comment: string;
}

export interface BlogProps {
    id: number;
    slug: string;
    title: string;
    content: string;
    author: string;
    publishedAt: Date;
    updatedAt: Date;
    comments: Comment[];
}