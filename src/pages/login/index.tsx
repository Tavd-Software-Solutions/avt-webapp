import Button from "../../components/Button";
import TextField from "../../components/TextField";
import Header from "../../components/Header";
import { useLoginController } from "./hooks/useLoginController";

const Login = () => {
	const { loginForm, error } = useLoginController();

	return (
		<div>
			<Header />
			<div className="w-100 flex flex-col justify-center items-center">
				<div className="w-2/3 flex flex-col justify-center bg-gray-50 mt-8 mb-4 md:rounded-area md:w-1/3 md:shadow-lg">
					<div className="w-100 hidden justify-center items-center bg-black text-gray-50 text-center text-3xl rounded-t-area p-10 md:flex">
						<p className="w-2/3 font-thin">
							<strong className="font-bold">Welcome</strong> to{" "}
							<strong className="font-bold">your</strong> best Personal{" "}
							<strong className="font-bold">Finance</strong> Software
						</p>
					</div>
					<form
						onSubmit={loginForm.handleSubmit}
						className="flex flex-col py-2 gap-y-6 md:px-16 mt-4"
					>
						<TextField
							type={"text"}
							name={"login"}
							label={"Login"}
							value={loginForm.values.login}
							onChange={loginForm.handleChange}
							error={loginForm.errors.login}
						/>
						<TextField
							type={"password"}
							name={"password"}
							label={"Password"}
							value={loginForm.values.password}
							onChange={loginForm.handleChange}
							error={loginForm.errors.password}
						/>

						<Button type="submit" spacing={20}>
							Login
						</Button>
						{error && <span className="text-center text-sm text-red-500">{error}</span>}
					</form>

					<div className="flex flex-col justify-center items-center gap-y-4 mb-4">
						<h3>OR</h3>
						<a className="no-underline text-sky-500 font-bold" href="register">
							Sign-up
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
