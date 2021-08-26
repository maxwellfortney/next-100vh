import Text100VH from "../UIKit/Text/Text100VH";
import { BiMessageAdd } from "react-icons/bi";

export default function MenuBar() {
    return (
        <div className="flex flex-col items-center w-full lg:w-11/12">
            <h1 className="self-start text-5xl font-semibold">messages</h1>
            <div className="flex flex-col w-full mt-8">
                <div className="flex justify-between w-full">
                    <div className="flex items-center">
                        <Text100VH
                            label="inbox"
                            className="text-lg font-semibold cursor-pointer"
                        />
                    </div>
                    {/* <div className="flex items-center">
                        <BiMessageAdd className="mb-2 text-2xl" />
                    </div> */}
                </div>
                <div className="flex w-full h-0.5 bg-white"></div>
            </div>
        </div>
    );
}
