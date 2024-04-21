import PureButton from "@/components/button";
import PureSelect from "@/components/select";
import {Skeleton} from "@/components/ui/skeleton";
import {useAirport} from "./useAirport";
import {useButton} from "./useButton";
import useFlight from "./useFlight";
import useSetup from "./useSetup";
import SkeletonTemplate from "@/components/skeleton";
import Map from "@/components/map";

const Landing = () => {
	const {airportData, airportLoading, airportError} = useAirport();
	const {origin, destination, type, handleOrigin, handleDestination, handleType, pathData, pathError, pathLoading} = useFlight();
	const {setupData} = useSetup();
	const {button, handleClick} = useButton(handleType);

	if (setupData !== "OK" || airportLoading) {
		return <SkeletonTemplate />;
	}

	if (airportError || pathError) return <div>{airportError || pathError}</div>;

	console.log("pathData", pathData);
	return (
		<div className='relative'>
			{pathLoading && (
				<div className='absolute top-0 left-0 w-screen h-[250vh] bg-white opacity-90 flex pt-[10rem] justify-center items-start overflow-hidden z-50'>
					<img src='/Radar.gif' alt='' />
				</div>
			)}
			<div className='w-screen h-[10rem] text-black flex items-center justify-center text-2xl font-bold'>Find Shortest Way To Flight</div>
			<div className='w-screen h-[3rem] flex items-center justify-center gap-10 mb-[2rem]'>
				<PureSelect airports={airportData} handleAirport={handleOrigin} placeholder='Origin Airport' />
				<PureSelect airports={airportData} handleAirport={handleDestination} placeholder='Destination Airport' />
			</div>
			<div className='w-screen h-[5rem] text-black flex items-center justify-center text-2xl font-bold'> According To</div>

			<div className='w-screen flex text-center justify-center gap-5'>
				<PureButton id='time' variant='secondary' activeButton={button} onClick={handleClick}>
					Time
				</PureButton>
				<PureButton id='distance' variant='ghost' activeButton={button} onClick={handleClick}>
					Distance
				</PureButton>
			</div>

			{pathData && (
				<div
					className='w-[75%] mx-auto h-fit bg-stone-50 flex flex-col items-center  pb-5 mb-10 gap-10 shadow-lg mix-blend-darker border-solid rounded-xl mt-10
			'>
					<div className='font-bold font-[2rem] mt-5 flex justify-between w-[75%]'>
						<div>Dijkstra Algorithm</div>
						<div>ExecutionTime: {parseInt(pathData?.dijkstra?.dijkstraExecutionTime).toFixed(2)}ms</div>
						<div>
							Shortest {button}: {pathData?.dijkstra?.dijkstraWeight}
							{button === "time" ? "min" : "km"}
						</div>
					</div>
					<Map rootElement='chart1' path={pathData?.dijkstra?.dijkstraPathResult} />
				</div>
			)}
			{pathData && (
				<div
					className='w-[75%] mx-auto h-fit bg-stone-50 flex flex-col items-center  pb-5 mb-10 gap-10 shadow-lg mix-blend-darker border-solid rounded-xl
				'>
					<div className='font-bold font-[2rem] mt-5 flex justify-between w-[75%]'>
						<div>Bellman-Ford Algorithm</div>
						<div>ExecutionTime: {parseInt(pathData?.bellmanFord?.bellmanFordExecutionTime).toFixed(2)}ms</div>
						<div>
							Shortest {button}: {pathData?.bellmanFord?.bellmanFordWeight}
							{button === "time" ? "min" : "km"}
						</div>
					</div>
					<Map rootElement='chart2' path={pathData?.bellmanFord?.bellmanFordPathResult} />
				</div>
			)}
			{pathData && (
				<div
					className='w-[75%] mx-auto h-fit bg-stone-50 flex flex-col items-center  pb-5 mb-10 gap-10 shadow-lg mix-blend-darker border-solid rounded-xl
				'>
					<div className='font-bold font-[2rem] mt-5 flex justify-between w-[75%]'>
						<div>Floyd-Warshall Algorithm</div>
						<div>ExecutionTime: {parseInt(pathData?.floydWarshall?.floydWarshallExecutionTime).toFixed(2)}ms</div>
						<div>
							Shortest {button}: {pathData?.floydWarshall?.floydWarshallWeight}
							{button === "time" ? "min" : "km"}
						</div>
					</div>
					<Map rootElement='chart3' path={pathData?.floydWarshall?.floydWarshallPathResult} />
				</div>
			)}
		</div>
	);
};

export default Landing;
