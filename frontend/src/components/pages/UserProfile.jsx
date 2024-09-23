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

  const length = user.fitnessMetrics.length;
  const [dailyMetrics, setDailyMetrics] = useState({
    weight: length > 0 ? user.fitnessMetrics[length - 1].weight : '',
    waistSize: length > 0 ? user.fitnessMetrics[length - 1].waistSize : '',
    chestSize: length > 0 ? user.fitnessMetrics[length - 1].chestSize : '',
    thighSize: length > 0 ? user.fitnessMetrics[length - 1].thighSize : '',
  });

  // Update Daily Metrics Inputs
  const handleMetricsChange = (e) => {
    const { name, value } = e.target;
    setDailyMetrics({ ...dailyMetrics, [name]: value });
  };

  // Submit Daily Metrics
  async function handleMetricsSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/metrics/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dailyMetrics),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Failed to log daily metrics');
      }

      const length = user.fitnessMetrics.length;
      toast.success(resData.message || 'Daily metrics logged successfully');
      setIsLoading(false);
      setDailyMetrics({
        weight: resData.user.fitnessMetrics[length - 1].weight,
        waistSize: resData.user.fitnessMetrics[length - 1].waistSize,
        chestSize: resData.user.fitnessMetrics[length - 1].chestSize,
        thighSize: resData.user.fitnessMetrics[length - 1].thighSize,
      });

      updateFun(resData.user);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'Failed to log daily metrics');
    }
  }

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

  const isSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        {isLoading && (
          <div className="loading-overlay">
            <p className="relative">
              <span className="loading loading-dots loading-lg text-primary"></span>
            </p>
          </div>
        )}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="bg-cover bg-center h-40 sm:h-48 md:h-56 rounded-t-lg" style={{ backgroundImage: `url(${myUser.image || 'default.jpg'})` }}></div>
          <div className="p-6 bg-gray-900 text-white rounded-b-lg">
            <div className="flex flex-col items-center -mt-20 sm:-mt-24">
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-800"
                src={myUser.image || 'default-avatar.png'}
                alt="Profile"
              />
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-purple-600">{profileData.username}</h2>
              <p className="text-gray-400">{myUser.email}</p>
              <p className="text-gray-400">{profileData.contactNumber || 'NA'}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="text-gray-300"><strong>City:</strong> {profileData.city || 'NA'}</div>
              <div className="text-gray-300"><strong>Address:</strong> {profileData.address || 'NA'}</div>
              <div className="text-gray-300"><strong>Weight:</strong> {profileData.weight || 'NA'}</div>
              <div className="text-gray-300"><strong>Height:</strong> {profileData.height || 'NA'}</div>
              <div className="text-gray-300"><strong>Gender:</strong> {profileData.gender || 'NA'}</div>
              <div className="text-gray-300"><strong>Age:</strong> {profileData.age || 'NA'}</div>
            </div>
            <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-center text-purple-600 mb-2">Goals</h3>
              <p className="text-center text-gray-300">{profileData.goals || 'No goals set yet'}</p>
            </div>
          </div>
        </div>

        {/* Daily Metrics Section */}
        <div className="mt-8 bg-gray-800 p-4 sm:p-6 text-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Log Daily Metrics</h2>
          <form method="post" onSubmit={handleMetricsSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={dailyMetrics.weight}
                  onChange={handleMetricsChange}
                  disabled={user.lastMetricSubmission && isSameDay(new Date(user.lastMetricSubmission), new Date())}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Waist Size (cm)</label>
                <input
                  type="number"
                  name="waistSize"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={dailyMetrics.waistSize}
                  onChange={handleMetricsChange}
                  disabled={user.lastMetricSubmission && isSameDay(new Date(user.lastMetricSubmission), new Date())}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Chest Size (cm)</label>
                <input
                  type="number"
                  name="chestSize"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={dailyMetrics.chestSize}
                  onChange={handleMetricsChange}
                  disabled={user.lastMetricSubmission && isSameDay(new Date(user.lastMetricSubmission), new Date())}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Thigh Size (cm)</label>
                <input
                  type="number"
                  name="thighSize"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={dailyMetrics.thighSize}
                  onChange={handleMetricsChange}
                  disabled={user.lastMetricSubmission && isSameDay(new Date(user.lastMetricSubmission), new Date())}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              {user.lastMetricSubmission && isSameDay(new Date(user.lastMetricSubmission), new Date()) ? (
                <button
                  type="submit"
                  disabled
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm"
                >
                  Today's Metrics Submitted
                </button>)
                :
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 hover:bg-purple-700 py-2 px-4 text-sm font-medium text-white shadow-sm"
                >
                  Log Today's Metrics
                </button>
              }
            </div>
          </form>
        </div>

        <div className="mt-8 bg-gray-800 p-4 sm:p-6 text-white shadow-md rounded-lg">
          <form method="post" className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Update Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="username"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Mobile Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  pattern="\d{10}"
                  title="It must contain exactly 10 digits"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={user.email}
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Gender</label>
                <select
                  name="gender"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Weight</label>
                <div className="flex">
                  <input
                    type="number"
                    name="weight"
                    className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                    value={profileData.weight}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 mt-2 text-gray-400">kg</span>
                </div>
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Height</label>
                <div className="flex">
                  <input
                    type="number"
                    name="height"
                    className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
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
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">City</label>
                <input
                  type="text"
                  name="city"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">State</label>
                <input
                  type="text"
                  name="state"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Postal Code</label>
                <input
                  type="text"
                  name="postalcode"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.postalcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-span-2 md:col-span-1'>
                <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
                <input
                  type="file"
                  name="image"
                  className="mt-1 block w-full border-none rounded-md shadow-sm px-3 bg-gray-700 text-white"
                  accept="image/*"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">Goals</label>
                <textarea
                  name="goals"
                  rows="3"
                  className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
                  value={profileData.goals}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 hover:bg-purple-700 py-2 px-4 text-sm font-medium text-white shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
