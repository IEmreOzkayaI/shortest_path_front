import { Link } from "react-router-dom";
import useNavHide from "./useNavHide";

const Navbar = ({isOpen}) => {
	const hideNavbar = useNavHide(["/login", "/signup"]);
	if (hideNavbar) return null;
	return (
		<div>
			<header className='flex h-14 items-center justify-center  border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
				<Link to='/'>
					<div className='text-2xl font-wallpoet'>PURE</div>
				</Link>
			</header>
		</div>
	);
};

export default Navbar;
