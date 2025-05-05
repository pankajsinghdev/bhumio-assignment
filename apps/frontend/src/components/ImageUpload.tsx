import { Loader2, X } from "lucide-react";
import { ChangeEvent, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface ImageData {
  id: string;
  description: string;
  originalUrl: string;
  posterUrl: string;
  createdAt: string;
}

export function ImageUpload() {
  const { user, logout } = useAuth();
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [showDialogue, setShowDialogue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetchUserPosters();
  }, []);

  const fetchUserPosters = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/posters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching posters:", error);
    }
  };

  const handleClick = () => {
    setShowDialogue(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // only image allowed
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only image files (JPEG, PNG, GIF, or WebP)");
      e.target.value = "";
      return;
    }

    // Validate file size
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size should not exceed 5MB");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleGenerate = async () => {
    if (!selectedFile || !inputValue) {
      alert("Please select a file and enter a description");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("description", inputValue);

      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      await fetchUserPosters();
      setShowDialogue(false);
      setSelectedFile(undefined);
      setInputValue(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Poster Gallery</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.firstName}!</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="bg-blue-400 m-2 p-2 rounded-md cursor-pointer text-white hover:bg-blue-500 self-start"
      >
        Add Poster
      </button>

      {/* Posters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col space-y-4">
            <div className="relative group">
              <h3 className="text-lg font-semibold mb-2">Original Image</h3>
              <img
                src={image.originalUrl}
                alt={`Original image ${image.description}`}
                className="h-64 w-64 object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105"
                onError={(e) => {
                  console.error("Error loading original image:", e);
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="relative group">
              <h3 className="text-lg font-semibold mb-2">Generated Poster</h3>
              <img
                src={image.posterUrl}
                alt={`Generated poster ${image.description}`}
                className="h-64 w-64 object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105"
                onError={(e) => {
                  console.error("Error loading poster:", e);
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <p className="mt-2 text-gray-600">{image.description}</p>
              <p className="text-sm text-gray-400">
                Created: {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Dialog */}
      {showDialogue && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Add Poster</h2>
              <button
                onClick={() => {
                  setShowDialogue(false);
                  setSelectedFile(undefined);
                  setInputValue(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded-md"
                placeholder="Enter Your description here"
                value={inputValue || ""}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="w-full p-2 border rounded-md"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">
                    Selected file: {selectedFile.name} (
                    {(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
                  </p>
                )}
              </div>
              <button
                className="w-full bg-blue-400 p-2 rounded-md text-white hover:bg-blue-500 disabled:opacity-50"
                onClick={handleGenerate}
                disabled={isLoading || !selectedFile || !inputValue}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Poster"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
