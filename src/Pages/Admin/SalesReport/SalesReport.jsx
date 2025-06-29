import usePayment from "../../../Hooks/usePayment";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
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
      const [month, day, year] = paymentData.date.split('/');
      const paymentDate = new Date(year, month - 1, day);
      return paymentDate >= startDate && paymentDate <= endDate;
    });
    setFilteredPayment(filteredData);
  };

  const styles = StyleSheet.create({
    page: { padding: 30 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      borderRightWidth: 0,
      borderBottomWidth: 0
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
      textAlign: "center"
    },
    tableCol: {
      width: "16.66%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
      textAlign: "center"
    },
    tableCellHeader: { fontSize: 12, fontWeight: 'bold' },
    tableCell: { fontSize: 10 }
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Sales Report</title>
      </Helmet>

      <SectionHeading heading="Sales Report" />

      <div className="flex flex-col sm:flex-row items-center gap-4 my-6">
        <div className="flex items-center gap-2">
          <span>Start:</span>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="input input-bordered"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>End:</span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
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

      <div className="overflow-x-auto mb-10">
        {filteredPayment.length === 0 ? (
          <p className="text-center text-gray-500">No data found in selected range.</p>
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
                  <td>{data.medicineName?.[0] || ''}</td>
                  <td>{data.sellerEmails?.[0] || ''}</td>
                  <td>{data.buyerEmail}</td>
                  <td>{data.date}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      data.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
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
                      {["Medicine", "Seller", "Buyer", "Date", "Status", "Price"].map((title, idx) => (
                        <View key={idx} style={styles.tableColHeader}>
                          <Text style={styles.tableCellHeader}>{title}</Text>
                        </View>
                      ))}
                    </View>
                    {filteredPayment.map((p, i) => (
                      <View key={i} style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{p.medicineName?.[0]}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{p.sellerEmails?.[0]}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{p.buyerEmail}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{p.date}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{p.status}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>${p.price}</Text></View>
                      </View>
                    ))}
                  </View>
                </Page>
              </Document>
            }
            fileName="sales_report.pdf"
            className="inline-block bg-purple-700 text-white font-semibold py-2 px-6 rounded hover:bg-purple-800 transition"
          >
            {({ loading }) => loading ? 'Preparing PDF...' : 'Download PDF'}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
