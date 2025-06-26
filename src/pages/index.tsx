import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Page() {
    const router = useRouter()

    return (<>
        <h1>About Me</h1>
        <Link href={'/blog'}>Enter Site</Link>
    </>)
}