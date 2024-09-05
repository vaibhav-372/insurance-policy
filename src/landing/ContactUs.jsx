import React from 'react';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-10">
            <div className="w-full max-w-6xl bg-gray-700 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
                <div className="flex justify-between gap-8">
                    <div className="w-1/2">
                        <h2 className="text-xl font-bold mb-4">Our Office</h2>
                        <p className="mb-2">
                            <span className="font-semibold">Address:</span> JN road, rajahmundry, AP
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Phone:</span> +91 99557 67334
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">Email:</span> company_name@insurance.com
                        </p>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-xl font-bold mb-4">Office Hours</h2>
                        <p className="mb-2">
                            <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 5:00 PM
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Saturday:</span> 10:00 AM - 2:00 PM
                        </p>
                        <p>
                            <span className="font-semibold">Sunday:</span> Closed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
