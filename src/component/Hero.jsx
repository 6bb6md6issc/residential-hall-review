import React, { useState }  from 'react'


const Hero = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    return (

        <div className='relative h-[570px]'>
            {/* Main Heading */}
            <div className="text-white underline text-6xl font-bold ml-6 md:pl-14 lg:pl-20 pt-54 lg:text-7xl">
                Find your <br /> residential hall
            </div>
            <div className="w-full max-w-90 h-16 mt-10 ml-6 md:pl-14 lg:ml-18 lg:max-w-120">
                <input
                    type="text"
                    placeholder="Enter residential hall name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="rounded-2xl w-full h-full px-4 py-3 border-2 border-black text-gray-500 bg-white text-lg focus:outline-none focus:border-black"
                />
            </div>

            <div 
                className="absolute inset-0 bg-cover bg-top h-[570px] -z-10" 
                style={{ backgroundImage: "url('./usu.png')" }}
            >
            </div>
        </div>
    )
}

export default Hero;