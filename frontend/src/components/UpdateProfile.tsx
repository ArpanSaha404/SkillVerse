import axios from "axios";
import { useState } from "react";
import { frontend_URL } from "./lib/utils";

const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedImage) {
      // Handle the form submission, e.g., upload the image to the server.
      console.log("Uploading image:", selectedImage);
      // You can use FormData to send the image as part of a POST request to the server.
      const formData = new FormData();
      formData.append("image", selectedImage);

      await axios
        .post(`${frontend_URL}/api/users/upload`, formData)
        .then((res: any) => {
          if (res.data.apiMsg) {
            console.log(res.data.apiMsg);
            console.log(res.data.url);
            console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-lg">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
