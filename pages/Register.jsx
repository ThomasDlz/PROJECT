import { useNavigate } from "react-router-dom";
import axios from "./services/AxiosConfig.jsx";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate(); // Initialisation de useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData,
      );
      console.log("Inscription réussie :", response.data);
      setAlert({
        type: "success",
        message: "Inscription réussie ! Retour a la page d'accueil",
      });

      // Disparaître après 2 secondes
      setTimeout(() => {
        setAlert({ type: "", message: "" });
        navigate("/"); // Redirection après disparition de l'alerte
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response?.data);

      // Afficher une alerte d'échec
      setAlert({
        type: "danger",
        message:
          error.response?.data?.message || "Erreur lors de l'inscription",
      });

      // Disparaître après 2 secondes
      setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 2000);
    }
  };

  return (
    <>
      <div
        className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        {alert.message && (
          <div
            className={`alert z-50 mx-auto mt-20 w-80 ${
              alert.type === "success" ? "alert-success" : "alert-error"
            }`}
            role="alert"
          >
            {alert.message}
          </div>
        )}
        <div className="none hero-overlay bg-opacity-60"></div>
        <div className="flex h-[calc(100vh-4.3rem)] w-full p-4 md:container md:mx-auto">
          <div className="flex h-full w-full overflow-hidden rounded-3xl border border-gray-300 bg-base-100/60 md:container">
            <img
              className="hidden w-2/4 object-cover lg:block"
              src="pages/football-soccer-4k-tgtgynl9gj4a3qzd-tgtgynl9gj4a3qzd.jpg"
              alt=""
            />
            <div className="relative mx-auto flex w-2/4 min-w-80 flex-col justify-center p-4">
              <h2 className="mb-4 text-center text-2xl">
                Entrez vos informations pour créer votre compte
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="input input-bordered mb-4 flex items-center gap-2 p-2">
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom"
                    required
                  />
                </label>
                <label className="input input-bordered mb-4 flex items-center gap-2 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Email"
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 p-2">
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="******"
                    required
                  />
                </label>
                <button type="submit" className="btn btn-success mt-4">
                  Inscription
                </button>

                <div className="absolute bottom-4 right-12 mt-2 flex">
                  <p className="mr-2">Deja inscrit ?</p>
                  <div
                    tabIndex={0}
                    role="button"
                    className="avatar"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <button className="text-primary">Se connecter</button>
                  </div>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <dialog method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 z-20">
                          ✕
                        </button>
                      </dialog>
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
                              placeholder="Identifiants"
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
                              placeholder="********"
                            />
                          </label>
                          <div className="card-actions justify-end">
                            <button className="btn btn-success mt-2">
                              Connexion
                            </button>
                            <div className="flex">
                              <p className="mr-2">Pas encore de compte ?</p>
                              <a className="text-primary" href="/register">
                                S{"'"}inscrire
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
