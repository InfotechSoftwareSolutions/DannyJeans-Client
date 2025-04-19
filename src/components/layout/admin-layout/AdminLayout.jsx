// import AdminNavbar from '../../admin/AdminNavbar'

import AdminNavBar from "../../admin/AdminNavBar"

const AdminLayout = ({children}) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
          <AdminNavBar />
        <div className="max-h-screen overflow-y-auto w-full p-6 ">
          {children}
          </div>
        </div>
      )
}

export default AdminLayout