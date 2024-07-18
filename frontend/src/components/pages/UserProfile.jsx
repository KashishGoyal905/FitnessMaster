import React, { useContext, useState } from 'react';
import authContext from '../../context/AuthContext';

export default function UserProfile() {
  const { user } = useContext(authContext);
  const [profileData, setProfileData] = useState({
    fullname: '',
    contactNumber: '',
    gender: '',
    weight: '',
    height: '',
    address: '',
    city: '',
    state: '',
    postalcode: '',
    about: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="p-4">
      <div className="w-full min-h-8 mb-4">
        <h1 className="text-5xl text-center">Your Profile</h1>
        <hr className="mt-2" />
      </div>
      <div className='flex flex-col'>
        <div className="card lg:card-side bg-base-100 shadow-xl mx-auto mt-8 w-[70vw] ">
          <figure>
            <img
              className='w-full h-96'
              src={user.image}
              alt="Profile"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.contactNumber}</p>
            <p>{user.weight}</p>
            <p>{user.height}</p>
          </div>
        </div>
        <div className="w-[80vw] mx-auto p-4 md:py-10">
          <form method="post" className="space-y-8" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Update Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">Full name<span className="required-asterisk">*</span></label>
                  <input
                    type="text"
                    name="fullname"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.fullname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">Mobile Number<span className="required-asterisk">*</span></label>
                  <input
                    type="text"
                    name="contactNumber"
                    required
                    pattern="\d{10}"
                    title="It must contain exactly 10 digits"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">Email address<span className="required-asterisk">*</span></label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={user.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">Gender</label>
                  <select
                    name="gender"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  <input
                    type="text"
                    name="weight"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">Height</label>
                  <input
                    type="text"
                    name="height"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.height}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Street address</label>
                  <input
                    type="text"
                    name="address"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">City<span className="required-asterisk">*</span></label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">ZIP / Postal code</label>
                  <input
                    type="text"
                    name="postalcode"
                    minLength={6}
                    maxLength={6}
                    pattern="\d{6}"
                    title="It must contain exactly 6 digits"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={profileData.postalcode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium">Profile Picture<span className="required-asterisk">*</span></label>
                  <input
                    type="file"
                    name="image"
                    accept=".jpg,.png,.jpeg"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">About<span className="required-asterisk">*</span></label>
                  <textarea
                    name="about"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="3"
                    placeholder="Write a few words about yourself."
                    value={profileData.about}
                    onChange={handleInputChange}
                  ></textarea>
                  <p className="text-sm text-gray-500">This will help people to know about you.</p>
                </div>
              </div>
            </div>
            <div className="md:mt-6 mb-4 flex justify-center md:justify-end">
              <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
