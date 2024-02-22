import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/access-denied",
      name: "access-denied",
      component: () => import("../views/AccessDenied.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard-operator",
      name: "dashboard-operator",
      component: () => import("../views/DashboardOperator.vue"),
    },
    {
      path: "/dashboard-admin",
      name: "dashboard-admin",
      component: () => import("../views/DashBoardAdmin.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/books",
      name: "books",
      component: () => import("../views/BookList.vue"),
    },
    {
      path: "/borrows",
      name: "borrows",
      component: () => import("../views/BorrowList.vue"),
    },
    {
      path: "/borrows/print/:id",
      name: "borrows-print",
      component: () => import("../views/BorrowPrint.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UserList.vue")
    },
    {
      path: "/operators",
      name: "operators",
      component: () => import("../views/OperatorList.vue")
    },
    {
      path: "/booklist",
      name: "booklist",
      component: () => import("../views/BookView.vue")
    },
	{
		path: "/booklist/detail/:id",
		name: "detail-book",
		component: () => import("../views/BookDetail.vue"),
	  },
	{
		path: "/booklist/rating/:id",
		name: "rating-book",
		component: () => import("../views/BookRating.vue"),
	  },
	{
		path: "/bookmark",
		name: "my-bookmark",
		component: () => import("../views/CollectionView.vue"),
	  },
	{
		path: "/profile",
		name: "my-profile",
		component: () => import("../views/ProfileUser.vue"),
	  },
	{
		path: "/op-profile",
		name: "op-profile",
		component: () => import("../views/ProfileOp.vue"),
	  },
  ],
});

export default router;
