import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from 'vue-router';
import TrackListVue from './components/TrackList.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/playlist/:id',
		name: 'Playlist',
		component: TrackListVue,
		props: true,
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
