import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			include: "**/*.jsx",
		}),
	],
	optimizeDeps: {
		include: ["@amcharts/amcharts5", "@amcharts/amcharts5/themes/Animated", "@amcharts/amcharts5-geodata/worldLow","@amcharts/amcharts5/core"],
	},
	server: {
		usePolling: true,
		port: 3000,
		open: "/",
	},
	resolve: {
		alias: {
			// @/* için src/* yolunu belirtin
			"@": path.resolve(__dirname, "src"),
		},
	},
});
