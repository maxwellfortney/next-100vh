import Navbar from "../components/Navbar/Navbar";

export default function Settings() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
      style={{ paddingTop: "92px" }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full text-white">
        settings
      </div>
    </div>
  );
}
