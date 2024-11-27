import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { Loader2, MoveRight } from "lucide-react";
import Navbar from "./Navbar";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLazyCheckAuthQuery } from "../features/api/authApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";

const LandingPage = () => {
  const [SearchText, setSearchText] = useState<string>("");

  const [checkAuth, { isLoading }] = useLazyCheckAuthQuery();

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const res = await checkAuth().unwrap();
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
      }
    };
    fetchUserData();
  });

  const handleSearchClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/courses/${SearchText}`);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <Toaster />
      <div className="md:divCenter">
        <div className="ml-8 mr-4 w-6/12 font-sans font-bold flex justify-center items-center">
          <div className="space-y-8">
            <h1 className="text-6xl text-hvrBrwn">
              Improve Your Online Learning Experience Better Instantly
            </h1>
            <div className="hidden">We have 30k+ Courses...</div>
            <div className="space-x-4 flex justify-start items-center">
              <input
                className="border-hvrBrwn border-2 border-solid rounded-md pl-4 h-10 w-3/4"
                name="serachText"
                type="text"
                placeholder="Search for a Course or Category"
                value={SearchText}
                onChange={changeInputHandler}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
              {isLoading ? (
                <Button
                  className="h-10 w-12 divCenter bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                  onClick={handleSearchClick}
                >
                  <MoveRight />
                </Button>
              ) : (
                <Button
                  disabled
                  className="h-10 w-12 divCenter bg-hdrBrwn text-white rounded-md"
                >
                  <Loader2 className="animate-spin" />
                </Button>
              )}

              <div className="hidden">We have 30k+ Courses...</div>
            </div>
            <div className="text-center flex items-center justify-around">
              <Button
                onClick={() => navigate("/courses")}
                className="h-10 w-auto divCenter bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
              >
                Explore All Courses <MoveRight className="pl-2" />
              </Button>
            </div>
          </div>
        </div>
        <div className="divCenter w-6/12 mr-8 ml-4 my-16">
          <img
            style={{ borderRadius: "50%" }}
            src="https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Learn_Pic"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
