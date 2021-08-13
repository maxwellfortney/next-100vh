import { useContext } from "react";
import { UploadContext } from "../../../pages/upload";
import Box100VH from "../../UIKit/Boxes/Box100VH";
import FileDropzone from "./FileDropzone";

export default function UploadFiles() {
    const { setisHoveringRightDiv } = useContext(UploadContext);

    return (
        <Box100VH
            onMouseEnter={() => {
                setisHoveringRightDiv(true);
            }}
            onMouseLeave={() => {
                setisHoveringRightDiv(false);
            }}
            className="flex flex-col items-center justify-start p-3"
        >
            <h1 className="self-start mb-3 text-2xl font-bold">upload code</h1>
            <div className="flex flex-col justify-between w-full h-full max-w-full">
                <FileDropzone mime="html" sizeLimit={5000} />
                <FileDropzone mime="css" sizeLimit={5000} className="my-3" />
                <FileDropzone mime="js" sizeLimit={5000} />
            </div>
        </Box100VH>
    );
}
