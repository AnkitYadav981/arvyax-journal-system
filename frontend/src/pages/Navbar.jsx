import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
    const {clearEverything} = useAuthStore();
    return (
        <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link
            to="/">
            <button onClick={clearEverything}>Home</button>
        </Link> 
        </div>
    )
}

export default Navbar;