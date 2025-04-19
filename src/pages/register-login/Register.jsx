import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/user-api-service/UserService";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",  // Set default role if required
    status: "active", // Set default status if required
  });
  const { postRegister} = UserService();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirection after registration

  // Handle input change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };


  const handleRegister = async()=> {
    // const data = {userId,productId, quantity}
    const response = await postRegister(userData);
    console.log(response);

  }

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     console.log("Sending payload:", formData); // Log to verify data structure

  //     const response = await fetch("http://localhost:3000/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Registration failed");
  //     }

  //     console.log("Registration successful:", data);
  //     alert("Registration successful!");
  //     navigate("/login"); // Redirect to login page after success

  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              name="name"
              className="form-control" 
              value={userData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-control" 
              value={userData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-control" 
              value={userData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input 
              type="text" 
              name="phone"
              className="form-control" 
              value={userData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;





// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log("Registering with:", { name, email, password });
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ width: "400px" }}>
//         <h2 className="text-center">Register</h2>
//         <form onSubmit={handleRegister}>
//           <div className="mb-3">
//             <label className="form-label">Name</label>
//             <input 
//               type="text" 
//               className="form-control" 
//               value={name} 
//               onChange={(e) => setName(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input 
//               type="email" 
//               className="form-control" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input 
//               type="password" 
//               className="form-control" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//             />
//           </div>
//           <button type="submit" className="btn btn-danger w-100">Register</button>
//         </form>
//         <div className="text-center mt-3">
//           <p>Already have an account? <Link to="/login">Login</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
