import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Home from "../components/client/Home";

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/', exact: true, name: 'Home', component: Home },

];

export default routes;