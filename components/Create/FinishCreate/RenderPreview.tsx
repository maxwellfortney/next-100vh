import { useEffect } from "react";
import { useContext } from "react";
import { CreateContext } from "../../../pages/create";

export default function RenderPreview() {
    const { htmlFile, cssFile, jsFile } = useContext(CreateContext);

    const getGeneratedPageURL = (
        html: string,
        css: string,
        js: string,
        scale: number = 1
    ) => {
        const getBlobURL = (code, type) => {
            const blob = new Blob([code], { type });
            return URL.createObjectURL(blob);
        };

        const cssURL = getBlobURL(css, "text/css");
        const jsURL = getBlobURL(js, "text/javascript");

        const source = `
              <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=.5">
    
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
    };

    useEffect(() => {
        const url = getGeneratedPageURL(
            htmlFile.text,
            cssFile && cssFile.text,
            jsFile && jsFile.text,
            0.75
        );

        const iframe = document.querySelector(
            `#Project-Preview`
        ) as HTMLIFrameElement;
        (iframe as any).src = url;

        iframe.onload = () => {
            const doc =
                iframe.contentWindow?.document.querySelector("#testDiv");

            doc?.classList.add("opacity-100");
        };
    }, []);

    return (
        <iframe
            id="Project-Preview"
            className="w-full h-full overflow-hidden"
        />
    );
}
