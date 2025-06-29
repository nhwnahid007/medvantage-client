import { FaEye } from "react-icons/fa";

const MedicineDetailsModal = ({ medicine }) => {
  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() => document.getElementById(`${medicine._id}`).showModal()}
      >
        <FaEye />
      </button>

      {/* Modal */}
      <dialog id={medicine._id} className="modal">
        <div className="modal-box max-w-3xl p-6 relative rounded-xl shadow-lg bg-white">
          {/* Close icon top-right */}
          <button
            onClick={() => document.getElementById(medicine._id).close()}
            className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-gray-200"
            aria-label="Close"
          >
            ✕
          </button>

          <h3 className="text-2xl font-semibold mb-6 border-b pb-3">
            {medicine.name}
          </h3>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div className="flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm w-48 h-48">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-4 text-gray-800">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Price:</span>
                <span className="text-lg font-bold text-green-700">
                  ${parseFloat(medicine.unit_price).toFixed(2)}
                </span>
              </div>

              {medicine.discount > 0 && (
                <div className="flex justify-between items-center text-purple-700 font-semibold">
                  <span>Discount:</span>
                  <span>{medicine.discount}% Off</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="font-semibold">Generic Name:</span>
                <span>{medicine.generic_name}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Company:</span>
                <span>{medicine.company}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Mg:</span>
                <span>{medicine.mg} mg</span>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Description:</h4>
                <p className="text-gray-600 leading-relaxed">
                  {medicine.short_description}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn bg-[#7600dc] text-white hover:bg-[#5a009e] transition-colors duration-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MedicineDetailsModal;
