import { Loader2, Menu, Moon, NotebookPen, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLazyLogOutUserQuery } from "../features/api/authApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";
import { useAppSelector } from "../app/hooks";
import { responseType } from "../types/user";

const Navbar = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const [logOutUser, { isLoading }] = useLazyLogOutUserQuery();

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isVerified = useAppSelector((state) => state.auth.isVerified);
  const fullName = useAppSelector((state) => state.auth.fullName);
  const pic = useAppSelector((state) => state.auth.pic);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const isTeacher =
    useAppSelector((state) => state.auth.userType) === "Teacher" ? true : false;

  const boughtCourses = useAppSelector((state) => state.auth.coursesBought);
  const createdCourses = useAppSelector((state) => state.auth.coursesCreated);

  const handleLogout = async () => {
    try {
      const res: responseType = await logOutUser().unwrap();
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
    <div>
      <Toaster />
      <div className="flex items-center justify-between bg-transparent max-h-24 text-hvrBrwn mx-8 my-2">
        <Link to="/">
          <div className="divCenter ml-4 md:ml-16 font-bold h-12 text-xl active:scale-90 hover:underline">
            <NotebookPen className="mr-3" />
            SKILLVERSE
          </div>
        </Link>
        {isLoggedIn && isVerified ? (
          <div className="hidden md:divCenter gap-8 mx-8">
            {isAdmin ? (
              <Button className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out">
                Admin Options
              </Button>
            ) : (
              <></>
            )}
            <div className="divCenter text-xl font-semibold">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src={pic} />
                <AvatarFallback>
                  {fullName
                    .split(" ")
                    .map((data) => data[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {fullName.split(" ")[0]}
            </div>
            <Button
              onClick={() => navigate("/courses")}
              className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out"
            >
              Explore Courses
            </Button>

            <Menubar className="bg-white text-Brwn border-2 bolder-solid border-brwn shadow-lg hover:bg-hvrBrwn hover:text-white">
              <MenubarMenu>
                <MenubarTrigger>Profile & Courses</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                    <Link to="/my-profile">My Profile</Link>
                  </MenubarItem>
                  <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                    <Link to="/my-courses">
                      My Courses{" "}
                      {boughtCourses.length > 0
                        ? "(" + boughtCourses.length + ")"
                        : ""}
                    </Link>
                  </MenubarItem>
                  {isTeacher ? <MenubarSeparator /> : <></>}
                  {isTeacher ? (
                    <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                      <Link to="/">
                        Created Courses{" "}
                        {createdCourses.length > 0
                          ? "(" + createdCourses.length + ")"
                          : ""}
                      </Link>
                    </MenubarItem>
                  ) : (
                    <></>
                  )}
                  {isTeacher ? (
                    <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                      <Link to="/">My Dasboard</Link>
                    </MenubarItem>
                  ) : (
                    <></>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Button
              className="bg-hvrBrwn hover:bg-hdrBrwn h-9 w-12 active:scale-90 transition-transform duration-300 ease-in-out"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun /> : <Moon />}
            </Button>
            {!isLoading ? (
              <Button
                onClick={handleLogout}
                className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out"
              >
                Log Out
              </Button>
            ) : (
              <Button
                disabled
                className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Loader2 className="animate-spin" />
              </Button>
            )}
          </div>
        ) : (
          <div className="hidden md:divCenter gap-16 mx-8">
            <Button
              onClick={() => navigate("signup")}
              className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out"
            >
              Sign UP
            </Button>
            <Button
              onClick={() => navigate("login")}
              className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out"
            >
              Log In
            </Button>
            <Button
              className="bg-hvrBrwn hover:bg-hdrBrwn h-9 w-12 active:scale-90 transition-transform duration-300 ease-in-out"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun /> : <Moon />}
            </Button>
          </div>
        )}
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const [logOutUser, { isLoading }] = useLazyLogOutUserQuery();

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isVerified = useAppSelector((state) => state.auth.isVerified);
  const fullName = useAppSelector((state) => state.auth.fullName);
  const pic = useAppSelector((state) => state.auth.pic);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const isTeacher =
    useAppSelector((state) => state.auth.userType) === "Teacher" ? true : false;

  const boughtCourses = useAppSelector((state) => state.auth.coursesBought);
  const createdCourses = useAppSelector((state) => state.auth.coursesCreated);

  const handleLogout = async () => {
    try {
      const res = await logOutUser().unwrap();
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
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="rounded-md bg-brwn hover:bg-hvrBrwn">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="my-8">
            <SheetTitle className="flex items-center justify-between">
              <h1>
                {isLoggedIn && isVerified ? (
                  <div className="divCenter">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={pic} />
                      <AvatarFallback>
                        {fullName
                          .split(" ")
                          .map((data) => data[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {fullName.split(" ")[0]}
                  </div>
                ) : (
                  "Register/Login to your Account"
                )}
              </h1>
              <Button
                onClick={() => setIsDark(!isDark)}
                className="rounded-md bg-hvrBrwn hover:bg-hdrBrwn"
              >
                {isDark ? <Sun /> : <Moon />}
              </Button>
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <SheetDescription className="flex-1">
            <div className="mt-4 text-hvrBrwn text-2xl">
              {isAdmin ? (
                <>
                  <Link to="/" className="w-full hover:underline">
                    <div className="pb-4 text-brwn">Admin Options</div>
                  </Link>
                </>
              ) : (
                <></>
              )}
              {isLoggedIn ? (
                <div className="flex items-center flex-col justify-start space-y-4">
                  <Link to="/my-profile" className="w-full hover:underline">
                    My Profile
                  </Link>
                  <Link to="/courses" className="w-full hover:underline">
                    Explore All Courses
                  </Link>
                  <Link to="/my-courses" className="w-full hover:underline">
                    My Courses{" "}
                    {boughtCourses.length > 0
                      ? "(" + boughtCourses.length + ")"
                      : ""}
                  </Link>
                  {isTeacher ? (
                    <>
                      <Separator />
                      <Link to="/" className="w-full hover:underline">
                        Created Courses{" "}
                        {createdCourses.length > 0
                          ? "(" + createdCourses.length + ")"
                          : ""}
                      </Link>
                      <Link to="/" className="w-full hover:underline">
                        My Dasboard
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div className="flex items-center flex-col justify-start space-y-4">
                  <Link to="/signup" className="w-full hover:underline">
                    Sign Up
                  </Link>
                  <Link to="/login" className="w-full hover:underline">
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </SheetDescription>
          <SheetFooter>
            {!isLoading ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-hvrBrwn hover:bg-hdrBrwn"
              >
                Log Out
              </Button>
            ) : (
              <Button disabled className="w-full bg-hvrBrwn hover:bg-hdrBrwn">
                <Loader2 className="animate-spin mr-4" />
                Please Wait...
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
