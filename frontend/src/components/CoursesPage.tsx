import { BookOpen, CircleX, IndianRupee, MoveRight } from "lucide-react";
import FilterCategories from "./FilterCategories";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { courseType } from "../types/courses";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAllCourseDataQuery,
  useGetUserCourseProgressInfoMutation,
} from "../features/api/courseApi";
import { useAppSelector } from "../app/hooks";
import { useAllCategoriesDataQuery } from "../features/api/categoryApi";
import { category } from "../types/courseCategories";
import { Separator } from "./ui/separator";
import {
  courseProgressType,
  userCouseProgressListInputs,
  userCouseProgressListResponse,
} from "../types/courseProgress";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";

const CoursesPage = () => {
  const { searchQuery } = useParams<{ searchQuery?: string }>();
  const text = searchQuery || "";
  const [SearchText, setSearchText] = useState<string>(text);
  const [searchResults, setSearchResults] = useState<string>("");

  const { data: allCourse, isLoading } = useAllCourseDataQuery();
  const { data: allCategories } = useAllCategoriesDataQuery();
  const [getUserCourseProgressInfo] = useGetUserCourseProgressInfoMutation();

  const [courseData, setCourseData] = useState<courseType[]>([]);
  const [courseDupData, setCourseDupData] = useState<courseType[]>([]);
  const [categoryData, setCategoryData] = useState<category[]>([]);
  const [userProgressData, setUserProgressData] = useState<
    courseProgressType[]
  >([]);
  const [userProgressPerc, setUserProgressPerc] = useState<
    {
      courseId: string;
      perc: number;
    }[]
  >([]);

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const navigate = useNavigate();
  const boughtCourses = useAppSelector((state) => state.auth.coursesBought);
  const createdCourses = useAppSelector((state) => state.auth.coursesCreated);
  const userId = useAppSelector((state) => state.auth._id);

  useEffect(() => {
    //Course Data
    if (allCourse && allCourse.courseData) {
      setCourseData(allCourse.courseData);
      setCourseDupData(allCourse.courseData);
    }

    //Category Data
    if (allCategories && allCategories.categories) {
      setCategoryData(allCategories.categories);
      setCheckedItems(new Array(categoryData.length).fill(false));
    }

    if (searchQuery) {
      setSearchResults(searchQuery);
      setCourseData((prevData) =>
        [...prevData].filter((data) =>
          searchQuery
            .toLowerCase()
            .split("")
            .some(
              (char) =>
                data.name.toLowerCase().includes(char) ||
                data.subTitle.toLowerCase().includes(char)
            )
        )
      );
    }

    const progressInfo = async () => {
      if (userId) {
        try {
          if (userId && boughtCourses.length > 0) {
            const inputData: userCouseProgressListInputs = {
              userid: userId,
              coursesBought: boughtCourses,
            };
            const res: userCouseProgressListResponse =
              await getUserCourseProgressInfo(inputData).unwrap();
            if (res.userCourseProgressList) {
              setUserProgressData(res.userCourseProgressList);

              const progressArr: {
                courseId: string;
                perc: number;
              }[] = res.userCourseProgressList.map((data) => ({
                courseId: data.courseId,
                perc:
                  (data.chapters.filter(
                    (chapterData) => chapterData.isChapterCompleted
                  ).length /
                    data.chapters.length) *
                  100,
              }));
              setUserProgressPerc(progressArr);
            }
          }
        } catch (error: any) {
          toast.error(error.data.apiMsg, {
            style: toastStyles.error,
          });
        }
      }
    };
    progressInfo();
  }, [
    allCourse,
    allCategories,
    categoryData.length,
    searchQuery,
    boughtCourses,
    getUserCourseProgressInfo,
    userId,
  ]);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const onFilterChange = (idx: number) => {
    //Reset Flters Logic
    if (idx === -1) {
      setCheckedItems(new Array(categoryData.length).fill(false));
      setCourseData(courseDupData);
      return;
    }
    //Updating Filter States
    const changeCheckStatus = [...checkedItems];
    changeCheckStatus[idx] = !changeCheckStatus[idx];
    setCheckedItems(changeCheckStatus);

    //Picking Checked Filters into Array
    const appliedCategoryFilters = categoryData
      .filter((_, idx) => changeCheckStatus[idx] === true)
      .map((data) => data.name);

    //Reseting to Original Data for Filtering
    setCourseData(courseDupData);
    //Filterring Data based on above array
    setCourseData((prevData) =>
      [...prevData].filter((data) =>
        appliedCategoryFilters.includes(data.categories)
      )
    );
  };

  const onSortChange = (option: string) => {
    if (option) {
      if (option === "priceHtL") {
        setCourseData((prevData) =>
          [...prevData].sort((a, b) => b.price - a.price)
        );
      } else if (option === "priceLtH") {
        setCourseData((prevData) =>
          [...prevData].sort((a, b) => a.price - b.price)
        );
      } else if (option === "undo") {
        setCourseData(courseDupData);
      }
    }
  };

  const handleSearchClick = () => {
    setSearchResults(SearchText);
    setCourseData(courseDupData);
    if (SearchText) {
      setCourseData((prevData) =>
        [...prevData].filter((data) =>
          SearchText.toLowerCase()
            .split("")
            .some(
              (char) =>
                data.name.toLowerCase().includes(char) ||
                data.subTitle.toLowerCase().includes(char)
            )
        )
      );
    }
  };

  const progressNavigate = (courseid: string) => {
    if (boughtCourses.includes(courseid) && userProgressData) {
      const progresscode: string =
        userProgressData.filter((data) => data.courseId === courseid)[0]._id ||
        "";
      if (progresscode) {
        navigate(`/course-progress?progresscode=${progresscode}`);
      } else {
        navigate("/");
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="">
        <Navbar />
        <Toaster />
        <div className="w-full">
          <div className="md:w-full w-auto divCenter my-4">
            <div className="gap-4 md:w-1/2 w-full flex divCenter">
              <input
                className="border-hvrBrwn border-2 border-solid rounded-md px-4 h-10 w-3/4"
                name="serachText"
                type="text"
                placeholder="Search for a Course"
                value={SearchText}
                onChange={changeInputHandler}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
              <Button
                className="h-10 w-12 divCenter bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                onClick={handleSearchClick}
              >
                <MoveRight />
              </Button>
            </div>
          </div>
          {searchResults ? (
            <div className="w-full justify-start md:ml-80 text-lg font-semibold space-y-2">
              <div>Search Results for {"(" + searchResults + ")"}</div>
              <Separator />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="md:flex md:items-start md:justify-start">
          <div className="md:hidden lg:hidden">
            <FilterCategories
              categoryData={categoryData}
              onSortChange={onSortChange}
              checkedItems={checkedItems}
              onFilterChange={onFilterChange}
            />
          </div>
          <div className="w-1/4 hidden md:divCenter">
            <div className="w-full mt-24">
              <FilterCategories
                categoryData={categoryData}
                onSortChange={onSortChange}
                checkedItems={checkedItems}
                onFilterChange={onFilterChange}
              />
            </div>
          </div>
          {!isLoading ? (
            courseData.length === 0 &&
            (SearchText ||
              checkedItems.filter((data) => data === true).length > 0) ? (
              <div className="w-full min-h-64 divCenter">
                <div className="text-4xl font-semibold divCenter text-red-500">
                  <CircleX size={40} className="pr-2" />
                  No Relevant Courses Found...
                </div>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-2 mx-8">
                {courseData.map((data: courseType, idx: number) => (
                  <div
                    key={idx}
                    className="shadow-lg w-full p-4 rounded-lg bg-slate-200"
                  >
                    <img
                      className="h-40 w-full rounded-lg object-cover"
                      src={data.coursePic}
                      alt="Course_Pic"
                      onClick={() => progressNavigate(data._id)}
                    />
                    <div className="flex flex-col items-start justify-start text-hvrBrwn space-y-2">
                      <h1 className="text-lg font-bold hover:underline mt-2">
                        {data.name}
                      </h1>
                      <h1>{data.createdBy}</h1>
                      <div className="w-full flex items-center justify-between py-2">
                        <div className="text-center divCenter gap-2 text-white bg-hdrBrwn rounded-lg px-2">
                          {data.categories}
                        </div>
                        <div className="flex items-center justify-between text-center">
                          <div className="divCenter">
                            <BookOpen className="mr-2" />
                            {data.chapters?.length || 0} Chapters
                          </div>
                        </div>
                      </div>
                    </div>
                    {boughtCourses.includes(courseData[idx]._id) ? (
                      userProgressData && userProgressPerc.length > 0 ? (
                        <div className="w-full divCenter mt-2">
                          <div className="w-3/4 divCenter">
                            <div
                              style={{ minHeight: "10px" }}
                              className="bg-green-200 divCenter max-h-3 w-full text-center text-lg rounded-lg overflow-hiden relative"
                            >
                              <div
                                className="absolute top-0 left-0 h-full rounded-lg bg-green-500"
                                style={{
                                  width: `${
                                    userProgressPerc.filter(
                                      (percData) =>
                                        percData.courseId === data._id
                                    )[0].perc || 1
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-1/4 divCenter">
                            {userProgressPerc.filter(
                              (percData) => percData.courseId === data._id
                            )[0].perc || 0}
                            %
                          </div>
                        </div>
                      ) : (
                        <></>
                      )
                    ) : createdCourses.includes(courseData[idx]._id) ? (
                      <div className="w-full text-lg font-semibold flex items-center justify-between">
                        <div className="divCenter">Course Created by You</div>
                        <Button
                          onClick={() =>
                            navigate(`/course-details/${courseData[idx]._id}`)
                          }
                          className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                        >
                          Explore Course
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full text-lg font-semibold flex items-center justify-between">
                        <div className="divCenter">
                          <IndianRupee size={18} />
                          {data.price}
                        </div>
                        <Button
                          onClick={() =>
                            navigate(`/course-details/${courseData[idx]._id}`)
                          }
                          className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                        >
                          Explore Course
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <Loading skeletonType="courseCards" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
