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
import { Link } from "react-router-dom";
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

const Navbar = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const fullName = "Implement Now";
  const isLoading = false;
  const isLoggedin = true;
  const isAdmin = true;
  const isTeacher = true;
  const boughtCourses = 5;
  const createdCourses = 5;
  return (
    <div>
      <div className="flex items-center justify-between bg-transparent mx-auto max-h-24 text-hvrBrwn mx-8 my-2">
        <Link to="/">
          <div className="divCenter font-bold h-12 text-xl active:scale-90 hover:underline">
            <NotebookPen className="mr-3" />
            SKILLVERSE
          </div>
        </Link>
        {isLoggedin ? (
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {fullName.split(" ")[0]}
            </div>
            <Button className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out">
              Explore Courses
            </Button>

            <Menubar className="bg-white text-Brwn border-2 bolder-solid border-brwn shadow-lg hover:bg-hvrBrwn hover:text-white">
              <MenubarMenu>
                <MenubarTrigger>Profile & Courses</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                    <Link to="/">Update Profile</Link>
                  </MenubarItem>
                  <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                    <Link to="/">My Courses {"(" + boughtCourses + ")"}</Link>
                  </MenubarItem>
                  {isTeacher ? <MenubarSeparator /> : <></>}
                  {isTeacher ? (
                    <MenubarItem className="text-hvrBrwn text-md hover:underline hover:hdrBrwn">
                      <Link to="/">
                        Created Courses {"(" + createdCourses + ")"}
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
            {isLoading ? (
              <Button
                disabled
                className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <Button className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out">
                Log Out
              </Button>
            )}
          </div>
        ) : (
          <div className="hidden md:divCenter gap-16 mx-8">
            <Button className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out">
              Sign UP
            </Button>
            <Button className="bg-hvrBrwn hover:bg-hdrBrwn active:scale-90 transition-transform duration-300 ease-in-out">
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
  const fullName = "Implement Now";
  const isLoading = false;
  const isLoggedin = true;
  const isAdmin = true;
  const isTeacher = true;
  const boughtCourses = 5;
  const createdCourses = 5;
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
                {isLoggedin ? (
                  <div className="divCenter">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
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
              {isLoggedin ? (
                <div className="flex items-center flex-col justify-start space-y-4">
                  <Link to="/" className="w-full hover:underline">
                    Update Profile
                  </Link>
                  <Link to="/" className="w-full hover:underline">
                    Explore All Courses
                  </Link>
                  <Link to="/" className="w-full hover:underline">
                    My Courses {"(" + boughtCourses + ")"}
                  </Link>
                  {isTeacher ? (
                    <>
                      <Separator />
                      <Link to="/" className="w-full hover:underline">
                        Created Courses {"(" + createdCourses + ")"}
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
                  <Link to="/" className="w-full hover:underline">
                    Sign Up
                  </Link>
                  <Link to="/" className="w-full hover:underline">
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </SheetDescription>
          <SheetFooter>
            {isLoading ? (
              <Button disabled className="w-full bg-hvrBrwn hover:bg-hdrBrwn">
                <Loader2 className="animate-spin mr-4" />
                Please Wait...
              </Button>
            ) : (
              <Button className="w-full bg-hvrBrwn hover:bg-hdrBrwn">
                Log Out
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
