import { Cross, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [selectedFiles, setSelectedFile] = useState<File>();
  const [showDialogue, setShowDialogue] = useState(false);
  const handleClick = () => {
    setShowDialogue(true);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alert("file not found");
    setSelectedFile(file);
    console.log(file);
  };
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div>hello</div>
      <button
        onClick={handleClick}
        className="bg-blue-400 m-2 p-2 rounded-md cursor-pointer text-white"
      >
        Add Poster
      </button>
      {showDialogue && (
        <div className="absolute ease-in-out w-full h-full outline flex items-center justify-center backdrop-blur-sm">
          <div className=" w-2/4 h-2/4 bg-white rounded-lg outline">
            <div className="bg-blue-400 h-16 text-white text-3xl flex items-center justify-between font-semibold p-2">
              <h2> Add Poster</h2>
              <span
                typeof="button"
                onClick={() => setShowDialogue(false)}
                className="cursor-pointer"
              >
                <X size={32} />
              </span>
            </div>
            <div className="flex flex-col justify-around w-full">
              <input
                className="m-2 p-2 outline-1 rounded-md"
                placeholder="Enter Your description here"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <input
                type="file"
                className="border-2 rounded-md m-2 p-2 "
                onChange={handleFileChange}
              />
              <button className="bg-blue-400 p-2 m-2 rounded-md text-white">
                Upload
              </button>
              <button></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
