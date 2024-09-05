import React from 'react'

const Nav = () => {
    return (
        <div>
            <header class="text-gray-400 bg-gray-950 body-font fixed h-24 mb-5 z-10 w-full">
                <div class="container mx-auto flex flex-wrap p-5  md:flex-row items-center">
                    <div className='flex items-center'>
                        <div className='h-16 w-16 bg-cover rounded-3xl bg-[url("https://imgs.search.brave.com/PYE6SWgv87ZEdyE-aq5c4PbdFdt7iQf9k7STEZMmmRU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4Lzg0LzMyLzU3/LzM2MF9GXzg4NDMy/NTc1MF9weWhUZU5Z/SndqbEZWMzNiN1dH/NDJxZ3VGcTlRbmc3/Yi5qcGc")]'>
                        </div>
                        <p className='text-white ml-5 text-2xl'>welcome</p>
                    </div>
                    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <a class="mr-5 hover:text-white">Home</a>
                        <a class="mr-5 hover:text-white">Services</a>
                        <a class="mr-5 hover:text-white">About Us</a>
                        <a class="mr-5 hover:text-white">Contact Us</a>
                    </nav>
                    <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">login
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Nav