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
import {
  FaDownload,
  FaCheckCircle,
  FaReceipt,
  FaUser,
  FaEnvelope,
  FaPills,
  FaDollarSign,
} from "react-icons/fa";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#f8fafc",
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  successBadge: {
    backgroundColor: "#10b981",
    color: "white",
    padding: 6,
    borderRadius: 15,
    textAlign: "center",
    marginBottom: 15,
    fontSize: 12,
    fontWeight: "bold",
  },
  invoiceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  invoiceHeader: {
    backgroundColor: "#7c3aed",
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  transactionId: {
    fontSize: 11,
    color: "#e0e7ff",
  },
  dateInfo: {
    textAlign: "right",
  },
  dateLabel: {
    fontSize: 10,
    color: "#e0e7ff",
  },
  dateValue: {
    fontSize: 11,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  infoCardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 6,
  },
  infoItem: {
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 1,
  },
  infoValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },
  medicineTable: {
    marginBottom: 12,
  },
  tableRow: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  tableCellName: {
    fontSize: 11,
    color: "#374151",
    textAlign: "left",
  },
  totalSection: {
    backgroundColor: "#7c3aed",
    color: "white",
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 3,
  },
  totalSubtitle: {
    fontSize: 11,
    color: "#e0e7ff",
  },
});

const InvoiceDocument = ({ invoice, user }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="https://i.ibb.co/sH3vMxD/medvantage.jpg"
          />
          <Text style={styles.title}>Medvantage</Text>
          <Text style={styles.subtitle}>Professional Healthcare Solutions</Text>
        </View>

        {/* Success Badge */}
        <View style={styles.successBadge}>
          <Text>✓ Payment Successful!</Text>
        </View>

        {/* Main Invoice Card */}
        <View style={styles.invoiceCard}>
          {/* Invoice Header */}
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.transactionId}>
                Transaction ID: {invoice.transactionId}
              </Text>
            </View>
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Generated on</Text>
              <Text style={styles.dateValue}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Customer and Seller Info */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Customer Information</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{user?.displayName}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{invoice.buyerEmail}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Seller Information</Text>
              {invoice.sellerEmails &&
                invoice.sellerEmails.map((seller, index) => (
                  <View key={index} style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Seller {index + 1}</Text>
                    <Text style={styles.infoValue}>{seller}</Text>
                  </View>
                ))}
            </View>
          </View>

          {/* Order Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Details</Text>

            {/* Medicine List */}
            <View style={styles.medicineTable}>
              {invoice.medicineName &&
                invoice.medicineName.map((medicine, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellName}>• {medicine}</Text>
                  </View>
                ))}
            </View>
          </View>

          {/* Total Amount */}
          <View style={styles.totalSection}>
            <Text style={styles.totalTitle}>Total Amount</Text>
            <Text style={styles.totalAmount}>${invoice.price}</Text>
            <Text style={styles.totalSubtitle}>
              Payment completed successfully
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-transparent dark:from-purple-900/10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 dark:bg-purple-800"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20 dark:bg-blue-700"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full blur-3xl opacity-10 dark:from-purple-600 dark:to-blue-600"></div>

      <div className="relative z-10">
        <Helmet>
          <title>Invoice - Medvantage</title>
        </Helmet>

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-30"></div>
              <img
                className="relative w-24 h-24 mx-auto rounded-full border-4 border-white shadow-2xl"
                src="https://i.ibb.co/sH3vMxD/medvantage.jpg"
                alt="Medvantage Logo"
              />
            </div>
            <h1 className="text-5xl font-bold mt-6 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              <span className="text-purple-600">Med</span>vantage
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              Professional Healthcare Solutions
            </p>
          </div>

          {/* Success Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
              <FaCheckCircle className="text-xl animate-pulse" />
              <span className="font-semibold">Payment Successful!</span>
            </div>
          </div>

          {/* Main Invoice Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <FaReceipt className="text-2xl" />
                        INVOICE
                      </h2>
                      <p className="text-purple-100 text-lg">
                        Transaction ID: {transactionId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-100 text-sm">Generated on</p>
                      <p className="font-semibold">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Content */}
              <div className="p-8">
                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <FaUser className="text-purple-600" />
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Name
                        </p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {user?.displayName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Email
                        </p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {invoice.buyerEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <FaEnvelope className="text-blue-600" />
                      Seller Information
                    </h3>
                    <div className="space-y-2">
                      {invoice.sellerEmails &&
                        invoice.sellerEmails.map((seller, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="font-semibold text-gray-800 dark:text-white text-sm">
                              {seller}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaPills className="text-purple-600" />
                    Order Details
                  </h3>

                  {/* Medicine List */}
                  <div className="space-y-4">
                    {invoice.medicineName &&
                      invoice.medicineName.map((medicine, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="font-semibold text-gray-800 dark:text-white">
                              {medicine}
                            </span>
                          </div>
                          <div className="text-purple-600 font-bold">✓</div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl text-white text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <FaDollarSign className="text-2xl" />
                    <h3 className="text-2xl font-bold">Total Amount</h3>
                  </div>
                  <div className="text-4xl font-bold">${invoice.price}</div>
                  <p className="text-purple-100 mt-2">
                    Payment completed successfully
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center mt-8">
            <PDFDownloadLink
              document={<InvoiceDocument invoice={invoice} user={user} />}
              fileName={`invoice_${transactionId}.pdf`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {({ loading }) => (
                <>
                  <FaDownload className="text-xl" />
                  {loading ? "Generating PDF..." : "Download Invoice PDF"}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
