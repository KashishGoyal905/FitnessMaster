import React, { useContext, useState } from 'react';
import authContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRoleRedirect from '../../middleware/useRoleRedirect';

export default function UserProfile() {
  useRoleRedirect(['user'], '/');

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
    const token = localStorage.getItem('token');

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/update/${user._id}`, {
        method: 'POST',
        body: fd,
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const resData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(resData.message || 'Failed to Update');
      }

      setIsLoading(false);
      setMyUser(resData.user);
      updateFun(resData.user);
      toast.success(resData.message || 'User Updated Successfully');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'Failed to update user details');
    }
  }

  return (
    <div className="p-6">
      {isLoading && (
        <div className="loading-overlay">
          <p className="relative">
            <span className="loading loading-dots loading-lg text-purple-600"></span>
          </p>
        </div>
      )}
      <div className="flex flex-col items-center md:mt-4">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full md:w-2/3 lg:w-[65vw]">
          <div className="bg-cover bg-center h-40 md:h-48" style={{ backgroundImage: `url(${myUser.image || 'default.jpg'})` }}></div>
          <div className="p-6 bg-gray-900 text-white">
            <div className="flex flex-col items-center -mt-20">
              <img
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-purple-600"
                src={myUser.image || 'default-avatar.png'}
                alt="Profile"
              />
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-purple-600">{profileData.username}</h2>
              <p className="text-gray-300 text-sm">{myUser.email}</p>
              <p className="text-gray-300 text-sm">{profileData.contactNumber || 'NA'}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="text-gray-300 text-sm"><strong>City:</strong> {profileData.city || 'NA'}</div>
              <div className="text-gray-300 text-sm"><strong>Address:</strong> {profileData.address || 'NA'}</div>
              <div className="text-gray-300 text-sm"><strong>Weight:</strong> {profileData.weight || 'NA'} kg</div>
              <div className="text-gray-300 text-sm"><strong>Height:</strong> {profileData.height || 'NA'} ft</div>
              <div className="text-gray-300 text-sm"><strong>Gender:</strong> {profileData.gender || 'NA'}</div>
              <div className="text-gray-300 text-sm"><strong>Age:</strong> {profileData.age || 'NA'}</div>
            </div>
            <div className="mt-6 bg-gray-800 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-center text-purple-600 mb-2">Goals</h3>
              <p className="text-center">{profileData.goals || 'No goals set yet'}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-[65vw] mt-8 p-6 bg-gray-900 text-white shadow-md rounded-lg">
          <form method="post" className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-purple-600">Update Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="username"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Mobile Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  pattern="\d{10}"
                  title="It must contain exactly 10 digits"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={user.email}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Gender</label>
                <select
                  name="gender"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
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
                <label className="block text-sm font-medium text-gray-300">Weight</label>
                <div className="flex">
                  <input
                    type="number"
                    name="weight"
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                    value={profileData.weight}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 mt-2 text-gray-400">kg</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Height</label>
                <div className="flex">
                  <input
                    type="number"
                    name="height"
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                    value={profileData.height}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 mt-2 text-gray-400">ft</span>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">Street Address</label>
                <input
                  type="text"
                  name="address"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">City</label>
                <input
                  type="text"
                  name="city"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">State</label>
                <input
                  type="text"
                  name="state"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">Postal Code</label>
                <input
                  type="number"
                  name="postalcode"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.postalcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">Update Image</label>
                <input
                  type="file"
                  name="image"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
  