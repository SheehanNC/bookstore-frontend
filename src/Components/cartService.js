// import React, { useState } from "react";

// const QuantityModal = ({ book, onAddToCart, onClose }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (e) => {
//     setQuantity(parseInt(e.target.value));
//   };

//   const handleSubmit = () => {
//     onAddToCart(book, quantity);
//   };

//   return (
//     <div className="modal" tabIndex="-1" role="dialog">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{`Add ${book.title} to Cart`}</h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <label htmlFor="quantity">Quantity:</label>
//             <input
//               type="number"
//               id="quantity"
//               min="1"
//               value={quantity}
//               onChange={handleQuantityChange}
//             />
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-primary" onClick={handleSubmit}>
//               Add to Cart
//             </button>
//             <button type="button" className="btn btn-secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuantityModal;
