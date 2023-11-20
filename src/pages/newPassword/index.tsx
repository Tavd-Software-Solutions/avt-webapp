import Button from "../../components/Button";
import TextField from "../../components/TextField";
import Header from "../../components/Header";
import { useNewPasswordController } from "./hooks/useNewPasswordController";

const NewPassword = () => {
	const { step, getRecoverCodeForm, recoverPasswordForm, validateCodeForm, error } =
		useNewPasswordController();

	return (
		<div>
			<Header />
			<div className="w-100 flex flex-col justify-center items-center">
				{step === 1 && (
					<div className="w-2/3 flex flex-col justify-center bg-gray-50 mt-8 mb-4 md:rounded-area md:w-1/3 md:shadow-lg">
						<div className="w-100 hidden justify-center items-center bg-black text-gray-50 text-center text-3xl rounded-t-area p-10 md:flex">
							<p className="w-2/3 font-thin">
								<strong className="font-bold">Insert</strong> your{" "}
								<strong className="font-bold">Email</strong>
							</p>
						</div>
						<form
							onSubmit={getRecoverCodeForm.handleSubmit}
							className="flex flex-col py-2 gap-y-6 md:px-16 mt-4"
						>
							<TextField
								type={"text"}
								name={"email"}
								label={"Email"}
								value={getRecoverCodeForm.values.email}
								onChange={getRecoverCodeForm.handleChange}
								error={getRecoverCodeForm.errors.email}
							/>

							<Button type="submit" spacing={20}>
								Send
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
				)}

				{step === 2 && (
					<div className="w-2/3 flex flex-col justify-center bg-gray-50 mt-8 mb-4 md:rounded-area md:w-1/3 md:shadow-lg">
						<div className="w-100 hidden justify-center items-center bg-black text-gray-50 text-center text-3xl rounded-t-area p-10 md:flex">
							<p className="w-2/3 font-thin">
								<strong className="font-bold">Insert</strong> the{" "}
								<strong className="font-bold">Code</strong>
							</p>
						</div>
						<span className="text-center text-sm text-sky-500 mt-1 font-bold">
							We sent an email with the code
						</span>
						<form
							onSubmit={validateCodeForm.handleSubmit}
							className="flex flex-col py-2 gap-y-6 md:px-16 mt-4"
						>
							<TextField
								type={"text"}
								name={"recoverCode"}
								label={"Code"}
								value={validateCodeForm.values.recoverCode}
								onChange={validateCodeForm.handleChange}
								error={validateCodeForm.errors.recoverCode}
							/>

							<Button type="submit" spacing={20}>
								Validate
							</Button>
							{error && <span className="text-center text-sm text-red-500">{error}</span>}
						</form>

						<div className="flex flex-col justify-center items-center gap-y-4 mb-4">
							<h3>OR</h3>
							<a className="no-underline text-sky-500 font-bold" href="/">
								Sign-up
							</a>
						</div>
					</div>
				)}

				{step === 3 && (
					<div className="w-2/3 flex flex-col justify-center bg-gray-50 mt-8 mb-4 md:rounded-area md:w-1/3 md:shadow-lg">
						<div className="w-100 hidden justify-center items-center bg-black text-gray-50 text-center text-3xl rounded-t-area p-10 md:flex">
							<p className="w-2/3 font-thin">
								<strong className="font-bold">Insert</strong> your{" "}
								<strong className="font-bold">New Password</strong>
							</p>
						</div>
						<form
							onSubmit={recoverPasswordForm.handleSubmit}
							className="flex flex-col py-2 gap-y-6 md:px-16 mt-4"
						>
							<TextField
								type={"password"}
								name={"newPassword"}
								label={"New Password"}
								value={recoverPasswordForm.values.newPassword}
								onChange={recoverPasswordForm.handleChange}
								error={recoverPasswordForm.errors.newPassword}
							/>

							<TextField
								type={"password"}
								name={"confirmPassword"}
								label={"Confirm Password"}
								value={recoverPasswordForm.values.confirmPassword}
								onChange={recoverPasswordForm.handleChange}
								error={recoverPasswordForm.errors.confirmPassword}
							/>

							<Button type="submit" spacing={20}>
								Send
							</Button>
							{error && <span className="text-center text-sm text-red-500">{error}</span>}
						</form>

						<div className="flex flex-col justify-center items-center gap-y-4 mb-4">
							<a className="no-underline text-sky-500 font-bold" href="/">
								{"<-"} Return to Login
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewPassword;
