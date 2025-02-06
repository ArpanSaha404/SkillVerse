import { Separator } from "@radix-ui/react-menubar";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const Loading = ({ skeletonType = "" }) => {
  if (skeletonType === "courseCards") {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-2 mx-8">
        {[...Array(6)].map((_, idx: number) => (
          <div key={idx} className="shadow-lg w-full rounded-lg">
            <Skeleton className="w-auto h-48" />
          </div>
        ))}
      </div>
    );
  }

  if (skeletonType === "filterCategories") {
    return (
      <div className="w-full flex items-start justify-start space-y-4 flex-col">
        {[...Array(3)].map((_, idx: number) => (
          <div key={idx} className="shadow-lg w-full rounded-lg space-x-2">
            <Skeleton className="w-full h-8" />
          </div>
        ))}
      </div>
    );
  }

  if (skeletonType === "courseDetails") {
    return (
      <div className="w-screen divCenter flex-col md:flex-row">
        <div className="w-1/2 my-12 mx-8 flex flex-grow">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-lg shadow-sm" />
                <div className="flex items-center justify-start gap-4">
                  <Skeleton className="h-6 w-4 rounded-full shadow-sm" />
                  <Skeleton className="h-6 w-1/4 rounded-lg shadow-sm" />
                </div>
                <Skeleton className="h-6 w-3/4 rounded-lg shadow-sm" />
              </CardTitle>
              <Separator />
              <CardDescription className="space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-lg shadow-sm" />
                <div className="flex items-center justify-start gap-4">
                  <Skeleton className="h-40 w-full rounded-lg shadow-sm" />
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full divCenter flex-col m-12 mt-36">
          <Skeleton className="w-full h-96 rounded-lg shadow-lg" />
          <div className="w-full flex items-center justify-end p-8">
            <Skeleton className="w-1/6 h-12 rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (skeletonType === "courseProgress") {
    return (
      <div className="divCenter flex-col w-full space-y-4">
        <div className="my-12 mx-8 w-3/4">
          <Skeleton className="rounded-lg shadow-full w-full h-96" />
        </div>
        <div className="flex items-center justify-between  mx-8 w-3/4">
          <Skeleton className="h-6 w-2/6 rounded-lg shadow-sm" />
          <Skeleton className="h-6 w-1/6 rounded-lg shadow-sm" />
        </div>
        <Separator />
        <div className="flex items-center justify-between  mx-8 w-3/4">
          <Skeleton className="h-24 w-full rounded-lg shadow-sm" />
        </div>
      </div>
    );
  }

  if (skeletonType === "chapterList") {
    return (
      <div className="w-full flex items-start justify-start space-y-4 flex-col">
        {[...Array(5)].map((_, idx: number) => (
          <div key={idx} className="shadow-lg w-full rounded-lg space-x-2">
            <Skeleton className="w-full h-8" />
          </div>
        ))}
      </div>
    );
  }

  if (skeletonType === "myCourses") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full px-8 md:px-20 py-4 mt-12">
        {[...Array(4)].map((_, idx: number) => (
          <div key={idx} className="w-full">
            <Skeleton className="w-full h-40" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="divCenter flex-col w-full space-y-16 h-screen">
      <div className="w-5/6">
        {" "}
        <Skeleton className="rounded-lg shadow-lg h-64 w-full" />
      </div>
      <div className="w-5/6">
        {" "}
        <Skeleton className="rounded-lg shadow-lg h-64 w-full" />
      </div>
    </div>
  );
};

export default Loading;
