import React from 'react'
import useRoleRedirect from '../../middleware/useRoleRedirect'

export default function CreateClass() {
  // To resstric the user with 'User' role to acess this page
  useRoleRedirect(['admin'], '/');


  return (
    <div>CreateClass</div>
  )
}
