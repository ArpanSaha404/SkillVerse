import axios from "axios";
import { Button } from "./ui/button";

const LandingPage = () => {
  const login = {
    email: "1stUser@gmail.com",
    password: "1stUser",
  };
  const handleClick = async () => {
    await axios
      .post(`http://localhost:5000/api/users/login`, login)
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

  return (
    <div className="bg-red-600">
      LandingPage
      <Button onClick={handleClick}>Button</Button>
      <img
        src="https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="learn pic"
      />
    </div>
  );
};

export default LandingPage;
