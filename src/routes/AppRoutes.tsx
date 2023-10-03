import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading/Loading";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { AuthorizationInterceptor } from "../api/Api";
import { ChartProvider } from "../context/ChartsContext";

const Layout = lazy(() => import("../components/Layout/Layout"));
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/register"));
const ExtractsList = lazy(() => import("../pages/extracts"));
const ExpensesForm = lazy(() => import("../pages/expenses/form/"));
const RevenueList = lazy(() => import("../pages/expenses/list"));
const Metrics = lazy(() => import("../pages/metrics"));

export function AppRoutes() {
	return (
		<AuthProvider>
			<AuthorizationInterceptor />
			<BrowserRouter>
				<Suspense
					fallback={
						<div className="w-screen h-screen flex items-center justify-center">
							<Loading />
						</div>
					}
				>
					<Toaster position="top-right" />

					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<Register type={"NEW"} />} />
						<Route element={<ProtectedRoute />}>
							<Route element={<Layout />}>
								<Route path="/profile" element={<Register type={"VIEW"} />} />
								<Route path="/revenue/form/new" element={<ExpensesForm type={"NEW"} />} />
								<Route
									path="/revenue/form/:id"
									element={<ExpensesForm type={"VIEW"} />}
								/>
								<Route
									path="/revenue/form/edit/:id"
									element={<ExpensesForm type={"EDIT"} />}
								/>
								<Route path="/revenue" element={<RevenueList />} />
								<Route
									path="/extracts"
									element={
										<ChartProvider>
											<ExtractsList />
										</ChartProvider>
									}
								/>
								<Route path="/metrics" element={<Metrics />} />
							</Route>
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</AuthProvider>
	);
}
