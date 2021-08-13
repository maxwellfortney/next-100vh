import Text100VH from "../../UIKit/Text/Text100VH";

export default function FileDropzone({ mime, sizeLimit, className = "" }) {
    return (
        <div
            className={`flex flex-col flex-1 border border-gray-400 ${className}`}
        >
            <div className="flex flex-col items-center justify-center flex-1">
                <p className="leading-tight">drag and drop</p>
                <p className="leading-none">or</p>
                <Text100VH
                    defaultGradient={true}
                    label="browse files"
                    className="font-semibold leading-tight"
                />
            </div>
            <div className="flex items-center justify-between w-full px-2 font-semibold border-t border-gray-400">
                <div className="flex items-center">
                    <p>1 file allowed</p>
                    <p className="ml-1 text-sm text-gray-400">
                        ({sizeLimit / 1000}mb)
                    </p>
                </div>
                <p>{mime}</p>
            </div>
        </div>
    );
}
