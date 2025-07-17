import LoginForm from "@/components/ui/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

function Login() {
  return (
    <div className="flex justify-center items-center flex-1 ">
      <LoginForm />
    </div>
  );
}

export default Login;
