import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Jae Hyun Song home">
          <Image
            src="/logos/musicnote.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-gray-950">
            songjaehyun
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 text-sm font-medium text-gray-600 sm:gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-gray-950">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
