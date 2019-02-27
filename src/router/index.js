import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            name: 'Home',
            path: "/",
            ///component: () => import("@/components/WeatherApp"),
        },
        {
            name: "Favorites",
            path: "/Favorites",
            component: () => import("@/components/Favorites")
        }
    ]
});