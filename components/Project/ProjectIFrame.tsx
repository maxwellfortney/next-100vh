import { useEffect } from "react";
import { createRef } from "react";
import { useContext } from "react";
import { CreateContext } from "../../pages/create";

interface CommonProps {
    children?: React.ReactNode;

    className?: string;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    style?: Object;
    css?: string;
    scale?: number;
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

const IFrameRef = createRef<any>();

export default function ProjectIFrame({
    html,
    css,
    js,
    scale = 1,
    className,
    onMouseEnter,
    onMouseLeave,
    style,
}: ProjectIFrame) {
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
                        <div id="Project-100vh-Container" class="absolute" style="transform: scale(${scale}); width: ${
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

    return (
        <iframe
            style={style}
            onMouseEnter={onMouseEnter as any}
            onMouseLeave={onMouseLeave as any}
            ref={IFrameRef}
            src={getGeneratedPageURL() || ""}
            onLoad={() => {
                IFrameRef.current.classList.add("opacity-100");
            }}
            className={`w-full h-full overflow-hidden opacity-0 transition-opacity duration-300 ${
                className ? className : ""
            }`}
        />
    );
}
