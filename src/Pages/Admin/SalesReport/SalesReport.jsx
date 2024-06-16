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
  const [filteredPayment, setFilteredPayment] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (payment && payment.length > 0) {
      setFilteredPayment(payment);
    }
  }, [payment]);

  const handleFilter = () => {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const filteredData = payment.filter((paymentData) => {
      const paymentDateParts = paymentData.date.split('/');
      const paymentDate = new Date(
        parseInt(paymentDateParts[2]),  // Year
        parseInt(paymentDateParts[0]) - 1,  // Month (0-indexed)
        parseInt(paymentDateParts[1])  // Day
      );
      return paymentDate >= parsedStartDate && paymentDate <= parsedEndDate;
    });
    setFilteredPayment(filteredData);
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: '#f2f2f2',
      padding: 5,
      textAlign: 'center',
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
      textAlign: 'center',
    },
    tableColPrice: {
      width: "20%", // Adjusted width for price column
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
      textAlign: 'center',
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    tableCell: {
      fontSize: 10,
    }
  });

  return (
    <div>
      <Helmet>
        <title>Sales Report</title>
      </Helmet>
      <SectionHeading heading={"Sales Report"}></SectionHeading>

      <div className="flex flex-col lg:flex-row">
        <div className="flex items-center">
          <span className="mx-3"> Start Date </span> 
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div className="flex items-center">
          <span className="mx-3"> End Date </span> 
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
        <button className="btn w-20 bg-purple-600 text-white" onClick={handleFilter}>Filter</button>
      </div>

      <div className="overflow-x-auto my-10">
        <table className="table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Seller Email</th>
              <th>Buyer Email</th>
              <th>Date</th>
              <th>Payment status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayment.map((paymentData, index) => (
              <tr key={index}>
                <td>{paymentData.medicineName && paymentData.medicineName.length > 0 ? paymentData.medicineName[0] : ''}</td>
                <td>{paymentData.sellerEmails && paymentData.sellerEmails.length > 0 ? paymentData.sellerEmails[0] : ''}</td>
                <td>{paymentData.buyerEmail}</td>
                <td>{paymentData.date}</td>
                <td>{paymentData.status}</td>
                <td>{paymentData.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-10">
        <PDFDownloadLink
          className="bg-purple-700 text-white font-bold py-2 px-4 rounded mt-20"
          document={
            <Document>
              <Page style={styles.page}>
                <Text style={styles.title}>Sales Report</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Medicine Name</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Seller Email</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Buyer Email</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Date</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Payment Status</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Total Price</Text>
                    </View>
                  </View>
                  {filteredPayment.map((paymentData, index) => (
                    <View key={index} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.medicineName && paymentData.medicineName.length > 0 ? paymentData.medicineName[0] : ''}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.sellerEmails && paymentData.sellerEmails.length > 0 ? paymentData.sellerEmails[0] : ''}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.buyerEmail}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.date}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.status}</Text>
                      </View>
                      <View style={styles.tableColPrice}>
                        <Text style={styles.tableCell}>{paymentData.price}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Page>
            </Document>
          }
          fileName="sales_report.pdf"
        >
          {({ loading }) =>
            loading ? 'Preparing PDF...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default SalesReport;
