import { CSSTransition } from "react-transition-group";

interface ModalBackground {
    children?: any;
    show: boolean;
    setShow: Function;
}

export default function ModalBackground({
    children,
    show,
    setShow,
}: ModalBackground) {
    return (
        <CSSTransition in={show} classNames="fade" timeout={200} unmountOnExit>
            <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-screen h-screen">
                <div
                    className="absolute top-0 left-0 w-screen h-screen"
                    style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    onClick={() => setShow(false)}
                ></div>
                <div className="z-10 flex items-center justify-center overflow-hidden">
                    {children}
                </div>
            </div>
        </CSSTransition>
    );
}
