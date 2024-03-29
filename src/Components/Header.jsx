/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header({ data }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { avathar } = data;
  const submitHandler = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", search);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("search");
    if (searchTermFromUrl) {
      setSearch(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Afan</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form
          onSubmit={submitHandler}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search ..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-slate-700">
              About
            </li>
          </Link>
          <Link to="/profile">
            <img
              src={avathar}
              alt=""
              className="rounded-full object-cover h-7 w-7"
            />
            {/* <li className="hover:underline text-slate-700">{username}</li> */}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
