import usePayment from "../../../Hooks/usePayment";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer'; 

import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";

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

  return (
    <div>
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

      <div>
        <PDFDownloadLink
          className="bg-purple-700 text-white font-bold py-2 px-4 rounded mt-20"
          document={
            <Document>
              <Page>
                <Text>Sales Report</Text>
                <View>
                  <View style={{ flexDirection: 'row', borderBottom: '1 solid #000' }}>
                    <Text style={{ width: '20%', textAlign: 'center' }}>Medicine Name</Text>
                    <Text style={{ width: '20%', textAlign: 'center' }}>Seller Email</Text>
                    <Text style={{ width: '20%', textAlign: 'center' }}>Buyer Email</Text>
                    <Text style={{ width: '20%', textAlign: 'center' }}>Date</Text>
                    <Text style={{ width: '10%', textAlign: 'center' }}>Payment Status</Text>
                    <Text style={{ width: '10%', textAlign: 'center' }}>Total Price</Text>
                  </View>
                  {filteredPayment.map((paymentData, index) => (
                    <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000' }}>
                      <Text style={{ width: '20%', textAlign: 'center' }}>{paymentData.medicineName && paymentData.medicineName.length > 0 ? paymentData.medicineName[0] : ''}</Text>
                      <Text style={{ width: '20%', textAlign: 'center' }}>{paymentData.sellerEmails && paymentData.sellerEmails.length > 0 ? paymentData.sellerEmails[0] : ''}</Text>
                      <Text style={{ width: '20%', textAlign: 'center' }}>{paymentData.buyerEmail}</Text>
                      <Text style={{ width: '20%', textAlign: 'center' }}>{paymentData.date}</Text>
                      <Text style={{ width: '10%', textAlign: 'center' }}>{paymentData.status}</Text>
                      <Text style={{ width: '10%', textAlign: 'center' }}>{paymentData.price}</Text>
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
