import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            ///component: () => import("@/components/WeatherApp"),
        },
        {
            name: "Custom",
            path: "/Custom",
            component: () => import("@/components/CityApp")
        }
    ]
});