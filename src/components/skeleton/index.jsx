import React from "react";
import {Skeleton} from "../ui/skeleton";

const SkeletonTemplate = () => {
	return (
		<div className='flex flex-col space-y-3'>
			<Skeleton className='h-[25vh] w-[20%] rounded-xl mx-auto mt-5' />
			<div className='space-y-2'>
				<Skeleton className='h-[65vh] w-[75%] mx-auto' />
			</div>
		</div>
	);
};

export default SkeletonTemplate;
