import {
  CloudUpload,
  FileVideo,
  LayoutTemplate,
  Pencil,
  Trash2,
  TriangleAlert,
  VideoOff,
} from "lucide-react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { chapterEditStatusType, createNewChapterType } from "../types/teacher";
import { cn } from "./lib/utils";
import { Textarea } from "./ui/textarea";
import ReactPlayer from "react-player";
import { Switch } from "./ui/switch";

const EditChapters = () => {
  const [formData, setFormData] = useState<createNewChapterType>({
    id: 0,
    chapterTitle: "",
    chapterDesc: "",
    chapterVidURL: "",
    isChapterPublished: false,
  });

  const [formTempData, setFormTempData] = useState<createNewChapterType>({
    id: 0,
    chapterTitle: "",
    chapterDesc: "",
    chapterVidURL: "",
    isChapterPublished: false,
  });

  const [editStatus, setEditStatus] = useState<chapterEditStatusType>({
    id: false,
    chapterTitle: false,
    chapterDesc: false,
    chapterVidURL: false,
    isChapterPublished: false,
  });

  const [video, setVideo] = useState<string | null>(null);

  const isPublished = true;
  const isWarning = false;
  const isLoading = false;

  const handleResetStatus = () => {
    setEditStatus({
      id: false,
      chapterTitle: false,
      chapterDesc: false,
      chapterVidURL: false,
      isChapterPublished: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    status: boolean
  ) => {
    const { name, value } = e.target;
    if (status) {
      setFormTempData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const vidUrl = URL.createObjectURL(selectedFile);
      setVideo(vidUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full">
        <form className="space-y-8 md:m-12 m-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="flex justify-between items-center pb-2">
              <div className="space-y-2">
                <h1 className="text-hvrBrwn text-4xl">ChaptSetup</h1>
                <h1 className="text-lg text-hvrBrwn">
                  Complete all Fields (0/3)
                </h1>
              </div>
              <div className="divCenter gap-4">
                <Menubar className="bg-white text-Brwn border-2 bolder-solid border-brwn shadow-lg hover:bg-hvrBrwn hover:text-white">
                  <MenubarMenu>
                    <MenubarTrigger>Save Changes</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Button className="h-full w-full p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                          {!isPublished ? `Save as Draft` : `Save Changes`}
                        </Button>
                      </MenubarItem>
                      <MenubarItem>
                        <Button className="h-full w-full p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                          {!isPublished ? `Publish Course` : `Unpublish Course`}
                        </Button>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>

                <Button className="bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                  <Trash2 className="m-2" />
                </Button>
              </div>
            </div>
            <Separator />
            {isWarning && (
              <div className="bg-yellow-300 flex justify-start items-center">
                <TriangleAlert className="mx-4 my-2" /> This is a Warning...
              </div>
            )}
            <div className="flex justify-evenly items-start flex-col md:flex-row py-4 w-full gap-12">
              <div className="space-y-4 w-1/2">
                <div className="flex justify-start items-center text-hvrBrwn text-2xl">
                  <div className="divCenter bg-gray-200 p-2 rounded-full mr-2">
                    <LayoutTemplate />
                  </div>{" "}
                  Customize your Chapter
                </div>
                {/* Chapter Title */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="chapterTitle" className="text-xl">
                      Title :
                    </label>
                    <div
                      onClick={() => {
                        handleResetStatus();
                        setEditStatus((prev) => ({
                          ...prev,
                          chapterTitle: true,
                        }));
                      }}
                    >
                      <Pencil />
                    </div>
                  </div>
                  {!isLoading ? (
                    <input
                      id="subTitle"
                      type="text"
                      name="subTitle"
                      value={formTempData.chapterTitle}
                      onChange={(e) => handleChange(e, editStatus.chapterTitle)}
                      className={cn(
                        "p-3 w-full rounded-md focus:outline-none",
                        editStatus.chapterTitle
                          ? "border focus:outline-2 focus:ring-2 focus:ring-hvrBrwn"
                          : ""
                      )}
                    />
                  ) : (
                    <Loading skeletonType="EditCourses" />
                  )}
                  {editStatus.chapterTitle && (
                    <div className="gap-4 flex">
                      <Button
                        onClick={() => {
                          handleResetStatus();
                          setFormTempData(formData);
                        }}
                        className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleResetStatus();
                          setFormData((prev) => ({
                            ...prev,
                            chapterTitle: formTempData.chapterTitle,
                          }));
                        }}
                        className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                {/* Description */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="chapterDesc" className="text-xl">
                      Description :
                    </label>
                    <div
                      onClick={() => {
                        handleResetStatus();
                        setEditStatus((prev) => ({
                          ...prev,
                          chapterDesc: true,
                        }));
                      }}
                    >
                      <Pencil />
                    </div>
                  </div>
                  {!isLoading ? (
                    <Textarea
                      id="chapterDesc"
                      name="chapterDesc"
                      value={formTempData.chapterDesc}
                      onChange={(e) => handleChange(e, editStatus.chapterDesc)}
                      className={cn(
                        "p-3 w-full rounded-md",
                        editStatus.chapterDesc
                          ? "border-solid border-hvrBrwn"
                          : ""
                      )}
                    />
                  ) : (
                    <Loading skeletonType="EditCourses" />
                  )}
                  {editStatus.chapterDesc && (
                    <div className="gap-4 flex">
                      <Button
                        onClick={() => {
                          handleResetStatus();
                          setFormTempData(formData);
                        }}
                        className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleResetStatus();
                          setFormData((prev) => ({
                            ...prev,
                            chapterDesc: formTempData.chapterDesc,
                          }));
                        }}
                        className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                {/* Free Video Idx */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="isChapterPublished-xl">
                      Make Video Free :
                    </label>
                    <div
                      onClick={() => {
                        handleResetStatus();
                        setEditStatus((prev) => ({
                          ...prev,
                          chapterTitle: true,
                        }));
                      }}
                    >
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 w-1/2">
                {/* Video */}
                <div className="space-y-4">
                  <div className="flex justify-start items-center text-hvrBrwn text-2xl">
                    <div className="divCenter bg-gray-200 p-2 rounded-full mr-2">
                      <FileVideo />
                    </div>{" "}
                    Upload your Video
                  </div>
                  <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl">Chapter Video :</h1>
                      <label
                        htmlFor="coursePic"
                        className="divCenter text-xl cursor-pointer"
                      >
                        <CloudUpload className="mr-2" />
                        Upload a Video
                      </label>
                    </div>
                    <div className="divCenter">
                      <input
                        id="coursePic"
                        type="file"
                        accept="video/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {video ? (
                        <ReactPlayer
                          width={650}
                          height={340}
                          playing={false}
                          url={video}
                          controls
                        />
                      ) : (
                        <div className="h-56 w-56 divCenter text-hvrBrwn">
                          <VideoOff size={40} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChapters;
