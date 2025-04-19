import React from 'react'
import UserNavBar from '../../user/UserNavBar'
import UserFooter from '../../user/UserFooter'
import UserFooterOld from '../../user/UserFooterOld'

const UserLayout = ({ children }) => {
  return (
    <div className="container-fluid mx-auto">
      <UserNavBar />
      {children}
      <UserFooter/>
      {/* <UserFooterOld/> */}
    </div>
  )
}

export default UserLayout