import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Jaehyun Song
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-600 max-w-sm">
              Client, product, and enterprise software engineering across backend
              systems, full-stack platforms, and cloud delivery.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Site
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-black">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Connect
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="https://dontsweat.tech/"
                  className="hover:text-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  DontSweat.Tech
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gonsaje"
                  className="hover:text-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jaesong2/"
                  className="hover:text-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p className="mt-1 text-xs text-gray-500">
            Java • Spring Boot • Node.js • React • AWS
          </p>
          © {new Date().getFullYear()} songjaehyun.
        </div>

      </div>
    </footer>
  );
}
