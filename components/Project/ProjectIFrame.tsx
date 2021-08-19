import { useEffect } from "react";
import { useState } from "react";
import { createRef } from "react";
import { useContext } from "react";
import { CreateContext } from "../../pages/create";

interface CommonProps {
    children?: React.ReactNode;

    className?: string;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    onMouseMove?: Function;
    style?: Object;
    css?: string;
    scale?: number;
    onLoad?: Function;
}

type ConditionalProps =
    | {
          html: string;
          js?: string;
      }
    | {
          html?: string;
          js: string;
      };

type ProjectIFrame = CommonProps & ConditionalProps;

export default function ProjectIFrame({
    html,
    css,
    js,
    scale = 1,
    className,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    style,
    onLoad,
}: ProjectIFrame) {
    const [generatedURL, setGeneratedURL] = useState<any>(null);

    const IFrameRef = createRef<any>();

    function getGeneratedPageURL() {
        const getBlobURL = (code, type) => {
            const blob = new Blob([code], { type });
            return URL.createObjectURL(blob);
        };

        const cssURL = getBlobURL(css, "text/css");
        const jsURL = getBlobURL(js, "text/javascript");

        const source = `
              <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=${scale}">
    
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
                ${
                    css
                        ? `<link rel="stylesheet" type="text/css" href="${cssURL}" />`
                        : ""
                }
                  ${js ? `<script src="${jsURL}"></script>` : ""}
                </head>
                <body>
                    <div class="overflow-hidden">
                        <div class="absolute" style="transform: scale(${scale}); width: ${
            100 * (1 / scale)
        }%; height: ${100 * (1 / scale)}%; left: -${
            (100 * (1 / scale) - 100) / 2
        }%; top: -${(100 * (1 / scale) - 100) / 2}%">
                            ${html || ""}
                        </div>
                    </div>            
                </body>
              </html>
            `;

        return getBlobURL(source, "text/html");
    }

    // Adding html,css, and js as dependencies could possibly add vulnerability
    useEffect(() => {
        setGeneratedURL(getGeneratedPageURL());
    }, []);

    return (
        <iframe
            style={style}
            onMouseEnter={onMouseEnter as any}
            onMouseLeave={onMouseLeave as any}
            onMouseMove={onMouseMove as any}
            ref={IFrameRef}
            src={generatedURL}
            onLoad={() => {
                console.log("loaded");
                IFrameRef.current.classList.add("opacity-100");
                if (onLoad) {
                    onLoad();
                }
            }}
            className={`w-full h-full overflow-hidden opacity-0 transition-opacity duration-300 ${
                className ? className : ""
            }`}
        />
    );
}
