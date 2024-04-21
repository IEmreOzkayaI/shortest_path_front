import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";

const PureSelect = ({airports, handleAirport, placeholder}) => {
	return (
		<Select onValueChange={(iata_code) => handleAirport(iata_code)}>
			<SelectTrigger className='w-[12rem]' variant='outlined'>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{Object.keys(airports).map((airport,index) => (
					<SelectGroup key={index}>
						<SelectLabel key={index} value={airport}>
							{airport}
						</SelectLabel>
						{airports[airport].map((airport) => (
							<SelectItem key={airport.iata_code} value={airport.iata_code}>
								{airport.airport} ({airport.iata_code})
							</SelectItem>
						))}
					</SelectGroup>
				))} 
			</SelectContent>
		</Select>
	);
};

export default PureSelect;
