import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import jwt_decode from "jwt-decode";

interface AuthData {
	isAuthenticated: boolean;
	token: string | null;
	user: User;
	setToken: (token: string | null) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface TokenPayload {
	sub: string;
	exp: number;
	username: string;
	coin: string;
}

interface User {
	uuid: string;
	username: string;
	coin: string;
}

const AuthContext = createContext<AuthData | undefined>(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
	const [user, setUser] = useState<User>({
		uuid: "",
		username: "",
		coin: "",
	});

	const isAuthenticated = useMemo(() => {
		return token ? true : false;
	}, [token]);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			const { exp, username, sub, coin } = parseToken(storedToken);

			if (exp && exp * 1000 > Date.now()) {
				setToken(storedToken);
				setUser({
					uuid: sub,
					username: username,
					coin: coin,
				});
			} else {
				logout();
			}
		}
	}, []);

	const parseToken = (token: string) => {
		const decodedToken = jwt_decode<TokenPayload>(token);
		return decodedToken;
	};

	const handleSetToken = (newToken: string | null) => {
		if (newToken) {
			const { username, sub, coin } = parseToken(newToken);
			localStorage.setItem("token", newToken);
			setToken(newToken);
			setUser({
				uuid: sub,
				username: username,
				coin: coin,
			});
		} else {
			logout();
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser({
			uuid: "",
			username: "",
			coin: "",
		});
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, token, user, setToken: handleSetToken, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
