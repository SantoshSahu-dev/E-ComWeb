import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../api/users";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await axios.get(api);
        setAllUsers(Array.isArray(data) ? data : data.users ?? []);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Unable to load accounts. Please try again."
        );
      }
    };

    loadUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }


     const user=allusers.find((ele)=>ele.email===formData.email)
    if(!user){
      toast.error("Email is not Register",{position:"top-right"})
      return
    }
    if(user.password !== formData.password){
      toast.error("Invalid password",{position:"top-right"})
      return
    }
    const token="udyhisnccrghughbsnuhb$#@$V76."+user.id
    localStorage.setItem("jwt_token",JSON.stringify(token))
    setFormData({
      email:"",
      password:""
    })
    toast.success("Login Successfully.",{position:"top-center"})
    navigate("/dashboard")

  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to your ShopEase account.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
