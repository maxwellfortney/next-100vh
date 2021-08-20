export default function AnimatedTexts() {
    //     *{
    //         height: 100vh;
    //         /*100 view height, all the time.*/
    //    }
    return (
        <div className="absolute top-0 left-0 w-full h-full md:text-lg xl:text-xl opacity-70">
            <div
                className="absolute flex flex-col font-extrabold text-gray-400 animate-bounce-rLeft"
                style={{ top: "20%", left: "13%" }}
            >
                <p>{`*{`}</p>
                <p className="ml-3">{`height: 100vh;`}</p>
                <p className="ml-3">{`/*100 view height, all the time.*/`}</p>
                <p className="">{`}`}</p>
            </div>
            <div
                className="absolute flex flex-col font-extrabold text-gray-400 animate-bounce-rRight"
                style={{ top: "18%", left: "75%" }}
            >
                <p>{`<html>`}</p>
                <p className="ml-3">{`<head>`}</p>
                <p className="ml-6">{`<title>100vh</title>`}</p>
                <p className="ml-3">{`</head>`}</p>
                <p className="ml-3">{`<body>`}</p>
                <p className="ml-3">{`</body>`}</p>
                <p className="">{`</html>`}</p>
            </div>
            <div
                className="absolute flex flex-col font-extrabold text-gray-400 delay-150 animate-bounce-rLeft"
                style={{ top: "70%", left: "75%" }}
            >
                <p>{`#100vh {`}</p>
                <p className="ml-3">{`height: 100vh;`}</p>
                <p className="ml-3">{`display: flex;`}</p>
                <p className="">{`}`}</p>
            </div>
            <div
                className="absolute flex flex-col font-extrabold text-gray-400 delay-150 animate-bounce-rRight"
                style={{ top: "65%", left: "10%" }}
            >
                <p>{`function 100VH() {`}</p>
                <p className="ml-3">{`for(i=0; i < 100; i++) {`}</p>
                <p className="ml-6">{`console.log(“100vh”);`}</p>
                <p className="ml-3">{`}`}</p>
                <p className="">{`}`}</p>
            </div>
        </div>
    );
}
