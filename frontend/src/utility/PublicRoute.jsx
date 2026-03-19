import { Navigate } from 'react-router-dom';

export default function PublicRoutes({ children }) {

	const token = document.cookie.includes('token');

	if (!token) {
		return <Navigate to='/home' replace />
	}

	return children;

}