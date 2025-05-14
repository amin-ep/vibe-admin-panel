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
    route("new-music", "routes/new-music/new-music.tsx"),
    route("artists", "routes/artists/artists.tsx"),
    route("users", "routes/users/users.tsx"),
    route("albums", "routes/albums/albums.tsx"),
    route("new-album", "routes/new-album/new-album.tsx"),
    route("album/:albumId", "routes/album/album.tsx"),
    route("edit-music/:musicId", "routes/edit-music/edit-music.tsx"),
    route("edit-album/:albumId", "routes/edit-album/edit-album.tsx"),
  ]),
  route("login", "routes/login/login.tsx"),
  route("account", "routes/account/account.tsx"),
] satisfies RouteConfig;
