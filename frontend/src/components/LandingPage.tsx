import { Button } from "./ui/button";
import React, { useState } from "react";
import { Loader2, MoveRight } from "lucide-react";
import Navbar from "./Navbar";

const LandingPage = () => {
  const [SearchText, setSearchText] = useState<string>("");
  const isLoading = true;
  const isLoggedin = false;

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    if (!isLoggedin) {
      alert("Please Login or Signup First to See all Courses");
      return;
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
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
