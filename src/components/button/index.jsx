import { Button } from "@/components/ui/button";

const PureButton = ({id, variant, activeButton, onClick, children}) => {
	const isActive = activeButton === id;

	return (
		<Button id={id} variant={variant} className={`w-[10%] ${isActive ? "bg-black text-white hover:bg-black hover:text-white" : ""}`} onClick={onClick}>
			{children}
		</Button>
	);
};

export default PureButton;
