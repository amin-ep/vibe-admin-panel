import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/Layout.tsx", [
    index("routes/home/home.tsx"),
    route("musics", "routes/musics/musics.tsx"),
  ]),
  route("login", "routes/login/login.tsx"),
] satisfies RouteConfig;
