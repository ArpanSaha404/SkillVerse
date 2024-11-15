import { Button } from "./ui/button";
import React, { useState } from "react";
import { MoveRight } from "lucide-react";

const LandingPage = () => {
  const [SearchText, setSearchText] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {};

  return (
    <div className="h-screen md:divCenter">
      <div className="ml-8 mr-4 w-6/12 font-sans font-bold flex justify-center items-center">
        <div className="space-y-8">
          <h1 className="text-6xl">
            Improve Your Online Learning Experience Better Instantly
          </h1>
          <div className="hidden">We have 30k+ Courses...</div>
          <div className="space-x-4 flex justify-start items-center">
            <input
              className="border-black border-2 border-solid rounded-md pl-4 h-10 w-3/4"
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
            <Button
              className="h-10 hover:bg-gray-600"
              onClick={handleSearchClick}
            >
              <MoveRight />
            </Button>
            <div className="hidden">We have 30k+ Courses...</div>
          </div>
        </div>
      </div>
      <div className="divCenter w-6/12 mr-8 ml-4">
        <img
          style={{ borderRadius: "50%" }}
          src="https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Learn_Pic"
        />
      </div>
    </div>
  );
};

export default LandingPage;
