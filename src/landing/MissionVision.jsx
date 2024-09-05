import React from 'react'

const MissionVision = () => {
    return (
        <div>
            <h1 className='text-4xl text-center py-5 font-semibold text-gray-500'>Our Story</h1>
            <section className='bg-gray-800 flex p-10 gap-10'>
                <div className='bg-gray-700 p-9 rounded-full border-2 border-white'>
                    <h1 className='text-2xl font-semibold'>Our Mission</h1>
                    <p>At [Company Name], our mission is to provide comprehensive, reliable, and tailored insurance solutions that safeguard our clients' futures. We are committed to delivering exceptional value and personalized service, ensuring peace of mind through every stage of life.</p>
                </div>
                <div className='bg-gray-700 p-9 rounded-full border-2 border-white'>
                    <h1 className='text-2xl font-semibold'>Our Vision</h1>
                    <p>We envision a future where everyone has access to innovative insurance products and services that meet their unique needs. Our goal is to be a trusted partner in financial protection, continuously evolving to exceed our clients’ expectations and set new standards in the insurance industry.</p>
                </div>
            </section>

        </div>
    )
}

export default MissionVision