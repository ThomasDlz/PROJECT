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
              <Link to="/fixtures">Matchs</Link>
            </li>
            <li>
              <Link to="/rankings">Classement</Link>
            </li>
            <li>
              <Link to="/transferts">Transferts</Link>
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
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <label className="btn btn-circle swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/fixtures">Matchs</Link>
              </li>
              <li>
                <Link to="/rankings">Classement</Link>
              </li>
              <li>
                <Link to="/transferts">Transferts</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
