import accountIcon from "../../assets/account.svg";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Select from "../../components/Select/Select";
import TextField from "../../components/TextField";
import { useRegisterController } from "./hooks/useRegisterController";
import { IRegisterForm } from "./utils/register.types";

const Register = (props: IRegisterForm) => {
	const { userForm, error, coinsOptions } = useRegisterController();

	return (
		<div className="w-full">
			{props.type === "NEW" && <Header text="Register" />}
			<div className="w-full flex flex-col justify-center items-center">
				<div className="w-2/3 flex flex-col justify-center bg-gray-50 mt-8 mb-4 md:rounded-area md:w-1/3 md:shadow-lg">
					<div className="w-100 hidden justify-center items-center bg-black text-gray-50 text-center text-3xl rounded-t-area p-10 md:flex">
						<img src={accountIcon} style={{ height: "30px", width: "30px" }} />
						<p className="w-2/3 font-thin">
							<strong className="font-bold">
								{props.type === "NEW" ? "Register" : "My profile"}
							</strong>
						</p>
					</div>

					<form
						onSubmit={userForm.handleSubmit}
						className="flex flex-col py-2 gap-y-6 md:px-16 mt-4"
					>
						<TextField
							type={"text"}
							name={"name"}
							label={"Name"}
							value={userForm.values.name}
							onChange={userForm.handleChange}
							error={userForm.errors.name}
							disabled={props.type === "VIEW"}
						/>
						<TextField
							type={"text"}
							name={"email"}
							label={"Email"}
							value={userForm.values.email}
							onChange={userForm.handleChange}
							error={userForm.errors.email}
							disabled={props.type === "VIEW"}
						/>
						<TextField
							type={"text"}
							name={"login"}
							label={"Login"}
							value={userForm.values.login}
							onChange={userForm.handleChange}
							error={userForm.errors.login}
							disabled={props.type === "VIEW"}
						/>

						<Select
							name={"coin"}
							label="Coin"
							optionDefault={"Coin"}
							options={coinsOptions}
							onChange={userForm.handleChange}
							value={userForm.values.coin}
							removeDefaultOption={true}
						/>

						{props.type === "NEW" && (
							<>
								<TextField
									type={"password"}
									name={"password"}
									label={"Password"}
									value={userForm.values.password}
									onChange={userForm.handleChange}
									error={userForm.errors.password}
								/>
								<TextField
									type={"password"}
									name={"confirmPassword"}
									label={"Confirm Password"}
									value={userForm.values.confirmPassword}
									onChange={userForm.handleChange}
									error={userForm.errors.confirmPassword}
								/>
							</>
						)}

						{props.type === "NEW" && (
							<Button type="submit" spacing={20}>
								Register
							</Button>
						)}
						{error && <span className="text-center text-sm text-red-500">{error}</span>}
					</form>

					<div className="flex justify-center items-center mt-2 mb-4">
						{props.type === "NEW" && (
							<a className="no-underline text-sky-500 font-bold" href="/">
								Login
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
