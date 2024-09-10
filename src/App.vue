<script setup>
	import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
	<svg
		viewBox="0 0 500 500"
		version="1.1"
		id="svg_null">
		<g
			id="root"
			stroke="none"
			stroke-width="1"
			fill="none"
			fill-rule="evenodd">
			<rect
				id="background"
				fill="#FFF"
				x="0"
				y="0"
				width="500"
				height="500"></rect>
			<path
				d="M119.368 300.368c3.814 0 9.217 -5.942 13.746 -17.718c5.213 -13.554 8.254 -32.244 8.254 -52.282c0 -20.04 -3.04 -38.729 -8.254 -52.283c-4.53 -11.776 -9.932 -17.717 -13.746 -17.717c-3.815 0 -9.218 5.941 -13.747 17.717c-5.213 13.554 -8.253 32.244 -8.253 52.283c0 20.038 3.04 38.728 8.253 52.282c4.53 11.776 9.932 17.718 13.747 17.718zm0 8c-16.569 0 -30 -34.922 -30 -78c0 -43.079 13.431 -78 30 -78c16.568 0 30 34.921 30 78c0 43.078 -13.432 78 -30 78z"
				id="shape.primary"
				fill="#393737"
				fill-rule="nonzero"
				transform="translate(119.367532, 230.367532) rotate(45.000000) translate(-119.367532, -230.367532)"></path>
			<g
				id="Group"
				transform="translate(117.000000, 220.000000)">
				<rect
					id="Rectangle-56"
					x="0"
					y="0"
					width="323"
					height="60"></rect>
				<text
					id="headerText"
					font-family="Josefin Sans"
					font-size="60"
					font-weight="600"
					line-spacing="60"
					letter-spacing="6"
					fill="#4A4A4A"
					data-text-alignment="L"
					font-style="normal">
					<tspan
						x="0"
						y="52">
						CCNET
					</tspan>
				</text>
			</g>
		</g>
	</svg>
	<v-btn>123</v-btn>
	<HelloWorld msg="Vite + Vue" />
</template>

<style scoped lang="scss">
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}

	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
