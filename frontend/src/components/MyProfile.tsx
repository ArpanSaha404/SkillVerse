import { Loader2, LockKeyhole, Plus, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  ChnagePasswordInputState,
  userChangePasswordSchema,
} from "../schema/userSchema";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  useUpdatePicMutation,
  useUpdateProfileMutation,
} from "../features/api/authApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";
import {
  changePassDltAccType,
  responseType,
  updateProfilePicType,
} from "../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAppSelector } from "../app/hooks";
import { Skeleton } from "./ui/skeleton";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "../features/authSlice";

const MyProfile = () => {
  const [formVisible, setFormVisible] = useState<{
    changePass: boolean;
    dltAcc: boolean;
  }>({
    changePass: false,
    dltAcc: false,
  });
  const [formData, setFormData] = useState<ChnagePasswordInputState>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    text: "",
  });
  const [errors, SetErrors] = useState<Partial<ChnagePasswordInputState>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [updatePic, { isLoading: picLoading }] = useUpdatePicMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useAppSelector((state) => state.auth.email);
  const _id = useAppSelector((state) => state.auth._id);
  const fullName = useAppSelector((state) => state.auth.fullName);
  const pic = useAppSelector((state) => state.auth.pic);

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("_id", _id);

    try {
      const res: updateProfilePicType = await updatePic(formData).unwrap();
      if (res.pic) {
        dispatch(updateProfilePic(pic));
        toast.error(res.apiMsg, {
          style: toastStyles.success,
        });
      } else {
        toast.error(res.apiMsg, {
          style: toastStyles.error,
        });
      }
    } catch (error: any) {
      toast.error(error.data.apiMsg, {
        style: toastStyles.error,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const type = formVisible.changePass ? "changePass" : "dltAcc";

    const result = userChangePasswordSchema.safeParse(formData);
    const changePassFieldErrors = result.error?.formErrors.fieldErrors;
    if (type === "changePass") {
      if (
        changePassFieldErrors?.password ||
        changePassFieldErrors?.newPassword ||
        changePassFieldErrors?.confirmNewPassword
      ) {
        SetErrors(changePassFieldErrors as Partial<ChnagePasswordInputState>);
        return;
      }
    } else {
      if (changePassFieldErrors?.password || changePassFieldErrors?.text) {
        SetErrors(changePassFieldErrors as Partial<ChnagePasswordInputState>);
        return;
      }
    }

    try {
      if (type === "dltAcc") {
        if (formData.text !== "delete my account") {
          SetErrors((prev) => ({
            ...prev,
            text: `Please Type "delete my account"`,
          }));
          return;
        }
      }
      const bodyData: changePassDltAccType = { ...formData, email, type };
      const res: responseType = await updateProfile(bodyData).unwrap();
      toast.success(res.apiMsg, {
        style: toastStyles.success,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      toast.error(error.data.apiMsg, {
        style: toastStyles.error,
      });
    }
  };

  return (
    <div className="max-w-screen px-6 bg-white rounded-lg shadow-lg min-h-screen space-y-2 text-hvrBrwn">
      <Navbar />
      <Toaster />
      <div className="flex-col divCenter">
        <h2 className="text-3xl font-bold text-center text-hdrBrwn mt-4 mb-8">
          My Profile
        </h2>
        <div className="flex items-center justify-between gap-20 mb-16">
          <div className="divCenter gap-8">
            {!picLoading ? (
              <div className="divCenter group ">
                <div className="divCenter absolute group-hover:opacity-50">
                  <Avatar className="h-14 w-14 text-2xl">
                    <AvatarImage src={pic} />
                    <AvatarFallback>
                      {fullName
                        .split(" ")
                        .map((data) => data[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <Plus
                    className="relative left-0 top-0 z-10 opacity-0 group-hover:opacity-80"
                    size={40}
                    onClick={handleUpload}
                  />
                </div>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <Skeleton className="w-16 h-16 rounded-full" />
            )}
            <div>
              <h1 className="text-3xl">{fullName}</h1>
              <h1 className="text-lg">{email}</h1>
            </div>
          </div>
          <div className="divCenter flex-col space-y-4">
            <Button
              className="w-40 bg-hvrBrwn text-white rounded-md hover:bg-hdrBrwn"
              onClick={() => {
                setFormVisible({ changePass: true, dltAcc: false });
              }}
            >
              Change Password
            </Button>
            <Button
              className="w-40 bg-hvrBrwn text-white rounded-md hover:bg-hdrBrwn"
              onClick={() => {
                setFormVisible({ changePass: false, dltAcc: true });
              }}
            >
              Delete My Account
            </Button>
          </div>
        </div>
        {(formVisible.changePass || formVisible.dltAcc) && (
          <form className="h-1/2" onSubmit={handleSubmit}>
            {formVisible.changePass && (
              <div className="space-y-8">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Old Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2" />
                    {errors && (
                      <span className="text-sm text-red-500">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="New Password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2" />
                    {errors && (
                      <span className="text-sm text-red-500">
                        {errors.newPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2" />
                    {errors && (
                      <span className="text-sm text-red-500">
                        {errors.confirmNewPassword}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            {formVisible.dltAcc && (
              <div className="space-y-8 mb-12">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2" />
                    {errors && (
                      <span className="text-sm text-red-500">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="type delete my account"
                      name="text"
                      value={formData.text}
                      onChange={handleChange}
                      className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                    />
                    <Trash2 className="absolute inset-y-2 left-2" />
                    {errors && (
                      <span className="text-sm text-red-500">
                        {errors.text}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-md text-red-500">
                  Purchased Coures, if any will be Deleted,
                  <br /> along with all your Account Data
                </span>
              </div>
            )}
            {!isLoading ? (
              <Button
                type="submit"
                className="w-full py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
              >
                {formVisible.changePass
                  ? "Change my Password"
                  : "Delete my Account"}
              </Button>
            ) : (
              <Button
                disabled
                className=" divCenter gap-4 w-full py-2 mt-4 bg-hdrBrwn text-white rounded-md"
              >
                <Loader2 className="animate-spin" /> Please Wait...
              </Button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

// import { useState, useRef } from "react";
// import axios from "axios"; // Or you can use fetch if preferred

// const MyProfile = () => {
//   const [isUploading, setIsUploading] = useState(false); // To manage loading state
//   const [pic, setPic] = useState<string>(""); // To store the uploaded image URL if needed

//   // Use ref to trigger file input click programmatically
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (!selectedFile) return; // If no file selected, exit

//     setIsUploading(true); // Show loading state

//     // Create FormData to send the file to the backend
//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       // Send the file to the backend using axios (or fetch)
//       const response = await axios.post("/upload-endpoint", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Handle successful upload (update the state or notify the user)
//       toast.success("Profile picture uploaded successfully", {
//         style: toastStyles.success,
//       });

//       // Optionally, update the state to show the uploaded image
//       setPic(response.data.imageUrl); // Assuming the backend returns image URL

//     } catch (error) {
//       toast.error("Error uploading image", {
//         style: toastStyles.error,
//       });
//     } finally {
//       setIsUploading(false); // Hide loading state
//     }
//   };

//   const handleAvatarClick = () => {
//     // Trigger the click event on file input when avatar is clicked
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div className="max-w-screen px-6 bg-white rounded-lg shadow-lg min-h-screen space-y-2 text-hvrBrwn">
//       <Navbar />
//       <div className="flex-col divCenter">
//         <h2 className="text-3xl font-bold text-center text-hdrBrwn mt-4 mb-8">
//           My Profile
//         </h2>
//         <div className="flex items-center justify-between gap-20 mb-16">
//           <div className="divCenter gap-8">
//             <div className="divCenter group relative">
//               <div
//                 className="divCenter absolute group-hover:opacity-50"
//                 onClick={handleAvatarClick}
//               >
//                 <Avatar className="h-14 w-14 text-2xl">
//                   <AvatarImage src={pic} />
//                   <AvatarFallback>
//                     {fullName
//                       .split(" ")
//                       .map((data) => data[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//               <div>
//                 <Plus
//                   className="relative -left-1 top-0 z-10 opacity-0 group-hover:opacity-80"
//                   size={40}
//                 />
//               </div>
//             </div>
//             {/* Hidden file input */}
//             <input
//               type="file"
//               name="image"
//               onChange={handleFileChange}
//               accept="image/*"
//               className="hidden"
//               ref={fileInputRef} // Attach the ref here
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
