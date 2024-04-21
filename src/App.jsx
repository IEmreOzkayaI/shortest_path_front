import {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound";
import Navbar from "./components/navbar";
import Redirect from "./components/redirect";
import {useEffect} from "react";
import axios from "axios";
import Landing from "./screens";

const systemWarning = {
	redirect_message: "Be redirected to the page in 2 seconds.",
};

function App() {
	const LazyLanding = lazy(() => {
		return new Promise((resolve) => setTimeout(() => resolve(import("./screens")), 2000));
	});

	return (
		<Suspense fallback={<Redirect success={false} text={systemWarning.redirect_message} />} key={"suspense"}>
			<Navbar isOpen={false} />
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Landing />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
