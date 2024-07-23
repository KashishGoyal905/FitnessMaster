import React, { useContext, useState } from 'react';
import authContext from '../../context/AuthContext';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    console.log('User Update Details: ', data);

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/update/${user._id}`, {
        method: 'POST',
        body: fd,
      });

      const resData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(resData.message || 'Failed to Sign Up');
      }

      setIsLoading(false);
      setMyUser(resData.user);
      updateFun(resData.user);
      toast.success(resData.message || 'User Updated Successfully');
    } catch (err) {
      setIsLoading(false);
      console.log('Failed to update user details: ', err.message);
      toast.error(err.message || 'Failed to update user details');
      return;
    }
  }

  return (
    <div className="p-4">
      {isLoading && (
        <div className="loading-overlay">
          <p className="relative">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </p>
        </div>
      )}
      <div className="flex flex-col items-center md:mt-2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-2/3 lg:w-[65vw]">
          <div className="bg-cover bg-center h-40 md:h-48" style={{ backgroundImage: `url(${myUser.image || 'default.jpg'})` }}></div>
          <div className="p-6 bg-gray-800 text-gray-200">
            <div className="flex flex-col items-center -mt-20">
              <img
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white"
                src={myUser.image || 'default-avatar.png'}
                alt="Profile"
              />
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-primary">{profileData.username}</h2>
              <p className="text-gray-200 text-sm">{myUser.email}</p>
              <p className="text-gray-200 text-sm">{profileData.contactNumber || 'NA'}</p>
            </div>
            <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="text-gray-200 text-sm"><strong>City:</strong> {profileData.city || 'NA'}</div>
              <div className="text-gray-200 text-sm"><strong>Address:</strong> {profileData.address || 'NA'}</div>
              <div className="text-gray-200 text-sm"><strong>Weight:</strong> {profileData.weight || 'NA'}</div>
              <div className="text-gray-200 text-sm"><strong>Height:</strong> {profileData.height || 'NA'}</div>
              <div className="text-gray-200 text-sm"><strong>Gender:</strong> {profileData.gender || 'NA'}</div>
              <div className="text-gray-200 text-sm"><strong>Age:</strong> {profileData.age || 'NA'}</div>
            </div>  
            <div className="mt-4 md:mt-6 bg-gray-700 text-gray-200 p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-center text-primary mb-2">Goals</h3>
              <p className="text-center">{profileData.goals || 'No goals set yet'}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-[65vw] mt-8 p-4 bg-gray-800 text-gray-200 shadow-md rounded-lg">
          <form method="post" className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-primary">Update Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="username"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Mobile Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  pattern="\d{10}"
                  title="It must contain exactly 10 digits"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={user.email}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Weight</label>
                <div className="flex">
                  <input
                    type="number"
                    name="weight"
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                    value={profileData.weight}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 mt-2 text-gray-200">kg</span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Height</label>
                <div className="flex">
                  <input
                    type="number"
                    name="height"
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                    value={profileData.height}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 mt-2 text-gray-200">ft</span>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Street Address</label>
                <input
                  type="text"
                  name="address"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">State / Province</label>
                <input
                  type="text"
                  name="state"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  type="number"
                  name="postalcode"
                  pattern="\d{6}"
                  title="It must contain exactly 6 digits"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.postalcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="mt-1 block w-full border rounded-md shadow-sm py-0 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Goals</label>
                <textarea
                  name="goals"
                  rows="3"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
                  value={profileData.goals}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
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
