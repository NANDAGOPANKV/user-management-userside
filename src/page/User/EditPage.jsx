// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// export const EditPage = () => {
//   const userData = useSelector((state) => state?.user);
//   const [inputs, setInputs] = useState({
//     name: "",
//     email: "",
//     profileImage: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setInputs((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(inputs);
//     console.log(userData);
//   };

//   return (
//     <div className="font-mono capitalize mb-8 text-center w-[95%] sm:w-[55%] mt-[5%] mx-auto bg-white text-white flex flex-col space-y-4 rounded-xl shadow-2xl">
//       <div>
//         <p className="text-4xl font-bold text-gray-700 p-4">Update</p>
//       </div>
//       <form
//         className="flex flex-col space-y-4 text-black"
//         onSubmit={handleSubmit}
//       >

//         <input
//           type="file"
//           defaultValue={inputs.profileImage}
//           onChange={handleChange}
//           name="image"
//           placeholder="image..."
//           className="mx-3 p-4 rounded-lg border-2"
//         />

//         <div className="w-full h-full p-2 sm:p-4">
//           <button
//             type="submit"
//             className="text-black bg-yellow-100 hover:bg-yellow-500 hover:text-white uppercase font-bold text-2xl transition duration-500 ease-in-out rounded-xl px-1 py-3 w-[30%] text-center"
//           >
//             update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
