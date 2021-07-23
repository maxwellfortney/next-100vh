export default function SignUp({ blurBg, setBlurBg }: any) {
    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen">
            <div
                onClick={() => setBlurBg(false)}
                className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            ></div>
            <div className="z-30 flex flex-col items-center justify-center w-1/2 p-5 text-white bg-100vh-gray">
                <p className="self-start text-3xl font-extrabold">sign up</p>
                <div className="flex flex-col w-3/4">
                    <div className="flex">
                        <input
                            type="text"
                            className="flex-1 px-2 py-2 mr-4"
                            placeholder="first name"
                        />
                        <input
                            type="text"
                            className="flex-1 px-2 py-2"
                            placeholder="last name"
                        />{" "}
                    </div>
                    <input
                        type="text"
                        className="flex-1 px-2 py-2 my-4"
                        placeholder="email"
                    />
                    <input
                        type="password"
                        className="flex-1 px-2 py-2"
                        placeholder="password"
                    />
                    <p className="self-center my-8 text-2xl font-bold">or</p>
                </div>
            </div>
        </div>
    );
}
