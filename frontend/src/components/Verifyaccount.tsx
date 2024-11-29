import { Loader2, Mail } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Navbar from "./Navbar";
import { useAppSelector } from "../app/hooks";
import {
  useSendMailMutation,
  useVerifyAccountMutation,
} from "../features/api/authApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";
import {
  loginUserType,
  responseType,
  sendMailType,
  verifyAccountInputType,
} from "../types/user";
import { useNavigate } from "react-router-dom";

const Verifyaccount = () => {
  const [formData, setFormData] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpErrors, setOtpErrors] = useState<string>("");
  const inputRef = useRef<any>([]);

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [sendMail, { isLoading: isMailSentLoading }] = useSendMailMutation();

  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const handleChange = (idx: number, val: string) => {
    if (/^[a-zA-Z0-9]$/.test(val) || val === "") {
      const newVal = [...formData];
      newVal[idx] = val;
      setFormData(newVal);

      if (val !== "" && idx < 5) {
        inputRef.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !formData[idx] && idx > 0) {
      inputRef.current[idx - 1].focus();

      const val = [...formData];
      val[idx] = "";
      setFormData(val);
    }
  };

  const handleSendMailAgain = async () => {
    const inputData: sendMailType = { email, mailType: "verifyAccount" };
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = formData.join("").toString();
    if (otp.length !== 6) {
      setOtpErrors(
        "OTP Submitted does not have 6 characters... Please Enter OTP Again"
      );
      setFormData(["", "", "", "", "", ""]);
      return;
    }

    const inputData: verifyAccountInputType = { email, otp };

    try {
      const res: loginUserType = await verifyAccount(inputData).unwrap();
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
        <h2 className="text-3xl font-bold text-center text-hdrBrwn mb-8 mt-16">
          Verify your Email
          <br />
          <h2 className="text-lg font-semibold text-center text-hdrBrwn mt-2">
            Enter the 6 Digit Code sent to your Email
          </h2>
        </h2>
        <form
          className="space-y-8 mb-2 divCenter flex-col"
          onSubmit={handleSubmit}
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
          <div className="mb-4 divCenter">
            {formData.map((data: string, idx: number) => (
              <input
                className="mx-2 h-8 w-10 border text-center border rounded focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
                key={idx}
                ref={(elem) => (inputRef.current[idx] = elem)}
                name="otp"
                type="text"
                value={data}
                maxLength={1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
              />
            ))}
          </div>
          {!isLoading ? (
            <Button
              type="submit"
              className="w-auto py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
            >
              Verify Your Email
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
        {!isMailSentLoading ? (
          <Button
            onClick={handleSendMailAgain}
            type="submit"
            className="w-auto py-2 mt-4 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
          >
            Send OTP Again
          </Button>
        ) : (
          <Button
            disabled
            className=" divCenter gap-4 w-auto py-2 mt-4 bg-hdrBrwn text-white rounded-md"
          >
            <Loader2 className="animate-spin" /> Please Wait...
          </Button>
        )}
        <div className="text-semibold mt-2 text-red-500">{otpErrors}</div>
      </div>
    </div>
  );
};

export default Verifyaccount;
