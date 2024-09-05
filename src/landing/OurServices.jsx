import React from 'react';

const OurServices = () => {
    return (
        <div className="min-h-screen bg-contain flex flex-col items-center ">
            <h1 className="text-4xl font-bold mb-10 text-center">Our Insurance Services</h1>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-8">
                <ServiceCard
                    title="Health Insurance"
                    description="Comprehensive health insurance plans to protect you and your family."
                    imgSrc="https://imgs.search.brave.com/-BzzlJEua6NyQZ30Ax0NVQgHNBhNaEdMpudfUs5ZbMo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9j/MmZkMmY5NGFhNTU1/NDQzMjdmYzhlZDg5/MDFhZWRiMmVlYzhl/MzUzNTI0MzQ1MmI0/MzY0NmViODA4NmVm/ZTFhLzY4NzQ3NDcw/NzMzYTJmMmY3OTYx/NzY3NTdhNjM2NTZj/Njk2YjY1NzIyZTY3/Njk3NDY4NzU2MjJl/Njk2ZjJmNzM2MTZk/NzA2YzY1MmQ2OTZk/NjE2NzY1NzMyZjY5/NmQ2MTY3NjUyZDM0/MzQyZTZhNzA2Nw.jpeg"
                />
                <ServiceCard
                    title="Car Insurance"
                    description="Reliable car insurance to cover all your driving needs."
                    imgSrc="https://imgs.search.brave.com/-BzzlJEua6NyQZ30Ax0NVQgHNBhNaEdMpudfUs5ZbMo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9j/MmZkMmY5NGFhNTU1/NDQzMjdmYzhlZDg5/MDFhZWRiMmVlYzhl/MzUzNTI0MzQ1MmI0/MzY0NmViODA4NmVm/ZTFhLzY4NzQ3NDcw/NzMzYTJmMmY3OTYx/NzY3NTdhNjM2NTZj/Njk2YjY1NzIyZTY3/Njk3NDY4NzU2MjJl/Njk2ZjJmNzM2MTZk/NzA2YzY1MmQ2OTZk/NjE2NzY1NzMyZjY5/NmQ2MTY3NjUyZDM0/MzQyZTZhNzA2Nw.jpeg"
                />
                <ServiceCard
                    title="Bike Insurance"
                    description="Affordable bike insurance plans for two-wheelers."
                    imgSrc="https://imgs.search.brave.com/-BzzlJEua6NyQZ30Ax0NVQgHNBhNaEdMpudfUs5ZbMo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9j/MmZkMmY5NGFhNTU1/NDQzMjdmYzhlZDg5/MDFhZWRiMmVlYzhl/MzUzNTI0MzQ1MmI0/MzY0NmViODA4NmVm/ZTFhLzY4NzQ3NDcw/NzMzYTJmMmY3OTYx/NzY3NTdhNjM2NTZj/Njk2YjY1NzIyZTY3/Njk3NDY4NzU2MjJl/Njk2ZjJmNzM2MTZk/NzA2YzY1MmQ2OTZk/NjE2NzY1NzMyZjY5/NmQ2MTY3NjUyZDM0/MzQyZTZhNzA2Nw.jpeg"
                />
                <ServiceCard
                    title="House Insurance"
                    description="Secure your OurServiceswith our flexible house insurance plans."
                    imgSrc="https://imgs.search.brave.com/-BzzlJEua6NyQZ30Ax0NVQgHNBhNaEdMpudfUs5ZbMo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9j/MmZkMmY5NGFhNTU1/NDQzMjdmYzhlZDg5/MDFhZWRiMmVlYzhl/MzUzNTI0MzQ1MmI0/MzY0NmViODA4NmVm/ZTFhLzY4NzQ3NDcw/NzMzYTJmMmY3OTYx/NzY3NTdhNjM2NTZj/Njk2YjY1NzIyZTY3/Njk3NDY4NzU2MjJl/Njk2ZjJmNzM2MTZk/NzA2YzY1MmQ2OTZk/NjE2NzY1NzMyZjY5/NmQ2MTY3NjUyZDM0/MzQyZTZhNzA2Nw.jpeg"
                />
                <ServiceCard
                    title="Life Insurance"
                    description="Ensure the financial security of your loved ones with life insurance."
                    imgSrc="https://imgs.search.brave.com/-BzzlJEua6NyQZ30Ax0NVQgHNBhNaEdMpudfUs5ZbMo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9j/MmZkMmY5NGFhNTU1/NDQzMjdmYzhlZDg5/MDFhZWRiMmVlYzhl/MzUzNTI0MzQ1MmI0/MzY0NmViODA4NmVm/ZTFhLzY4NzQ3NDcw/NzMzYTJmMmY3OTYx/NzY3NTdhNjM2NTZj/Njk2YjY1NzIyZTY3/Njk3NDY4NzU2MjJl/Njk2ZjJmNzM2MTZk/NzA2YzY1MmQ2OTZk/NjE2NzY1NzMyZjY5/NmQ2MTY3NjUyZDM0/MzQyZTZhNzA2Nw.jpeg"
                />
                <ServiceCard
                    title="Family Insurance"
                    description="Comprehensive plans to safeguard the health and well-being of your family."
                    imgSrc="https://imgs.search.brave.com/-BzzlJEua6NyQZ30Ax0NVQgHNBhNaEdMpudfUs5ZbMo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9j/MmZkMmY5NGFhNTU1/NDQzMjdmYzhlZDg5/MDFhZWRiMmVlYzhl/MzUzNTI0MzQ1MmI0/MzY0NmViODA4NmVm/ZTFhLzY4NzQ3NDcw/NzMzYTJmMmY3OTYx/NzY3NTdhNjM2NTZj/Njk2YjY1NzIyZTY3/Njk3NDY4NzU2MjJl/Njk2ZjJmNzM2MTZk/NzA2YzY1MmQ2OTZk/NjE2NzY1NzMyZjY5/NmQ2MTY3NjUyZDM0/MzQyZTZhNzA2Nw.jpeg"
                />
            </div>
        </div>
    );
};

const ServiceCard = ({ title, description, imgSrc }) => {
    return (
        <div className="border-gray-100 border-[1px] shadow-lg shadow-gray-500 rounded-lg p-6 text-center">
            <img className="w-full h-40 object-cover mb-4" src={imgSrc} alt={title} />
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <a className='text-blue-700 font-medium underline hover:text-sm' href="">learn more</a>
        </div>
    );
};

export default OurServices;
