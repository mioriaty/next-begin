import Link from "next/link";
import '@/styles/app.css'

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <ul>
        <li>
          <Link className="red" href={'/socials/facebook'}>Facebook</Link>
        </li>
      </ul>
    </div>
  );
}
