import React, { useState, useEffect } from "react"; // 1. Added useEffect
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Camera, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Optional: You can also store the email dynamically if your backend returns it
  const [userEmail, setUserEmail] = useState("user@example.com");

  // 2. NEW: Fetch User Data on Page Load 🔄
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        // We call a route to get the current user's info
        // Note: Make sure your backend has a GET route at this URL!
        const response = await axios.get("https://netflix-backend-u33z.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          // Set the profile picture from the database
          setAvatarUrl(response.data.user.profilePicture);
          // If your backend returns email, you can set it here too:
          // setUserEmail(response.data.user.email);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        // Don't show an error toast here, it's annoying on page load.
        // Just let it fail silently or redirect to login if 401.
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 3. Get Token for Authorization 🎟️
      const token = localStorage.getItem("token");

      // 4. Send Request with Token in Headers
      const response = await axios.post(
        "https://netflix-backend-u33z.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // <--- Critical for knowing WHO is uploading
          },
        }
      );

      if (response.data.success) {
        setAvatarUrl(response.data.imageUrl);
        toast.success("Profile Picture Updated! 📸");
        setFile(null); // Clear the file selection after success
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-black text-white pt-[100px] px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-4">
          Account
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile Picture */}
          <div className="md:col-span-1">
            <div className="bg-[#141414] p-6 rounded-lg text-center border border-gray-700">
              <h3 className="text-gray-400 mb-4 font-semibold uppercase text-xs tracking-wider">
                Profile Picture
              </h3>

              <div className="relative w-32 h-32 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-800 relative bg-gray-600 flex items-center justify-center">
                  {/* Logic: Show Preview (if picking new) OR AvatarUrl (from DB) OR Default Icon */}
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                <label className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700 transition">
                  <Camera size={18} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>

              {file && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-white text-black font-bold py-2 rounded mt-2 hover:bg-gray-200 transition flex justify-center items-center gap-2"
                >
                  {uploading ? <ClipLoader size={15} /> : "Save Photo"}
                </button>
              )}

              <p className="text-xs text-gray-500 mt-4">Allowed: JPG, PNG</p>
            </div>
          </div>

          {/* RIGHT COLUMN: User Details */}
          <div className="md:col-span-2">
            <div className="bg-[#141414] p-6 rounded-lg border border-gray-700 mb-6">
              <h3 className="text-gray-400 mb-4 font-semibold uppercase text-xs tracking-wider">
                Member Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  {/* Using the state variable here */}
                  <p className="text-lg">{userEmail}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Plan Details</label>
                  <p className="text-lg flex items-center gap-2">
                    Premium (4K + HDR)
                    <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-white">
                      Active
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="border border-gray-600 text-gray-400 px-6 py-2 rounded hover:text-white hover:border-white transition flex items-center gap-2"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
