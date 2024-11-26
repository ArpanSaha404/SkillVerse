import { Loader2, LockKeyhole, Mail } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Navbar from "./Navbar";
import {
  ResetPasswordInputState,
  userResetPasswordSchema,
} from "../schema/userSchema";
import { useAppSelector } from "../app/hooks";
import {
  useResetPasswordMutation,
  useSendMailMutation,
} from "../features/api/authApi";
import { responseType, sendMailType } from "../types/user";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState<ResetPasswordInputState>({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, SetErrors] = useState<Partial<ResetPasswordInputState>>({});
  const [otpData, setOtpData] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpErrors, setOtpErrors] = useState<string>("");
  const [isSentOnce, setIsSentOnce] = useState<boolean>(false);
  const [isFieldsVisible, setIsFieldsVisible] = useState<boolean>(false);
  const inputRef = useRef<any>([]);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [sendMail, { isLoading: isMailSentLoading }] = useSendMailMutation();

  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const handleOTPChange = (idx: number, val: string) => {
    if (/^[a-zA-Z0-9]$/.test(val) || val === "") {
      const newVal = [...otpData];
      newVal[idx] = val;
      setOtpData(newVal);

      if (val !== "" && idx < 5) {
        inputRef.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpData[idx] && idx > 0) {
      inputRef.current[idx - 1].focus();

      const val = [...otpData];
      val[idx] = "";
      setOtpData(val);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendMailAgain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputData: sendMailType = { email, mailType: "resetPassword" };
    try {
      const res: responseType = await sendMail(inputData).unwrap();
      toast.success(res.apiMsg, {
        style: toastStyles.success,
      });
    } catch (error: any) {
      toast.error(error.data.apiMsg, {
        style: toastStyles.error,
      });
    }
    setIsSentOnce(true);
    setIsFieldsVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = otpData.join("");
    if (otp.length !== 6) {
      setOtpErrors(
        "OTP Submitted does not have 6 characters... Please Enter OTP Again"
      );
      setOtpData(["", "", "", "", "", ""]);
      return;
    }
    setFormData((prevData) => ({ ...prevData, email: email, otp: otp }));

    const result = userResetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      SetErrors(fieldErrors as Partial<ResetPasswordInputState>);
      return;
    }
    try {
      const res: responseType = await resetPassword(formData).unwrap();
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
    <div className="max-w-screen mx-auto p-6 bg-white rounded-lg shadow-lg min-h-screen space-y-8 text-hvrBrwn">
      <Navbar />
      <Toaster />
      <div className="flex-col divCenter">
        <h2 className="text-3xl font-bold text-center text-hdrBrwn mb-8">
          Reset your Password
          <br />
          <h2 className="text-lg font-semibold text-center text-hdrBrwn mt-2">
            Get Reset Password OTP in your Mail
          </h2>
        </h2>
        <form
          className="space-y-8 mb-2 divCenter flex-col"
          onSubmit={handleSendMailAgain}
        >
          <div className="mb-4">
            <div className="relative">
              <Input
                disabled
                readOnly
                type="text"
                placeholder="email"
                name="email"
                value={email}
                className="mt-1 block w-auto px-12 py-2 border border-hvrBrwn border-2 rounded-md"
              ></Input>
              <Mail className="absolute inset-y-2 left-2" />
            </div>
          </div>
          {!isMailSentLoading ? (
            <Button
              type="submit"
              className="w-auto py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
            >
              {isSentOnce ? `Send OTP Again` : `Send OTP`}
            </Button>
          ) : (
            <Button
              disabled
              className=" divCenter gap-4 w-auto py-2 mt-4 bg-hdrBrwn text-white rounded-md"
            >
              <Loader2 className="animate-spin" /> Please Wait...
            </Button>
          )}
        </form>
        <form
          className="space-y-8 mb-2 divCenter flex-col"
          onSubmit={handleSubmit}
        >
          <div>
            {isFieldsVisible ? (
              <div className="md:divCenter flex-col">
                <div className="mb-4 divCenter">
                  {otpData.map((data: string, idx: number) => (
                    <input
                      className="mx-2 h-8 w-10 border text-center border rounded focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                      key={idx}
                      ref={(elem) => (inputRef.current[idx] = elem)}
                      name="otp"
                      type="text"
                      value={data}
                      maxLength={1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOTPChange(idx, e.target.value)
                      }
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(idx, e)
                      }
                    />
                  ))}
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
                      <span className="text-sm text-red-500">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full px-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2" />
                    {errors && (
                      <span className="text-sm text-red-500">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-semibold mt-2 text-red-500">
                  {otpErrors}
                </div>
                {!isLoading ? (
                  <Button
                    type="submit"
                    className="w-auto py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                  >
                    Reset Password
                  </Button>
                ) : (
                  <Button
                    disabled
                    className=" divCenter gap-4 w-auto py-2 mt-4 bg-hdrBrwn text-white rounded-md"
                  >
                    <Loader2 className="animate-spin" /> Please Wait...
                  </Button>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
