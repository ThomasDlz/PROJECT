import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar md:container md:mx-auto bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            PROJECT
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/games">Jeux</Link>
            </li>
            <li>
              <Link to="/members">Membres</Link>
            </li>
            <li>
              <Link to="/news">Actualité</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Rechercher"
              className="input input-bordered w-40 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://media.istockphoto.com/id/1978312303/fr/vectoriel/someones-round-icon-isolated-vector-illustration.jpg?s=612x612&w=0&k=20&c=upLiGdtxi9FMaldZCGwisDtT5i8odl1Qpqtdmvj8J6w="
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Mon compte</a>
              </li>
              <li>
                <a>Paramètres</a>
              </li>
              <li>
                <a>Se deconnecter</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="square"
                  strokeWidth="3"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/games">Jeux</Link>
              </li>
              <li>
                <Link to="/members">Membres</Link>
              </li>
              <li>
                <Link to="/news">Actualité</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
