import ListingPreview from "../components/Jobs/ListingPreview";
import Navbar from "../components/Navbar/Navbar";

export default function Jobs() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
            <Navbar />
            <div className="flex flex-col flex-1 w-11/12 text-white">
                <h1 className="w-11/12 mt-20 text-6xl font-extrabold md:w-3/4 xl:w-1/2 lg:text-7xl">
                    hire the world’s leading designers and freelancers
                </h1>
                <div className="flex mt-16 text-lg font-extrabold">
                    <div className="flex mr-4 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                        <div className="flex justify-center w-full px-5 py-2 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                            post a job
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-full px-4 py-3 mr-auto bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                        browse designers
                    </div>
                </div>
                <p className="mt-16 text-4xl font-extrabold text-white 2xl:text-5xl">
                    popular listings
                </p>
                <div className="flex w-full mt-4 text-white">
                    <div className="flex w-3/4 2xl:w-10/12">
                        <ListingPreview
                            title="Lead Graphic Designer"
                            company="SpaceX"
                            jobTime="Full time"
                            location="Remote"
                            datePosted="yesterday"
                        />
                    </div>

                    <div className="flex flex-1 ml-3 bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                        <div className="flex flex-col flex-1 p-2 m-1 bg-100vh-gray">
                            <p className="mb-1 text-2xl font-extrabold">
                                search
                            </p>
                            <input type="text" className="py-1.5 bg-white " />
                            <p className="text-2xl font-extrabold">title</p>
                            <p className="mb-20 text-2xl font-extrabold">
                                location
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
