import axios from "axios";
import { Button } from "./ui/button";
import { frontend_URL_dev } from "./lib/utils";
import { useState } from "react";
import { MoveRight } from "lucide-react";

const LandingPage = () => {
  const isLoading = false;

  const [SearchText, setSearchText] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const login = {
    email: "1stUser@gmail.com",
    password: "1stUser",
  };
  const handleClick = async () => {
    await axios
      .post(`${frontend_URL_dev}/api/users/login`, login)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          alert(res.data.apiMsg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return (
      <div className="bg-red-600">
        LandingPage
        <Button onClick={handleClick}>Button</Button>
      </div>
    );
  }

  return (
    <div className="h-screen md:divCenter">
      <div className="mx-8 w-6/12 font-sans font-bold flex justify-center items-center">
        <div className="space-y-8">
          <h1 className="text-6xl">
            Improve Your Online Learning Experience Better Instantly
          </h1>
          <div className="space-x-4 flex justify-start items-center">
            <input
              className="border-black border-2 border-solid rounded-md px-8 h-10 w-3/4"
              name="serachText"
              type="text"
              placeholder="Search for a Course or Category"
              value={SearchText}
              onChange={changeInputHandler}
            />
            <Button className="h-10 hover:bg-gray-600">
              <MoveRight />
            </Button>
          </div>
        </div>
        <div className="hidden">We have 30k+ Courses...</div>
        <div className="hidden">We have 30k+ Courses...</div>
      </div>
      <div className="divCenter w-6/12">
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
