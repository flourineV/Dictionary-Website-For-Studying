import React from 'react';

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex items-center">
                {/* Logo ở bên trái */}
                <div className="text-white font-bold text-lg">
                    KWAN DICTIONARY
                </div>

                {/* Thanh tìm kiếm ở giữa */}
                <div className="flex-grow flex justify-center">
                    <div className="relative text-gray-600 w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search WORD and MEANING..."
                            className="bg-white h-10 px-5 pr-10 rounded-full w-full text-sm focus:outline-none"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <svg className="h-4 w-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M10,17c-1.657,0-3.156-0.672-4.242-1.758C4.672,14.156,4,12.657,4,11c0-1.657,0.672-3.156,1.758-4.242
                                C6.844,5.672,8.343,5,10,5s3.156,0.672,4.242,1.758C15.328,7.844,16,9.343,16,11c0,1.657-0.672,3.156-1.758,4.242
                                C13.156,16.328,11.657,17,10,17z M21,21l-4.35-4.35C17.914,15.479,18,15.249,18,15c0-2.761-2.239-5-5-5s-5,2.239-5,5
                                s2.239,5,5,5c0.249,0,0.479-0.086,0.65-0.227L21,21z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;