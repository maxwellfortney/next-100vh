/* eslint-disable @next/next/no-img-element */
interface ListingPreview {
    title: string;
    company: string;
    jobTime: string;
    location: string;
    datePosted: string;
}

export default function ListingPreview({
    title,
    company,
    jobTime,
    location,
    datePosted,
}: ListingPreview) {
    return (
        <>
            <div className="flex items-center justify-between w-full mb-auto text-white bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                <div className="flex justify-between w-full px-3 py-3 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                    <div className="flex flex-col">
                        <h2 className="mb-2 text-4xl font-extrabold">
                            {title}
                        </h2>
                        <h2 className="text-xl">
                            {company} - {jobTime}
                        </h2>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center mb-4 ">
                            <svg
                                className="w-6 mr-4 fill-current"
                                x="0px"
                                y="0px"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                            >
                                <path
                                    d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
			c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
			C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
			s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z"
                                />
                            </svg>
                            <h2 className="text-xl font-bold ">{location}</h2>
                        </div>
                        <h2 className="text-xl text-gray-400">{datePosted}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
