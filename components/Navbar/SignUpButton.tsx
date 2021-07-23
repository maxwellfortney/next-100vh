export default function SignUpButton() {
    return (
        <div className="relative flex mr-2 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
            <div
                className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
                style={{
                    top: "-1px",
                    left: "-1px",
                    width: "calc(100% + 2px)",
                    height: "calc(100% + 2px)",
                }}
            />
            <div
                className="flex justify-center w-full px-5 py-3 m-1 bg-100vh-gray"
                style={{ zIndex: 1 }}
            >
                sign up
            </div>
        </div>
    );
}
