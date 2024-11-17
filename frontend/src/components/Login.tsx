import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { LoginInputState, userLoginSchema } from "./schema/userSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import { frontend_URL_dev } from "./lib/utils";
import { Separator } from "./ui/separator";

const Login = () => {
  const [formData, setFormData] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [formResponse, setFormResponse] = useState<string>("");
  const [errors, SetErrors] = useState<Partial<LoginInputState>>({});

  const isLoading = true;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      SetErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    await axios
      .post(`${frontend_URL_dev}/api/users/login`, formData)
      .then((res) => {
        if (res.data) {
          setFormResponse(res.data.apiMsg);
        }
      })
      .catch((error) => {
        setFormResponse(error.response.data.apiMsg);
      });
  };

  return (
    <div className="max-w-screen mx-auto p-6 bg-white rounded-lg shadow-lg min-h-screen space-y-8 text-hvrBrwn">
      <div className="flex-col divCenter">
        <h2 className="text-3xl font-bold text-center text-hdrBrwn mb-8 mt-16">
          Log In
        </h2>
        <form className="h-6/12 space-y-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              />
              <Mail className="absolute inset-y-2 left-2" />
              {errors && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              />
              <LockKeyhole className="absolute inset-y-2 left-2" />
              {errors && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
          {isLoading ? (
            <Button
              type="submit"
              className="w-full py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
            >
              log In
            </Button>
          ) : (
            <Button
              disabled
              className=" divCenter gap-4 w-full py-2 mt-4 bg-hdrBrwn text-white rounded-md"
            >
              <Loader2 className="animate-spin" /> Please Wait...
            </Button>
          )}
        </form>
        <div className="text-semibold mt-2 text-red-500">{formResponse}</div>
        <Separator />
        <div className="mt-2 text-black dark:text-white divCenter flex-col">
          <div>
            Don't have an account?{" "}
            <Link to="/" className="underline text-blue-500">
              Sign UP
            </Link>
          </div>
          <div>
            Forgot your Password?{" "}
            <Link to="/" className="underline text-blue-500">
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
