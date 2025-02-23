import { useGetPurchasedCoursesByUserIdQuery } from "../features/api/courseProgressApi";
import Navbar from "./Navbar";
import { useAppSelector } from "../app/hooks";
import Loading from "./Loading";
import { userPurchasedCoursesDataResponse } from "../types/courseProgress";
import { Skeleton } from "./ui/skeleton";
import { Check, CircleCheck, Eye, NotebookPen, Tally4 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toastStyles } from "./toastStyles";

const MyCourses = () => {
  const userId: string = useAppSelector((state) => state.auth._id) || "";
  const { data: purchasedCoursesList, isLoading } =
    useGetPurchasedCoursesByUserIdQuery({ userId });

  const [allData, setAllData] = useState<userPurchasedCoursesDataResponse[]>(
    []
  );

  type Filter = {
    inProg: boolean;
    comp: boolean;
    all: boolean;
  };
  const [filters, setFilters] = useState<Filter>({
    inProg: false,
    comp: false,
    all: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (purchasedCoursesList?.coursesList) {
      setAllData([...purchasedCoursesList.coursesList]);
    }
  }, [purchasedCoursesList]);

  const handleFilterClick = (idx: number) => {
    if (idx === 0) {
      if (purchasedCoursesList?.coursesList) {
        setAllData(
          purchasedCoursesList?.coursesList.filter((data) => {
            const perc =
              (data.chapters.filter((chapData) => chapData.isChapterCompleted)
                .length /
                data.chapters.length) *
              100;
            return perc !== 100;
          })
        );
      }
    } else if (idx === 1) {
      if (purchasedCoursesList?.coursesList) {
        setAllData(
          purchasedCoursesList?.coursesList.filter((data) => {
            const perc =
              (data.chapters.filter((chapData) => chapData.isChapterCompleted)
                .length /
                data.chapters.length) *
              100;
            return perc === 100;
          })
        );
      }
    } else {
      if (purchasedCoursesList?.coursesList) {
        setAllData([...purchasedCoursesList?.coursesList]);
      }
    }
  };

  const handleToProgress = (progressId: string) => {
    navigate(`/course-progress?progresscode=${progressId}`);
  };

  return (
    <div className="w-screen h-screen text-hvrBrwn bg-white">
      <Navbar />
      <div className="w-full">
        <div className="grid grid-cols-3 w-full px-8 md:px-20 my-12">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="w-full">
              {idx === 0 && (
                <div
                  onClick={() => {
                    setFilters({ inProg: true, comp: false, all: false });
                    handleFilterClick(idx);
                  }}
                  style={filters.inProg ? toastStyles.warning : {}}
                  className="divCenter border-2 border-solid border-hdrBrwn rounded-lg p-[14px] mr-8"
                >
                  <Eye className="mr-2" size={25} /> In Progress
                </div>
              )}
              {idx === 1 && (
                <div
                  onClick={() => {
                    setFilters({ inProg: false, comp: true, all: false });
                    handleFilterClick(idx);
                  }}
                  style={filters.comp ? toastStyles.success : {}}
                  className="divCenter border-2 border-solid border-hdrBrwn rounded-lg p-[14px] mr-8"
                >
                  <CircleCheck className="mr-2" size={25} /> Completed
                </div>
              )}
              {idx === 2 && (
                <div
                  onClick={() => {
                    setFilters({ inProg: false, comp: false, all: true });
                    handleFilterClick(idx);
                  }}
                  style={filters.all ? toastStyles.unknown : {}}
                  className="divCenter border-2 border-solid border-hdrBrwn rounded-lg p-[14px]"
                >
                  <Tally4 className="mr-2" size={25} /> All
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          {isLoading ? (
            <Loading skeletonType="myCourses" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full px-8 md:px-20">
              {allData?.map(
                (data: userPurchasedCoursesDataResponse, idx: number) => {
                  const percCompleted =
                    (data.chapters.filter(
                      (chapData) => chapData.isChapterCompleted
                    ).length /
                      data.chapters.length) *
                    100;

                  const percText =
                    percCompleted === 0
                      ? `Not Yet Started`
                      : `${percCompleted}% Completed`;
                  const percIcon =
                    percCompleted === 0 ? (
                      <NotebookPen className="pr-1 w-8 h-8" scale={20} />
                    ) : percCompleted === 100 ? (
                      <Check className="pr-1 w-8 h-8" scale={20} />
                    ) : (
                      <Eye className="pr-1 w-8 h-8" scale={20} />
                    );
                  const percColor =
                    percCompleted === 0
                      ? `text-gray-600`
                      : percCompleted === 100
                      ? `text-green-600`
                      : `text-yellow-600`;

                  return (
                    <div
                      key={idx}
                      className="w-full h-40 border-brwn rounded-lg border-2 border-solid p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start justify-center">
                          {data.courseId.coursePic ? (
                            <img
                              src={data.courseId.coursePic}
                              alt={data.name}
                              className="w-32 h-32 rounded-lg"
                              onClick={() => handleToProgress(data._id)}
                            />
                          ) : (
                            <Skeleton className="w-32 h-32 rounded-lg" />
                          )}
                          <div className="pt-4 pl-4">
                            <h1
                              className="text-3xl hover:underline"
                              onClick={() => handleToProgress(data._id)}
                            >
                              {data.name}
                            </h1>
                            <h1 className="text-xl">
                              Created by : {data.courseId.createdBy}
                            </h1>
                          </div>
                        </div>
                        <div className={`${percColor} pr-4 divCenter`}>
                          {percIcon}
                          {percText}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
