import Link from 'next/link';
export default function Page() {

    return (<>
        <h1>About Me</h1>
        <Link href={'/blog'}>Enter Site</Link>
    </>)
}