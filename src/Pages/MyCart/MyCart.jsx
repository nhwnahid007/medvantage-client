import { TbCreditCardPay } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

import useCart from "../../Hooks/useCart";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = UseAxiosSecure();

  const totalPrice = cart.reduce((total, item) => {
    const discountedPrice = parseFloat(item.price) * (1 - item.discount / 100);
    return total + discountedPrice * item.quantity;
  }, 0);

  const updateCartItem = async (item) => {
    try {
      await axiosSecure.put(`/carts/${item._id}`, item);
      refetch();
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  const handleIncreaseQuantity = async (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    await updateCartItem(updatedItem);
  };

  const handleDecreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      await updateCartItem(updatedItem);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axiosSecure.delete(`/carts/${itemId}`);
      refetch();
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    if (!cart.length) {
      toast.info("Cart is already empty");
      return;
    }
    try {
      await axiosSecure.delete(`/carts`, { params: { email: cart[0].email } });
      refetch();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      <Helmet>
        <title>My Cart</title>
      </Helmet>

      <SectionHeading heading={`My Cart: ${cart.length}`} />

      {cart.length === 0 ? (
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            🛒 Your cart is empty!
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added any items yet.
          </p>
          <Link to="/shop" className="btn bg-purple-600 text-white hover:bg-purple-700">
            Browse Medicines
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6 bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium">
              Total: <span className="text-purple-700 font-bold">${totalPrice.toFixed(2)}</span>
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/payment" className="btn bg-green-600 text-white hover:bg-green-700">
                <TbCreditCardPay className="text-xl" />
                Pay Now
              </Link>
              <button
                onClick={handleClearCart}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                <MdDeleteForever className="text-xl" />
                Clear Cart
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table w-full">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const discountedPrice = parseFloat(item.price) * (1 - item.discount / 100);
                  const total = discountedPrice * item.quantity;
                  return (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.generic_name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          ${parseFloat(item.price).toFixed(2)}{" "}
                          <span className="text-xs text-green-600">
                            (-{item.discount}%)
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="btn btn-sm btn-outline"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="btn btn-sm btn-outline"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${total.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-600"
                        >
                          <MdDeleteForever className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
