import Navbar from "../components/Navbar/Navbar";

export default function inspiration() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1 w-full h-full text-white">
                inspiration
            </div>
        </div>
    );
}
