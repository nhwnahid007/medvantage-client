import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Helmet } from "react-helmet-async";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    marginBottom: 20,
    alignSelf: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
  },
});


const InvoiceDocument = ({ invoice, user }) => (
  <Document>
    <Page style={styles.page}>
      <Image
        style={styles.image}
        src="https://i.ibb.co/sH3vMxD/medvantage.jpg"
      />
      <Text style={styles.header}>Medvantage</Text>
      <View style={styles.section}>
        <Text>Invoice Page: {user?.displayName}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Total Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{invoice.price}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Medicine Name</Text>
          </View>
          <View style={styles.tableCol}>
            {invoice.medicineName &&
              invoice.medicineName.map((medicine, index) => (
                <Text key={index} style={styles.tableCell}>
                  {medicine}
                </Text>
              ))}
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Buyer Email</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{invoice.buyerEmail}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Seller Email(s)</Text>
          </View>
          <View style={styles.tableCol}>
            {invoice.sellerEmails &&
              invoice.sellerEmails.map((seller, index) => (
                <Text key={index} style={styles.tableCell}>
                  {seller}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);


const Invoice = () => {
  const { transactionId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  const { data: invoice = {} } = useQuery({
    queryKey: ["payments", transactionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/invoice/${transactionId}`);
      return res.data;
    },
  });

  return (
    <div className="bg-gray-100 w-4/6 mx-auto min-h-screen flex flex-col justify-center items-center">
      <Helmet>
        <title>Invoice</title>
      </Helmet>
      <div id="invoice" className="w-full">
        <img
          className="w-20 mx-auto rounded-full"
          src="https://i.ibb.co/sH3vMxD/medvantage.jpg"
          alt=""
        />
        <p className="text-4xl font-bold text-center my-5"><span className="font-bold text-[#7600dc]">Med</span>vantage</p>
        <div className="bg-white shadow-md rounded px-8 py-6 overflow-x-auto ">
          <p className="text-3xl font-bold text-center mb-4 text-gray-600">
            Invoice Page: {user?.displayName}
          </p>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Total Price</td>
                <td className="border px-4 py-2">{invoice.price}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Medicine Name
                </td>
                <td className="border px-4 py-2">
                  {invoice.medicineName &&
                    invoice.medicineName.map((medicine, index) => (
                      <p key={index} className="text-gray-900">
                        {medicine}
                      </p>
                    ))}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Buyer Email</td>
                <td className="border px-4 py-2">{invoice.buyerEmail}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Seller Email(s)
                </td>
                <td className="border px-4 py-2">
                  {invoice.sellerEmails &&
                    invoice.sellerEmails.map((seller, index) => (
                      <p key={index} className="text-gray-900">
                        {seller}
                      </p>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <PDFDownloadLink
        document={<InvoiceDocument invoice={invoice} user={user} />}
        fileName={`invoice_${transactionId}.pdf`}
        className="bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice;
