import React from 'react'
import MissionVision from './MissionVision'

const AboutUs = () => {
    return (
        <div>
            <section class="text-gray-400 py-20 bg-gray-900 body-font">
                <center><h1 className='text-3xl py-5 font-bold'>About Us</h1></center>
                <div class="container px-5 py-7 mx-auto bg-gray-900 flex flex-col m-16">
                    <div class="lg:w-4/6 mx-auto">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full bg-contain" src="https://imgs.search.brave.com/PcVWsOlKUboALSPzzc9u34b5NK_2ghx9CHdQvYgn-jQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tbmNs/YW5kLmNvbS90aGVt/ZXMvZGVtby9hc3Nl/dHMvaW1hZ2VzL2lt/Zy9NTkMlMjBUb3dl/ci9HYWxsZXJ5LzEw/LTA2X01OQ1Rvd2Vy/LmpwZw" />
                        </div>
                        <div class="flex flex-col sm:flex-row mt-10">
                            <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                                    <img className='rounded-full' src="https://imgs.search.brave.com/UDaghDTSVcUkRLzrB2Jnn4jwG38wf-f20GjW62O9CF0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzliL1ZpcmF0X0tv/aGxpX2luX1BNT19O/ZXdfRGVsaGkuanBn" alt="" />
                                </div>
                                <div class="flex flex-col items-center text-center justify-center">
                                    <h2 class="font-medium title-font mt-4 text-white text-lg">Virat Kohli</h2>
                                    <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                    <p class="text-base text-gray-400">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</p>
                                </div>
                            </div>
                            <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <p class="leading-relaxed text-lg mb-4">Founded in [Year], [Company Name] has grown from a small startup to one of the leading insurance providers in [Country/Region]. Our journey has been marked by a commitment to innovation, customer service, and excellence. From our humble beginnings, we have expanded our offerings and reach, always staying true to our core values.</p>
                                <a class="text-indigo-400 inline-flex items-center">Learn More
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='px-8 bg-gray-900'>
                <MissionVision />
            </div>
            <section class="text-gray-400 bg-gray-900 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-20">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Our Team</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
                    </div>
                    <div class="flex flex-wrap -m-2">
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agen 1</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 2</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/88x88" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 3</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/90x90" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 4</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/94x94" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 5</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/98x98" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 6</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/100x90" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 7</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/104x94" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 8</h2>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/108x98" />
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">Agent 9</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs