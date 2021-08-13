import prettyBytes from "pretty-bytes";
import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CreateContext } from "../../../pages/create";
import Text100VH from "../../UIKit/Text/Text100VH";

export default function FileDropzone({
    mimeType,
    mimeName,
    sizeLimit,
    className = "",
}) {
    const [infoMessage, setInfoMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        activeDiv,
        setActiveDiv,
        htmlFile,
        setHtmlFile,
        cssFile,
        setCssFile,
        jsFile,
        setJsFile,
    } = useContext(CreateContext);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (getFileForMime() !== null) {
                handleRemoveFile();
            }

            setIsLoading(true);

            console.log(file);
            const reader = new FileReader();

            reader.onabort = () => {
                setIsLoading(false);

                console.log("file reading was aborted");
                setInfoMessage("failed to read file");
                setTimeout(() => {
                    setInfoMessage(null);
                }, 5000);
            };
            reader.onerror = () => {
                setIsLoading(false);

                console.log("file reading has failed");
                setInfoMessage("failed to read file");
                setTimeout(() => {
                    setInfoMessage(null);
                }, 5000);
            };
            reader.onload = () => {
                setIsLoading(false);

                file.text = reader.result;
                if (mimeName === "html") {
                    setHtmlFile(file);
                } else if (mimeName === "css") {
                    setCssFile(file);
                } else if (mimeName === "js") {
                    setJsFile(file);
                }
            };

            if (file.type !== mimeType) {
                setInfoMessage("file must be of type " + mimeName);
                setTimeout(() => {
                    setInfoMessage(null);
                }, 5000);
            } else {
                if (file.size > sizeLimit * (5 * Math.pow(10, 6))) {
                    setInfoMessage("file size is too large");
                    setTimeout(() => {
                        setInfoMessage(null);
                    }, 5000);
                } else {
                    reader.readAsText(file);
                }
            }
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if (isDragActive) {
            if (activeDiv !== "UploadFiles") {
                setActiveDiv("UploadFiles");
            }
        }
    }, [isDragActive]);

    function handleRemoveFile() {
        if (mimeName === "html") {
            setHtmlFile(null);
        } else if (mimeName === "css") {
            setCssFile(null);
        } else if (mimeName === "js") {
            setJsFile(null);
        }
    }

    function getFileForMime() {
        if (mimeName === "html") {
            return htmlFile;
        } else if (mimeName === "css") {
            return cssFile;
        } else if (mimeName === "js") {
            return jsFile;
        }
    }

    return (
        <div
            className={`flex flex-col flex-1 border border-gray-400 ${className}`}
        >
            <div
                className="flex flex-col items-center justify-center flex-1"
                {...getRootProps()}
            >
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={infoMessage || getFileForMime()}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames="fade"
                    >
                        {getFileForMime() ? (
                            <svg className="w-14 h-14" viewBox="0 0 20 20">
                                <rect
                                    x="5"
                                    y="6"
                                    width="10"
                                    height="8"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20V20ZM14.6337 8.38375C14.8614 8.148 14.9874 7.83224 14.9846 7.5045C14.9817 7.17675 14.8503 6.86324 14.6185 6.63148C14.3868 6.39972 14.0732 6.26826 13.7455 6.26541C13.4178 6.26256 13.102 6.38855 12.8663 6.61625L8.75 10.7325L7.13375 9.11625C6.898 8.88855 6.58224 8.76256 6.2545 8.76541C5.92675 8.76826 5.61324 8.89972 5.38148 9.13148C5.14972 9.36324 5.01826 9.67675 5.01541 10.0045C5.01256 10.3322 5.13855 10.648 5.36625 10.8837L7.86625 13.3837C8.10066 13.6181 8.41854 13.7497 8.75 13.7497C9.08146 13.7497 9.39934 13.6181 9.63375 13.3837L14.6337 8.38375V8.38375Z"
                                    fill="url(#paint0_linear)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear"
                                        x1="3.125"
                                        y1="3.125"
                                        x2="10.625"
                                        y2="20"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#00FFFF" />
                                        <stop offset="1" stopColor="#8000FF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : (
                            <>
                                {isLoading ? (
                                    <svg
                                        className={`w-8 h-8 text-white animate-spin`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-10"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        ></circle>
                                        <path
                                            className="opacity-90"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <>
                                        {infoMessage ? (
                                            <p>{infoMessage}</p>
                                        ) : (
                                            <>
                                                <p className="leading-tight">
                                                    {isDragActive
                                                        ? "drop here"
                                                        : "drag and drop"}
                                                </p>
                                                <p className="leading-none">
                                                    or
                                                </p>
                                                <Text100VH
                                                    defaultGradient={true}
                                                    label="browse files"
                                                    className="font-semibold leading-tight"
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </CSSTransition>
                </SwitchTransition>
                <input type="file" accept={mimeType} {...getInputProps()} />
            </div>
            <div className="flex items-center justify-between w-full px-2 font-semibold border-t border-gray-400">
                <div className="flex items-center">
                    {getFileForMime() ? (
                        <>
                            <p>{getFileForMime().name}</p>
                            <p className="ml-1 text-sm text-gray-400">
                                (
                                {prettyBytes(getFileForMime().size, {
                                    maximumFractionDigits: 1,
                                })}
                                )
                            </p>
                        </>
                    ) : (
                        <>
                            <p>1 file allowed</p>
                            <p className="ml-1 text-sm text-gray-400">
                                ({sizeLimit}mb)
                            </p>
                        </>
                    )}
                </div>
                <div className="flex items-center">
                    {getFileForMime() ? (
                        <button
                            onClick={handleRemoveFile}
                            className="px-1 text-xs font-semibold transition-colors duration-300 bg-red-600 border border-red-600 hover:bg-transparent"
                        >
                            remove
                        </button>
                    ) : (
                        <p>{mimeName}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
