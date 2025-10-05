import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

return (
    <nav className="border-b border-gray-700" style={{ background: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className="text-white text-xl font-bold" style={{ textDecoration: 'none' }}>
                        Orbit25
                    </Link>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ textDecoration: 'none' }}>
                            Home
                        </Link>
                        <Link href="/Timeline" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ textDecoration: 'none' }}>
                            Timeline
                        </Link>
                        <Link href="/iss-model" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ textDecoration: 'none' }}>
                            3D ISS Model
                        </Link>
                        <Link href="/Astronauts" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ textDecoration: 'none' }}>
                            Astronaut Stories
                        </Link>
                        <Link href="/quiz" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ textDecoration: 'none' }}>
                            Quiz / Interactive Challenges
                        </Link>
                        <Link href="/About" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ textDecoration: 'none' }}>
                            About / Credits
                        </Link>
                    </div>
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: 'none' }}>
                        Home
                    </Link>
                    <Link href="/timeline" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: 'none' }}>
                        Timeline
                    </Link>
                    <Link href="/iss-model" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: 'none' }}>
                        3D ISS Model
                    </Link>
                    <Link href="/astronaut-stories" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: 'none' }}>
                        Astronaut Stories / Experiments
                    </Link>
                    <Link href="/quiz" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: 'none' }}>
                        Quiz / Interactive Challenges
                    </Link>
                    <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ textDecoration: 'none' }}>
                        About / Credits
                    </Link>
                </div>
            </div>
        )}
    </nav>
);
}