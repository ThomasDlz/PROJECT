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
              <Link to="/transferts">TRANSFERTS</Link>
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
                <Link to="/transferts">Transferts</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
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
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
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
        </div>
      </div>
    </>
  );
}

export default Navbar;
