import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <h2>header</h2>
      </header>
      <main>
        <h2>main content</h2>
      </main>
      <footer>
        <Link href="/vendor/login">login as seller</Link>
      </footer>
    </>
  );
}
