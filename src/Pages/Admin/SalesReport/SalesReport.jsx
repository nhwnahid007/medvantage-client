import usePayment from "../../../Hooks/usePayment";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { Helmet } from "react-helmet-async";

const SalesReport = () => {
  const [payment, loading] = usePayment();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredPayment, setFilteredPayment] = useState([]);

  useEffect(() => {
    if (payment?.length) {
      setFilteredPayment(payment);
    }
  }, [payment]);

  const handleFilter = () => {
    const filteredData = payment.filter((paymentData) => {
      const [month, day, year] = paymentData.date.split("/");
      const paymentDate = new Date(year, month - 1, day);
      return paymentDate >= startDate && paymentDate <= endDate;
    });
    setFilteredPayment(filteredData);
  };

  const styles = StyleSheet.create({
    page: { padding: 30 },
    title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: { flexDirection: "row" },
    tableColHeader: {
      width: "16.66%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#f2f2f2",
      padding: 5,
      textAlign: "center",
    },
    tableCol: {
      width: "16.66%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
      textAlign: "center",
    },
    tableCellHeader: { fontSize: 12, fontWeight: "bold" },
    tableCell: { fontSize: 10 },
  });

  if (loading) return <LoadingSpinner />;

  // Calculate statistics
  const totalSales = filteredPayment.reduce(
    (sum, payment) => sum + (parseFloat(payment.price) || 0),
    0
  );
  const paidSales = filteredPayment
    .filter((p) => p.status === "paid")
    .reduce((sum, payment) => sum + (parseFloat(payment.price) || 0), 0);
  const pendingSales = filteredPayment
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + (parseFloat(payment.price) || 0), 0);

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Sales Report</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading="Sales Report" />

        {/* Responsive Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {filteredPayment.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-3xl font-bold text-green-600">
                  ${totalSales.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Sales</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${paidSales.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Sales
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  ${pendingSales.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 my-6">
          <div className="flex items-center gap-2">
            <span>Start:</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>End:</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="input input-bordered"
            />
          </div>
          <button
            className="btn bg-purple-600 text-white hover:bg-purple-700 transition"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        {filteredPayment.length === 0 ? (
          <p className="text-center text-gray-500">
            No data found in selected range.
          </p>
        ) : (
          <table className="table text-sm w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th>Medicine Name</th>
                <th>Seller Email</th>
                <th>Buyer Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayment.map((data, index) => (
                <tr key={index}>
                  <td>{data.medicineName?.[0] || ""}</td>
                  <td>{data.sellerEmails?.[0] || ""}</td>
                  <td>{data.buyerEmail}</td>
                  <td>{data.date}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        data.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td>${data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredPayment.length > 0 && (
        <div className="text-center">
          <PDFDownloadLink
            document={
              <Document>
                <Page style={styles.page}>
                  <Text style={styles.title}>Sales Report</Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      {[
                        "Medicine",
                        "Seller",
                        "Buyer",
                        "Date",
                        "Status",
                        "Price",
                      ].map((title, idx) => (
                        <View key={idx} style={styles.tableColHeader}>
                          <Text style={styles.tableCellHeader}>{title}</Text>
                        </View>
                      ))}
                    </View>
                    {filteredPayment.map((p, i) => (
                      <View key={i} style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {p.medicineName?.[0]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {p.sellerEmails?.[0]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{p.buyerEmail}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{p.date}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{p.status}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>${p.price}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Page>
              </Document>
            }
            fileName="sales_report.pdf"
            className="inline-block bg-purple-700 text-white font-semibold py-2 px-6 rounded hover:bg-purple-800 transition"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
