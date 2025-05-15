import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo-horizontal.png" alt="logo" className="w-20" />
    </Link>
  );
}

export default Logo;
