// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-black text-white flex justify-between items-center p-4">
            <div className="text-lg font-semibold">
                <Link href="/">
                    <div className="hover:text-gray-300">Logo</div> {/* Replace "Logo" with your logo */}
                </Link>
            </div>
            <ul className="flex gap-4">
                <li>
                    <Link href="/about">
                        <div className="hover:text-gray-300">About</div>
                    </Link>
                </li>
                <li>
                    <Link href="/features">
                        <div className="hover:text-gray-300">Features</div>
                    </Link>
                </li>
                <li>
                    <Link href="/pricing">
                        <div className="hover:text-gray-300">Pricing</div>
                    </Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;
