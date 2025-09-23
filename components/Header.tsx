
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo or Site Name */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          留学比較ドットコム（仮）
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 text-gray-600 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors duration-300">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/agents" className="hover:text-blue-600 transition-colors duration-300">
                エージェント一覧
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors duration-300">
                プラン一覧（comming soon）
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}