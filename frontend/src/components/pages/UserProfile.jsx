import React, { useContext, useState } from 'react';
import authContext from '../../context/AuthContext';
// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
  const { user, updateFun } = useContext(authContext);
  const [profileData, setProfileData] = useState({
    username: user.username,
    contactNumber: user.contactNumber || '',
    gender: user.gender || '',
    weight: user.weight || '',
    height: user.height || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    postalcode: user.postalcode || '',
    goals: user.about || '',
  });

  const [myUser, setMyUser] = useState(user);
  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    console.log('User Update Details: ', data);

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/update/${user._id}`, {
        method: 'POST',
        body: fd, // FormData automatically sets the correct headers
      });

      const resData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(resData.message || 'Failed to Sign Up');
      }

      // e.target.reset();
      setIsLoading(false);
      setMyUser(resData.user);
      updateFun(resData.user);
      toast.success(resData.message || 'User Created Succesfully');
    } catch (err) {
      setIsLoading(false);
      console.log('Failed to Sign Up|Frontend: ', err.message);
      toast.error(err.message || 'Failed to Sign Up');
      return;
    }

  };

  return (
    <div className="p-4">
      {isLoading &&
        <div className="loading-overlay">
          <p className="relative">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </p>
        </div>
      }
      <div className="w-full min-h-8 mb-4">
        <h1 className="text-5xl text-center font-bold">Your Profile</h1>
        <hr className="mt-2" />
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full md:w-2/3 lg:w-[60vw]">
          <div className="bg-cover bg-center h-32" style={{ backgroundImage: `url(${myUser.image || 'default.jpg'})` }}></div>
          <div className="p-4 md:p-6">
            <div className="flex items-center mb-4">
              <img
                className="w-24 h-24 rounded-full mr-4"
                src={myUser.image || 'default-avatar.png'}
                alt="Profile"
              />
              <div>
                <h2 className="text-2xl font-bold">{profileData.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{profileData.contactNumber || 'NA'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-gray-600"><strong>City:</strong> {profileData.city || 'NA'}</div>
              <div className="text-gray-600"><strong>Address:</strong> {profileData.address || 'NA'}</div>
              <div className="text-gray-600"><strong>Weight:</strong> {profileData.weight || 'NA'}</div>
              <div className="text-gray-600"><strong>Height:</strong> {profileData.height || 'NA'}</div>
              <div className="text-gray-600"><strong>Gender:</strong> {profileData.gender || 'NA'}</div>
              <div className="text-gray-600"><strong>Age:</strong> {profileData.age || 'NA'}</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-[60vw] mt-8 p-4 bg-white shadow-md rounded-lg">
          <form method="post" className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">Update Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="username"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  pattern="\d{10}"
                  title="It must contain exactly 10 digits"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={user.email}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Weight</label>
                <input
                  type="number"
                  name="weight"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Height</label>
                <input
                  type="number"
                  name="height"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Street Address</label>
                <input
                  type="text"
                  name="address"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">State / Province</label>
                <input
                  type="text"
                  name="state"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">ZIP / Postal Code</label>
                <input
                  type="number"
                  name="postalcode"
                  minLength={6}
                  maxLength={6}
                  pattern="\d{6}"
                  title="It must contain exactly 6 digits"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.postalcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="image"
                  accept=".jpg,.png,.jpeg"
                  className="mt-1 block w-full border rounded-md shadow-sm  px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Goals</label>
                <textarea
                  name="goals"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={profileData.goals}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
