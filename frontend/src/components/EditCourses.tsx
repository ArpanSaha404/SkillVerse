import { useAppSelector } from "../app/hooks";
import { courseEditStatusType, createNewCourseType } from "../types/teacher";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import {
  CloudUpload,
  FolderUp,
  ImageOff,
  IndianRupee,
  LayoutTemplate,
  Pencil,
  Plus,
  TableOfContents,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { cn } from "./lib/utils";
import { useAllCategoriesDataQuery } from "../features/api/categoryApi";
import Loading from "./Loading";
import EditChapterList from "./EditChapterList";

const EditCourses = () => {
  const [params] = useSearchParams();
  const isNewCourse = params.get("new");
  const courseTitle: string = params.get("course") || "";
  const courseId = params.get("id");

  const userID = useAppSelector((state) => state.auth._id);
  const userName = useAppSelector((state) => state.auth.fullName);
  const navigate = useNavigate();

  const { data: categoriesInfo } = useAllCategoriesDataQuery();

  const [formData, setFormData] = useState<createNewCourseType>({
    name: courseTitle,
    createdBy: userName,
    creatorId: userID,
    subTitle: "",
    desc: "",
    price: 0,
    chapters: [
      // {
      //   id: 0,
      //   chapterTitle: "asd",
      //   chapterDesc: "awsqwesd",
      //   chapterVidURL: "hello",
      //   isChapterPublished: true,
      // },
      // {
      //   id: 1,
      //   chapterTitle: "qwa",
      //   chapterDesc: "awsqwesd",
      //   chapterVidURL: "hello",
      //   isChapterPublished: true,
      // },
      // {
      //   id: 2,
      //   chapterTitle: "zxc",
      //   chapterDesc: "awsqwesd",
      //   chapterVidURL: "hello",
      //   isChapterPublished: true,
      // },
    ],
  });

  const [formTempData, setFormTempData] = useState<createNewCourseType>({
    name: courseTitle,
    createdBy: userName,
    creatorId: userID,
    subTitle: "",
    desc: "",
    price: 0,
    chapters: [],
  });

  const [editStatus, setEditStatus] = useState<courseEditStatusType>({
    name: false,
    subTitle: false,
    desc: false,
    price: false,
  });

  const [image, setImage] = useState<string | null>(null);

  const isLoading = false;
  const isPublished = true;
  const isWarning = false;
  useEffect(() => {
    if (isNewCourse === "true") {
    }
  });

  const handleResetStatus = () => {
    setEditStatus({
      name: false,
      subTitle: false,
      desc: false,
      price: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      const imgUrl = URL.createObjectURL(selectedFile);
      setImage(imgUrl);
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
                <h1 className="text-hvrBrwn text-4xl">Course Setup</h1>
                <h1 className="text-lg text-hvrBrwn">
                  Complete all Fields (0/7)
                </h1>
              </div>
              <div className="divCenter gap-4">
                <Menubar className="bg-white text-Brwn border-2 bolder-solid border-brwn shadow-lg hover:bg-hvrBrwn hover:text-white">
                  <MenubarMenu>
                    <MenubarTrigger>Save Changes</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Button className="h-full w-full p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                          {isNewCourse === "true" || !isPublished
                            ? `Save as Draft`
                            : `Save Changes`}
                        </Button>
                      </MenubarItem>
                      <MenubarItem>
                        <Button className="h-full w-full p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                          {isNewCourse === "true" || !isPublished
                            ? `Publish Course`
                            : `Unpublish Course`}
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
                  Customize your Course
                </div>
                {/* Title */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="name" className="text-xl">
                      Title :
                    </label>
                    <div
                      onClick={() => {
                        handleResetStatus();
                        setEditStatus((prev) => ({ ...prev, name: true }));
                      }}
                    >
                      <Pencil />
                    </div>
                  </div>
                  {courseTitle ? (
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formTempData.name}
                      onChange={(e) => handleChange(e, editStatus.name)}
                      className={cn(
                        "p-3 w-full rounded-md focus:outline-none",
                        editStatus.name
                          ? "border focus:outline-2 focus:ring-2 focus:ring-hvrBrwn"
                          : ""
                      )}
                    />
                  ) : (
                    <Loading skeletonType="EditCourses" />
                  )}
                  {editStatus.name && (
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
                            name: formTempData.name,
                          }));
                        }}
                        className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                {/* Subtitle */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="subTitle" className="text-xl">
                      Subtitle :
                    </label>
                    <div
                      onClick={() => {
                        handleResetStatus();
                        setEditStatus((prev) => ({ ...prev, subTitle: true }));
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
                      value={formTempData.subTitle}
                      onChange={(e) => handleChange(e, editStatus.subTitle)}
                      className={cn(
                        "p-3 w-full rounded-md focus:outline-none",
                        editStatus.subTitle
                          ? "border focus:outline-2 focus:ring-2 focus:ring-hvrBrwn"
                          : ""
                      )}
                    />
                  ) : (
                    <Loading skeletonType="EditCourses" />
                  )}
                  {editStatus.subTitle && (
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
                            subTitle: formTempData.subTitle,
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
                    <label htmlFor="desc" className="text-xl">
                      Description :
                    </label>
                    <div
                      onClick={() => {
                        handleResetStatus();
                        setEditStatus((prev) => ({ ...prev, desc: true }));
                      }}
                    >
                      <Pencil />
                    </div>
                  </div>
                  {!isLoading ? (
                    <Textarea
                      id="desc"
                      name="desc"
                      value={formTempData.desc}
                      onChange={(e) => handleChange(e, editStatus.desc)}
                      className={cn(
                        "p-3 w-full rounded-md",
                        editStatus.desc ? "border-solid border-hvrBrwn" : ""
                      )}
                    />
                  ) : (
                    <Loading skeletonType="EditCourses" />
                  )}
                  {editStatus.desc && (
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
                            desc: formTempData.desc,
                          }));
                        }}
                        className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                {/* Image */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl">Cover Picture :</h1>
                    <label
                      htmlFor="coursePic"
                      className="divCenter text-xl cursor-pointer"
                    >
                      <CloudUpload className="mr-2" />
                      Upload a Pic
                    </label>
                  </div>
                  <div className="divCenter">
                    <input
                      id="coursePic"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {image ? (
                      <img
                        src={image}
                        alt="uploaded"
                        className="object-cover rounded-md h-40 w-40"
                      />
                    ) : (
                      <div className="h-40 w-40 divCenter text-hvrBrwn">
                        <ImageOff size={40} />
                      </div>
                    )}
                  </div>
                </div>
                {/* Category */}
                <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="categories" className="text-xl">
                      Category :
                    </label>
                  </div>
                  {!isLoading ? (
                    <select
                      id="categories"
                      name="categories"
                      value={""}
                      onChange={(e) => handleChange(e, false)}
                      className={cn(
                        "p-3 w-full rounded-md",
                        editStatus.subTitle
                          ? "border focus:outline-2 focus:ring-2 focus:ring-hvrBrwn"
                          : ""
                      )}
                    >
                      {/* Get Options  */}
                      <option value="">Select Type</option>
                      {categoriesInfo?.categories.map((data) => (
                        <option id={data._id} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Loading skeletonType="EditCourses" />
                  )}
                </div>
              </div>
              <div className="space-y-4 w-1/2">
                {/* Price  */}
                <div className="space-y-4">
                  <div className="flex justify-start items-center text-hvrBrwn text-2xl">
                    <div className="divCenter bg-gray-200 p-2 rounded-full mr-2">
                      <IndianRupee />
                    </div>{" "}
                    Sell your Course
                  </div>
                  <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                    <div className="flex justify-between items-center">
                      <label htmlFor="price" className="text-xl">
                        Price :
                      </label>
                      <div
                        onClick={() => {
                          handleResetStatus();
                          setEditStatus((prev) => ({ ...prev, price: true }));
                        }}
                      >
                        <Pencil />
                      </div>
                    </div>
                    {!isLoading ? (
                      <input
                        id="price"
                        type="number"
                        name="price"
                        value={formTempData.price}
                        onChange={(e) => handleChange(e, editStatus.price)}
                        className={cn(
                          "p-3 w-full rounded-md focus:outline-none",
                          editStatus.price
                            ? "border focus:outline-2 focus:ring-2 focus:ring-hvrBrwn"
                            : ""
                        )}
                      />
                    ) : (
                      <Loading skeletonType="EditCourses" />
                    )}
                    {editStatus.price && (
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
                              price: formTempData.price,
                            }));
                          }}
                          className="w-20 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Chapters  */}
                <div className="space-y-4">
                  <div className="flex justify-start items-center text-hvrBrwn text-2xl">
                    <div className="divCenter bg-gray-200 p-2 rounded-full mr-2">
                      <TableOfContents />
                    </div>{" "}
                    Resources
                  </div>
                  <div className="bg-gray-200 px-6 py-3 pb-6 text-brwn rounded-md w-full space-y-3">
                    <div className="flex justify-between items-center">
                      <label htmlFor="chapters" className="text-xl">
                        Chapter List :
                      </label>
                      <div
                        onClick={() => {
                          handleResetStatus();
                          setEditStatus((prev) => ({ ...prev, price: true }));
                        }}
                      >
                        <div className="divCenter gap-4">
                          <Button
                            onClick={() =>
                              navigate(
                                `/edit-chapter?index=${formData.chapters.length}`
                              )
                            }
                            className="h-full w-full p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                          >
                            <Plus className="mr-2" /> Add Chapter
                          </Button>
                          <Button className="h-full w-full p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                            <FolderUp className="mr-2" /> Bulk Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* Chapters List */}
                    {!isLoading ? (
                      <EditChapterList chapters={formData.chapters} />
                    ) : (
                      <Loading skeletonType="EditCourses" />
                    )}
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

export default EditCourses;
