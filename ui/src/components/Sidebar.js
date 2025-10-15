import Link from "next/link";

export default function Sidebar({ sideBarLinks }) {
  return (
    <>
      <h2>Sidebar</h2>
      <aside>
        <nav>
          {sideBarLinks.map((sideBarLink) => {
            return (
              <Link
                href={`${sideBarLink.navTo}`}
                key={sideBarLink.tab}
                className=""
              >
                {sideBarLink.tab}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
