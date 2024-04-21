import {useLocation} from "react-router-dom";

// `paths` parametresi ile gizlenmesi gereken yolları alacak şekilde özel hook tanımlaması
function useNavHide(paths) {
	const location = useLocation();
	return paths.includes(location.pathname);
}

export default useNavHide;
