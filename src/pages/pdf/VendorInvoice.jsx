import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";
import ReceiptHeader from "./RecieptHeader";
import DM_SANS_NORMAL from "../../assets/DM_Sans/DM_Sans/static/DMSans_24pt-SemiBold.ttf";
import DM_SANS_BOLD from "../../assets/DM_Sans/DM_Sans/static/DMSans_24pt-Bold.ttf";
import DM_SANS_ITALIC from "../../assets/DM_Sans/DM_Sans/static/DMSans-Italic.ttf";
import { formatNumber } from "../../lib/Helper";
const VendorInvoice = ({ data = [], qrcode = "", agent = {} }) => {
  //   const descriptions = data?.map((item) => item?.description);
  //   const joinedDescriptions = descriptions?.join(", ");
  //   const total = data.reduce((it, id) => it + parseFloat(id.cr), 0);
  return (
    <Document>
      <Page size={{ width: 200 }} style={styles.body} wrap={false}>
        <View>
          <ReceiptHeader mda={data?.mda_name || ""} />
          <Text>- - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
          <View style={styles.item2}>
            <View style={{ fontWeight: "bold", fontSize: 12 }}>
              <Text>INVOICE</Text>
            </View>
            <Text>- - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Vendor ID:</Text>
            <View>
              <Text>{data?.vendor_id}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Tranx Date:</Text>
            <View>
              <Text>
                {moment(data?.created_at).format("YYYY-MM-DD hh:mm:ss A")}
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.mr5}>Collection:</Text>
            <View>
              <Text>App-Offline E-Cash</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Location:</Text>
            <View>
              <Text>{data?.vendor_state}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Vendor :</Text>
            <View>
              <Text>{data?.vendor_name}</Text>
            </View>
          </View>

          {data?.vendor_org_phone ? (
            <View style={styles.item}>
              <Text style={styles.mr5}>Phone:</Text>
              <View>
                <Text>{data?.vendor_org_phone}</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.item2}>
          <Text style={{ marginRight: 5, fontSize: 10 }}>
            Transaction Id: {data?.transaction_id}
          </Text>
          <View style={{ fontWeight: "bold", fontSize: 12 }}>
            <Text>{data[0]?.reference_number}</Text>
          </View>
          <View>
            <Text>- - - - - - - - - - - - - - - - - - - - -</Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.mr5}>Payment type:</Text>
            <View>
              <Text>
                {data?.description
                  ? data?.description
                  : `Deposit of N ${formatNumber(data.amount)} to ${
                      data.vendor_name
                    }`}
              </Text>
            </View>
          </View>
          {/* <View style={styles.item}>
            <Text style={styles.mr5}>Economic Code:</Text>
            <View>
              <Text>{data[0]?.mda_code}</Text>
            </View>
          </View> */}
          <View style={styles.item}>
            <Text style={styles.mr5}>Item Code:</Text>
            <View>
              <Text>{data[0]?.item_code}</Text>
            </View>
          </View>
        </View>
        <View style={styles.item2}>
          <Text>- - - - - - - - - - - - - - - - - - - - -</Text>
        </View>
        <View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Deposit Amount:</Text>
            <View>
              <Text>N {formatNumber(data?.amount)}</Text>
            </View>
          </View>
          {/* <View style={styles.item}>
            <Text style={styles.mr5}>Schedule officer:</Text>
            <View>
              <Text>{agent?.name}</Text>
            </View>
          </View> */}
          <View style={styles.item}>
            <Text style={styles.mr5}>Status:</Text>
            <View>
              <Text>
                {data?.status === "success" ? "Payment Successful" : "Pending"}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Period:</Text>
            <View>
              <Text>
                {data?.date_from && data?.date_to
                  ? `${moment(data?.date_from).format(
                      " DD-MM-YYYY"
                    )} - ${moment(data?.date_to).format(" DD-MM-YYYY")}`
                  : moment(data?.transaction_date).format(" DD-MM-YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Image src={qrcode} style={styles.qrcodeImage} /> */}
        </View>
        <View style={styles.goodbyeTextContainer}>
          <Text style={styles.goodbyeText}>Please retain your receipt</Text>
          <Text style={styles.goodbyeText}>Thank You</Text>
        </View>
        <Text style={styles.poweredBy1}>
          Developed by:BRAINSTORM IT SOLUTIONS
        </Text>
      </Page>
    </Document>
  );
};

Font.register({
  family: "DM_SANS",
  fonts: [
    { src: DM_SANS_NORMAL, fontWeight: 700 },
    {
      src: DM_SANS_BOLD,
      fontStyle: "bold",
    },
    {
      src: DM_SANS_ITALIC,
      fontStyle: "italic",
    },
  ],
});

const COL1_WIDTH = 40;
const COL_AMT_WIDTH = 20;
const COLN_WIDTH = (100 - (COL1_WIDTH + COL_AMT_WIDTH)) / 2;

const styles = StyleSheet.create({
  body: {
    paddingVertical: 5,
    fontSize: 8,
    paddingHorizontal: 10,
    fontFamily: "DM_SANS",
  },
  image: {
    height: 40,
    width: 40,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    marginVertical: 3,
  },
  item2: {
    textAlign: "center",
  },
  title: {
    fontSize: 8,
    // textAlign: 'center',
    fontFamily: "DM_SANS",
  },
  subtitle: {
    fontSize: 8,
    fontFamily: "DM_SANS",
  },
  table: {
    display: "table",
    width: "100%",
    marginVertical: 6,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowTotal: {
    flexDDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
  },
  tableColAmtHeader: {
    width: COL_AMT_WIDTH + "%",
  },
  qrcodeContainer: {
    textAlign: "center",
    marginHorizontal: 60,
  },
  qrcodeImage: {
    height: "70px",
    width: "70px",
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
  },
  tableColAmt: {
    width: COL_AMT_WIDTH + "%",
  },
  tableCol: {
    width: COLN_WIDTH + "%",
  },
  tableColTotal: {
    width: 2 * COLN_WIDTH + "%",
  },
  tableCellHeader: {
    // marginRight: 5,
    fontWeight: "bold",
  },
  tableCell: {
    marginVertical: 1,
    // marginRight: 4,
  },
  goodbyeText: {
    fontSize: 8,
    textTransform: "capitalize",
    textAlign: "center",
  },
  goodbyeTextContainer: {
    marginTop: 2,
  },
  docTitle: {
    marginVertical: 6,
    fontSize: 10,
    fontWeight: "bold",
  },
  textRight: { textAlign: "right" },
  textCenter: { textAlign: "center" },
  mr5: { marginRight: 5 },
  fontWeightBold: { fontWeight: "bold" },
  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderTopStyle: "solid",
    paddingTop: 3,
  },
  mt1: {
    marginTop: 2,
  },
  receiptNo: {
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  poweredBy: {
    fontSize: 8,
    marginTop: 6,
    textAlign: "center",
    fontFamily: "DM_SANS",
    fontStyle: "italic",
  },
  poweredBy1: {
    fontSize: 8,
    marginTop: 2,
    textAlign: "center",
    fontFamily: "DM_SANS",
    fontStyle: "italic",
  },
  amtCol: {},
});

export default VendorInvoice;
