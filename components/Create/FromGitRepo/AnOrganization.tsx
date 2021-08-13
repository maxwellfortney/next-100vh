/* eslint-disable @next/next/no-img-element */
export default function AnOrganization({
    image,
    name,
    reposUrl,
    url,
    setActiveOrg,
    isDefault = false,
}) {
    function handleClick() {
        setActiveOrg({ image, name, reposUrl, url, isDefault });
    }

    return (
        <div
            onClick={handleClick}
            className="relative flex items-center justify-start w-full bg-gradient-to-br from-100vh-cyan to-100vh-purple"
            style={{ height: "46px" }}
        >
            <div className="absolute w-full h-full transition-opacity opacity-100 bg-100vh-gray hover:opacity-0"></div>
            <div className="z-10 flex items-center justify-start">
                <img src={image} alt={name} className="w-6 h-6 mx-2" />
                <p>{name}</p>
            </div>
        </div>
    );
}
