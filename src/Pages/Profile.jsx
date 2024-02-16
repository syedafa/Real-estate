import { useEffect, useRef, useState } from "react";
import { EstateState } from "../context/EstateProvider";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = EstateState();
  console.log(user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [showListings, setShowListings] = useState([]);
  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (err) => {
        setFileUploadError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((dowmloadURL) => {
          setFormData({ ...formData, avathar: dowmloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setError(null);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      if (formData.password.trim().length < 1) {
        setError("password feild is required !");
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
      setLoading(false);
      setError(null);
      setUpdateSuccess(true);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  console.log(formData);
  console.log(error);
  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      localStorage.removeItem("loggedInUser");
      navigate("/sign-up");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleSignOut = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      localStorage.removeItem("loggedInUser");
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${user._id}`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setShowListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avathar || (user && user.avathar)}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          alt="pic"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error image upload (Image must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="User Name"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={user?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={user?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        {error && <p className="text-red-700">{error}</p>}
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to="/create-listing"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Signout Account
        </span>
      </div>
      <p className="text-green-700">
        {updateSuccess && "USER UPDATED SUCCESSFULLY"}
      </p>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700">
        {showListingError ? "Error in showing listing" : ""}
      </p>
      {showListings && showListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {showListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="text-red-700 uppercase">delete</button>
                <button className="text-green-700 uppercase">edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
