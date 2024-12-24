import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !localStorage.getItem('user')) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-24 h-48 bg-gray-400">
            <p>akwbdlhwfpa</p>
            <h1>This is a dashboard</h1>
            <div>
                <p>Hi {user.name || 'User'}!</p>
                <p>Email: {user.email || 'No email found'}</p>
                <p>User ID: {user.id || 'No ID found'}</p>
                <h2>Debug: User Object Contents</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    );
}