import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/Constants";
import { languageConfigure } from "../utils/languageSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(languageConfigure(e.target.value));
  };
  const handleclick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/netflix-web/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    // We include useEffect feature in header because of
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/netflix-web/browser");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/netflix-web/");
      }
    });
  }, []);
  return (
    <div className="bg-gradient-to-b from-black  absolute  z-20 w-screen md:flex md:justify-between justify-center">
      <img
        className="w-52 md:w-72 md:h-28 px-8 m-auto md:m-0"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
        srcset=""
      />
      {user && (
        <div className="flex justify-between mx-2">
          {showGptSearch && (
            <select
              name=""
              id=""
              className="h-10 mt-6 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-purple-600 text-white w-28 h-10 mt-6 p-2 m-4"
            onClick={handleClick}
          >
            {showGptSearch ? "Home" : "Gpt Search"}
          </button>
          <img
            className="w-8 h-8 mt-6 rounded-2xl items-center hidden md:block"
            src={user.photoURL}
            alt=""
            srcset=""
          />
          <div className="text-white mt-6 m-2">{user.displayName}</div>
          <button
            className="bg-red-600 text-white p-3 w-28 m-5 shadow-md h-12"
            onClick={handleclick}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
