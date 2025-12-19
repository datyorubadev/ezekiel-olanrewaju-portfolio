import Link from 'next/link'

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
            <h1>Payload CMS is Running</h1>
            <p>This is the API server for your portfolio.</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <Link href="/admin" style={{ padding: '10px 20px', background: 'black', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                    Go to Admin Dashboard
                </Link>
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'white', color: 'black', border: '1px solid black', textDecoration: 'none', borderRadius: '5px' }}>
                    View Portfolio Website
                </a>
            </div>
        </div>
    )
}
