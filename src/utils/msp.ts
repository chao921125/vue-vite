export default {
	qqMapToBMap: (lng, lat) => {
		const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
		const x = lng;
		const y = lat;
		const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
		const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
		const bdLng = z * Math.cos(theta) + 0.0065;
		const bdLat = z * Math.sin(theta) + 0.006;
		return { lng: bdLng, lat: bdLat };
	},
	bMapToQQMap: (lng, lat) => {
		const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
		const x = lng - 0.0065;
		const y = lat - 0.006;
		const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
		const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
		const qqLng = z * Math.cos(theta);
		const qqLat = z * Math.sin(theta);
		return { lng: qqLng, lat: qqLat };
	},
};
