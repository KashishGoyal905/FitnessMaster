import React, { useContext } from 'react'
import authContext from '../../context/AuthContext'

export default function UserWelcomeDashboard() {
  const { user } = useContext(authContext)
  return (
    <div>
      <div className='w-full h-8 '>
        <h1 className='text-5xl text-center'>Welcome, {user.username} </h1>
        <p className='text-xl text-center mt-2 mb-2 text-purple-500'>Make the most of today!</p>
        <hr />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Recent Activities</h2>
            <ul>
              <li>Attended Yoga Class on 25th June</li>
              <li>Completed 5k run on 24th June</li>
              <li>New personal best on 23rd June</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Upcoming Classes</h2>
            <ul>
              <li>Yoga Class - 27th June</li>
              <li>Cardio Class - 28th June</li>
              <li>Strength Training - 29th June</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
