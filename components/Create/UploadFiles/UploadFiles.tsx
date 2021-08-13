import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { CreateContext } from "../../../pages/create";
import Box100VH from "../../UIKit/Boxes/Box100VH";
import Button100VH from "../../UIKit/Buttons/Button100VH";
import FileDropzone from "./FileDropzone";

export default function UploadFiles() {
    const { activeDiv, setActiveDiv, htmlFile, jsFile, setShowFinishCreate } =
        useContext(CreateContext);
    return (
        <Box100VH
            style={{ minHeight: "450px" }}
            onMouseEnter={() => {
                setActiveDiv("UploadFiles");
            }}
            // onMouseLeave={() => {
            //     setActiveDiv("FromGitRepo");
            // }}
            isActive={activeDiv === "UploadFiles"}
            className="flex flex-col items-center justify-start p-3"
        >
            <div className="flex items-center justify-between w-full mb-3">
                <h1 className="self-start text-2xl font-bold">upload code</h1>
                <CSSTransition
                    timeout={300}
                    classNames="fade"
                    in={htmlFile !== null || jsFile !== null}
                    unmountOnExit
                >
                    <Button100VH
                        styleType={3}
                        label="next"
                        className="h-full px-3"
                        borderWidth={3}
                        onClick={() => setShowFinishCreate(true)}
                    />
                </CSSTransition>
            </div>
            <div className="flex flex-col justify-between w-full h-full max-w-full">
                <FileDropzone
                    mimeType="text/html"
                    mimeName="html"
                    sizeLimit={5}
                />
                <FileDropzone
                    mimeType="text/css"
                    mimeName="css"
                    sizeLimit={5}
                    className="my-3"
                />
                <FileDropzone
                    mimeType="text/javascript"
                    mimeName="js"
                    sizeLimit={5}
                    className="mb-1"
                />
            </div>
        </Box100VH>
    );
}
