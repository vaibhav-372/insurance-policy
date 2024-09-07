import React from 'react'
import Card from './card';
import ServiceCard from './card';
import Home from './Home';
import OurServices from './OurServices';


const Services = () => {

    const cards = [
        {
            imageSrc: "https://imgs.search.brave.com/r4jrua8873zlRfdXl6ig-Ttklko2C7foq7ZVqvqVg_8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzAzL1RBVEFfQUlH/X2xvZ28ucG5n",
            title: "Tata AIG General Insurance",
            description: "A joint venture between Tata Group and American International Group (AIG), Tata AIG is known for its diverse offerings, including motor, travel, health, and property insurance, focusing on customer satisfaction."
        },
        {
            imageSrc: "https://imgs.search.brave.com/UBYHSOSzo16Hxpf-q4t1XK2arSIiOKmZLpT5An5JtO0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWxvZ292ZWN0/b3JzLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNy9s/aWMtbGlmZS1pbnN1/cmFuY2UtY29ycG9y/YXRpb24tb2YtaW5k/aWEtbG9nb19mcmVl/bG9nb3ZlY3RvcnMu/bmV0Xy02NDB4NDAw/LnBuZw",
            title: "Life Insurance Corporation of India",
            description: "LIC is India’s largest and most trusted life insurance provider. Founded in 1956, it dominates the life insurance market, offering a wide range of policies, including term, endowment, and pension plans."
        },
        {
            imageSrc: "https://imgs.search.brave.com/GmKdcPqyjid070GM8FhAh0k6Vne4Y_ob-AtowBzg3cU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cG9saWN5eC5jb20v/aW1hZ2VzL3NiaS1s/aWZlLWluc3VyYW5j/ZS1sb2dvLXdlYi53/ZWJw",
            title: "SBI Life Insurance",
            description: "A joint venture between the State Bank of India and BNP Paribas Cardif, SBI Life provides comprehensive insurance products catering to individuals and corporate clients, focusing on affordability and coverage."
        },
        {
            imageSrc: "https://imgs.search.brave.com/itYFkQHwi2Rw2JA3j5BlOCPSpxlX3lIsO25wZSRqmVg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzA0L01heF9MaWZl/X0luc3VyYW5jZV9s/b2dvLnN2Zw",
            title: "Max Life Insurance",
            description: "Max Life is known for its long-term savings and protection plans, focusing on delivering comprehensive life insurance products along with efficient claims management and customer service."
        },
        {
            imageSrc: "https://imgs.search.brave.com/Xp2J20FWL3OQvJb3o39Sae3TqsPPY4LeJUm_c7XUuTc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzlkL0tvdGFrX0xp/ZmVfTG9nby0xLnBu/Zw",
            title: "Kotak Mahindra Life Insurance",
            description: "A subsidiary of Kotak Mahindra Bank, Kotak Life offers a range of insurance solutions, including term plans, savings, and investment products, with a focus on financial planning and protection."
        },
        {
            imageSrc: "https://imgs.search.brave.com/UvvUhdTUbMi_xhdtfQGZBgk7MC2ICkymqMDIA_df2EU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1IvcmVsaWFu/Y2UtZ2VuZXJhbC1p/bnN1cmFuY2UtbG9n/by1EMjYyNEUzRDhB/LXNlZWtsb2dvLmNv/bS5wbmc",
            title: "Reliance General Insurance",
            description: "Reliance General Insurance is part of Reliance Capital, offering a variety of general insurance solutions, including motor, health, home, and travel insurance. It is recognized for its strong customer support and innovative solutions."
        },
        {
            imageSrc: "https://imgs.search.brave.com/K_Dr6QIkQnbvQl8SXZNRCenLZQSqs4sEjmar14KVizA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0gvaGRmYy1s/aWZlLWxvZ28tNDI1/MjY0NDFFMy1zZWVr/bG9nby5jb20ucG5n",
            title: "HDFC Life Insurance",
            description: "HDFC Life is a prominent player in the life insurance market, offering a wide array of term, savings, and investment-linked plans. It is known for its digital-first approach and financial stability."
        },
        {
            imageSrc: "https://imgs.search.brave.com/ptMiKBe5t3RmmYROB-pDs2qSshpPerbobqxzsVXaccA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWxvZ292ZWN0/b3JzLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOS9u/ZXctaW5kaWEtYXNz/dXJhbmNlLWxvZ28u/cG5n",
            title: "New India Assurance",
            description: " A government-owned general insurance company, New India Assurance is the largest in its segment. It provides a wide range of products, including health, motor, marine, and fire insurance, with a global presence."
        },
    ];

    return (
        <div>
            <section className="text-gray-400 body-font bg-gray-900 pt-7">
                {/* <center><h1 className='text-3xl font-bold '>Our Services</h1></center> */}
                <OurServices/>
                <div className="container px-14 py-24 mx-auto bg-gray-800 ">
                    <div className="flex flex-wrap w-full mb-20 items-center">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0 justify-center items-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Companies who’ve trusted our Insurance</h1>
                        </div>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">
                            "Join the many trusted companies that have placed their confidence in our insurance services. From small businesses to large enterprises, we’ve provided tailored coverage solutions to protect what matters most. With a commitment to reliability, expertise, and personalized care, we’ve built lasting relationships, ensuring peace of mind for companies across various industries. Trust us to safeguard your business with comprehensive insurance solutions."            </p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {cards.map((card, index) => (
                            <ServiceCard
                                key={index}
                                imageSrc={card.imageSrc}
                                subtitle={card.subtitle}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Services