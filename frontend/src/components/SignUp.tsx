import { Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SignUpInputState, userSignUpSchema } from "./schema/userSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import { frontend_URL_dev } from "./lib/utils";
import { Separator } from "./ui/separator";

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpInputState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });
  const [typeError, setTypeError] = useState<string>("");
  const [formResponse, setFormResponse] = useState<string>("");
  const [errors, SetErrors] = useState<Partial<SignUpInputState>>({});

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
    const result = userSignUpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      SetErrors(fieldErrors as Partial<SignUpInputState>);
      return;
    }

    if (formData.userType === "") {
      setFormData((prev) => ({ ...prev, userType: "Student" }));
      setTypeError(
        `If Type not Selected, You'll be registered as a Student by Default`
      );
    } else {
      setTypeError("");
    }
    await axios
      .post(`${frontend_URL_dev}/api/users/register`, formData)
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
          Sign Up
        </h2>
        <form className="h-6/12 space-y-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              ></Input>
              <User className="absolute inset-y-2 left-2" />
              {errors && (
                <span className="text-sm text-red-500">{errors.fullName}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              ></Input>
              <Mail className="absolute inset-y-2 left-2" />
              {errors && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              ></Input>
              <LockKeyhole className="absolute inset-y-2 left-2" />
              {errors && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              ></Input>
              <LockKeyhole className="absolute inset-y-2 left-2" />
              {errors && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="userType" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
            >
              <option value="">Select Type</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            {errors && (
              <>
                <span className="text-sm text-red-500">{errors.userType}</span>
                <br />
                <span className="text-sm text-red-500">{typeError}</span>
              </>
            )}
          </div>
          {isLoading ? (
            <Button
              type="submit"
              className="w-full py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
            >
              Sign Up
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
            Already have an account?{" "}
            <Link to="/" className="underline text-blue-500">
              Log in
            </Link>
          </div>
          <div>
            Just Created your Account?{" "}
            <Link to="/" className="underline text-blue-500">
              Verify your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
