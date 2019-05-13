import Vue from 'vue'
import Router from 'vue-router'
import LoginView from "./views/login.vue"
import RegisterView from "./views/register.vue"
import SecureView from "./views/secure.vue"
import VueFlashMessage from 'vue-flash-message'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Router);
Vue.use(VueFlashMessage);
Vue.use(Buefy);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginView, VueFlashMessage
        },
        {
            path: "/register",
            name: "registration",
            component: RegisterView, VueFlashMessage
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureView, VueFlashMessage, Buefy
        }
    ]
})