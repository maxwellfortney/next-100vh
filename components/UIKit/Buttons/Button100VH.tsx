import Link from "next/link";

interface CommonProps {
  children?: React.ReactNode;

  styleType: 1 | 2 | 3; // 1 == no border no bg; 2 == gradient border no bg; 3 == gradient border and gradient bg
  label: string;
  onClick?: (any) => any;
  className?: string;
}

type ConditionalProps =
  | {
      isLink: true;
      href: string;
    }
  | {
      isLink?: false;
      href?: never;
    };

type Button100VH = CommonProps & ConditionalProps;

export default function Button100VH({
  styleType,
  label,
  onClick,
  isLink,
  href,
  className,
}: Button100VH) {
  if (styleType === 1) {
    if (isLink && href) {
      return (
        <Link href={href}>
          <a
            onClick={onClick}
            className={`relative flex font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
              className ? className : ""
            }`}
          >
            <div
              className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
              style={{
                top: "-1px",
                left: "-1px",
                width: "calc(100% + 2px)",
                height: "calc(100% + 2px)",
              }}
            />
            <div
              className={`flex justify-center w-full px-5 py-3 m-1 bg-100vh-gray ${
                className ? className : ""
              }`}
              style={{ zIndex: 1 }}
            >
              {label}
            </div>
          </a>
        </Link>
      );
    }
    return (
      <button
        onClick={onClick}
        className={`relative flex font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
          className ? className : ""
        }`}
      >
        <div
          className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
          style={{
            top: "-1px",
            left: "-1px",
            width: "calc(100% + 2px)",
            height: "calc(100% + 2px)",
          }}
        />
        <div
          className={`flex justify-center w-full px-5 py-3 m-1 bg-100vh-gray`}
          style={{ zIndex: 1 }}
        >
          {label}
        </div>
      </button>
    );
  } else if (styleType === 2) {
    if (isLink && href) {
      <Link href={href}>
        <a
          onClick={onClick}
          className={`flex font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
            className ? className : ""
          }`}
        >
          <div className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
            {label}
          </div>
        </a>
      </Link>;
    }
    return (
      <button
        onClick={onClick}
        className={`flex font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
          className ? className : ""
        }`}
      >
        <div className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
          {label}
        </div>
      </button>
    );
  } else if (styleType === 3) {
    if (isLink && href) {
      return (
        <Link href={href}>
          <a
            onClick={onClick}
            className={`relative flex items-center justify-center px-1 font-extrabold group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
              className ? className : ""
            }`}
          >
            <div
              className="absolute transition-colors duration-300 bg-transparent group-hover:bg-100vh-gray"
              style={{
                width: "calc(100% - 8px)",
                height: "calc(100% - 8px)",
              }}
            />
            <p className="px-5 py-4" style={{ zIndex: 1 }}>
              {label}
            </p>
          </a>
        </Link>
      );
    }
    return (
      <button
        onClick={onClick}
        className={`relative flex items-center justify-center px-1 font-extrabold group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
          className ? className : ""
        }`}
      >
        <div
          className="absolute transition-colors duration-300 bg-transparent group-hover:bg-100vh-gray"
          style={{
            width: "calc(100% - 8px)",
            height: "calc(100% - 8px)",
          }}
        />
        <p className="px-5 py-4" style={{ zIndex: 1 }}>
          {label}
        </p>
      </button>
    );
  } else {
    return null;
  }
}
