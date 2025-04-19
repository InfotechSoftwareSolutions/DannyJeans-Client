import React, { useState, useEffect } from "react";
import AdminService from "../../services/admin-api-service/AdminService";

const UserTable = () => {
  const [users, setUsers] = useState([]);
    const {handleToggleUser,getUserData } = AdminService()


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/");
  //       console.log(response, "====response");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch users");
  //       }
  //       const data = await response.json();
  //       console.log(data, "====data");
        
  //       // Ensure we set an array, even if data.users is undefined
  //       setUsers(Array.isArray(data?.users) ? data.users : []);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  
  //   fetchUsers();
  // }, []);


  useEffect(() => {
    fetchUsers();
    }, []);
  
    const fetchUsers= async()=> {
      try {
        const response = await getUserData();
        console.log(response.users,"datas");
        setUsers(response.users);
        
  
        
      } catch (error) {
        
      }
  
    }
    console.log(users,"==users");


  const handleToggle = async(productId)=> {
    try{
   console.log("productId",productId);
    const response = await handleToggleUser(productId);
    console.log(response,"handleToggle");
    // setProducts(response?.product);
    setUsers(response.users);


    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
  }
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">User List</h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 shadow rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{user.userName || "N/A"}</td>
                  <td className="p-2">{user.phone || "N/A"}</td>
                  <td className="p-2">{user.email || "N/A"}</td>
                  <td className="p-2">
                  <button
         onClick={() => handleToggle(user._id)}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
        user?.isActive ? "bg-green-500 text-white":"bg-red-500 text-white"
      }`}
    >
      {user?.isActive ? "Block":"Unblock"}
    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
