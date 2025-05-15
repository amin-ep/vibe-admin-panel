import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/Layout.tsx", [
    index("routes/home/home.tsx"),
    route("musics", "routes/musics/musics.tsx"),
    route("new-music", "routes/new-music/new-music.tsx"),
    route("artists", "routes/artists/artists.tsx"),
    route("users", "routes/users/users.tsx"),
    route("albums", "routes/albums/albums.tsx"),
    route("new-album", "routes/new-album/new-album.tsx"),
    route("album/:albumId", "routes/album/album.tsx"),
    route("edit-music/:musicId", "routes/edit-music/edit-music.tsx"),
    route("edit-album/:albumId", "routes/edit-album/edit-album.tsx"),
  ]),

  // account layout
  layout("layout/AccountLayout.tsx", [
    ...prefix("account", [
      index("routes/account/account.tsx"),
      route(
        "change-password",
        "routes/account/change-password/change-password.tsx",
      ),
    ]),
  ]),

  route("login", "routes/login/login.tsx"),
] satisfies RouteConfig;
