import type { Metadata } from "next";
import RegisterForm from "@/components/ui/register-form";

export const metadata: Metadata = {
  title: "Register",
};

function Register() {
  return (
    <div className="flex justify-center items-center flex-1 ">
      <RegisterForm />
    </div>
  );
}

export default Register;
