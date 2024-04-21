import React, {useEffect} from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const Map = ({rootElement, path}) => {
	useEffect(() => {
		let root = am5.Root.new(rootElement);

		root.setThemes([am5themes_Animated.new(root)]);

		let chart = root.container.children.push(
			am5map.MapChart.new(root, {
				// panX: "rotateX",
				// panY: "rotateY",
				// projection: am5map.geoOrthographic(),
				panX: "translateX",
				panY: "translateY",
				projection: am5map.geoEqualEarth(),
				centerMapOnZoomOut: true,
			})
		);

		chart.homeGeoPoint = {latitude: 0, longitude: 0};
		chart.homeZoomLevel =1.5;
		chart.geodata = am5geodata_worldLow;

		let polygonSeries = chart.series.push(
			am5map.MapPolygonSeries.new(root, {
				geoJSON: chart.geodata,
			})
		);

		let polygonTemplate = polygonSeries.mapPolygons.template;
		polygonTemplate.setAll({
			tooltipText: "{name}",
			interactive: true,
			fill: am5.color(0x000000),
		});
		polygonTemplate.states.create("hover", {
			fill: am5.color(0xffffff),
		});

		// Proper exclusion of Antarctica
		polygonSeries.exclude = ["AQ"];

		let pointSeries = chart.series.push(
			am5map.MapPointSeries.new(root, {
				latitudeField: "latitude",
				longitudeField: "longitude",
			})
		);

		pointSeries.bullets.push(function () {
			let circle = am5.Circle.new(root, {
				radius: 10,
				fill: am5.color(0xff3333),
				tooltipText: "{title}",
			});
			return am5.Bullet.new(root, {
				sprite: circle,
			});
		});

		pointSeries.data.setAll(
			path?.flatMap((element, index) => {
				// Eğer eleman dizinin son elemanı ise, hem `origin` hem de `destination` bilgilerini kullan
				if (index === path.length - 1) {
					return [
						{
							latitude: element.origin.latitude,
							longitude: element.origin.longitude,
							title: element.origin.iata_code,
						},
						{
							latitude: element.destination.latitude,
							longitude: element.destination.longitude,
							title: element.destination.iata_code,
						},
					];
				}
				// Diğer tüm elemanlar için sadece `origin` bilgilerini kullan
				return [
					{
						latitude: element.origin.latitude,
						longitude: element.origin.longitude,
						title: element.origin.iata_code,
					},
				];
			})
		);

		let routes = {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						// Reduce fonksiyonu kullanılarak koordinatlar düz bir dizi içinde toplanır.
						coordinates: path?.reduce((acc, element, index, array) => {
							// Tüm elemanlar için origin koordinatlarını ekler.
							acc.push([element.origin.longitude, element.origin.latitude]);

							// Eğer son eleman ise, origin ve destination koordinatlarını ekler.
							if (index === array.length - 1) {
								acc.push([element.origin.longitude, element.origin.latitude]);
								acc.push([element.destination.longitude, element.destination.latitude]);
							}
							return acc;
						}, []),
					},
				},
			],
		};

		chart.series.push(
			am5map.MapLineSeries.new(root, {
				geoJSON: routes,
				stroke: am5.color(0xff3333),
				lineType: "curved",
			})
		);

		return () => root.dispose();
	}, [path]);

	return <div id={rootElement} style={{width: "100%", height: "600px"}}></div>;
};

export default Map;
