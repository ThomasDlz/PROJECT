import { Link } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 md:container md:mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            PROJECT
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/fixtures">MATCHS</Link>
            </li>
            <li>
              <Link to="/rankings">CLASSEMENT</Link>
            </li>
            <li>
              <Link to="/news">ACTUALITÉ</Link>
            </li>
            <li>
              <Link to="/favorites">FAVORIS</Link>
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

          <div className="btn btn-circle btn-ghost lg:hidden">
            <div
              className="btn btn-circle"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaCalendarDays className="text-2xl" />
            </div>
            <dialog id="my_modal_5" className="modal modal-top sm:modal-middle">
              <div className="modal-box">
                <h3 className="mb-4 text-lg font-bold">
                  Selectionnez une date !
                </h3>
                <Calendar className="h-full w-full rounded-3xl border-gray-300 bg-base-100/60 p-4" />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Valider</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost lg:hidden"
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
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link to="/fixtures">Matchs</Link>
              </li>
              <li>
                <Link to="/rankings">Classement</Link>
              </li>
              <li>
                <Link to="/news">Actualité</Link>
              </li>
              <li>
                <Link to="/favorites">Favoris</Link>
              </li>
            </ul>
          </div>

          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://media.istockphoto.com/id/1978312303/fr/vectoriel/someones-round-icon-isolated-vector-illustration.jpg?s=612x612&w=0&k=20&c=upLiGdtxi9FMaldZCGwisDtT5i8odl1Qpqtdmvj8J6w="
              />
            </div>
          </div>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 z-20">
                  ✕
                </button>
              </form>
              <div className="card card-side bg-base-100">
                <figure>
                  <img
                    className="rounded-l-lg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1yF8Z5YgApAyNccvM0BKWoTTQMX8bUZcUzA&s"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Username"
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      className="grow"
                      placeholder="******"
                    />
                  </label>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary mt-2">Connexion</button>
                    <p>Pas encore de compte ?</p>
                    <a href="/rankings">S{"'"}inscrire</a>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default Navbar;
