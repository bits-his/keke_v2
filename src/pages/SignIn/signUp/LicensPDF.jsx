import {
  Document,
  Font,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
  Link,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import DM_SANS_NORMAL from "../../../assets/DM_Sans/DM_Sans/static/DMSans_24pt-SemiBold.ttf";
import DM_SANS_BOLD from "../../../assets/DM_Sans/DM_Sans/static/DMSans_24pt-Bold.ttf";
import DM_SANS_ITALIC from "../../../assets/DM_Sans/DM_Sans/static/DMSans-Italic.ttf";
import ahmad from "../../../Images/download.png";
import coat from "../../../Images/th.jpeg";
import moment from "moment";
import QRCode from "qrcode";

const styles = StyleSheet.create({
  body: {
    width: "100%",
    padding: 20,
    paddingLeft: 70,
    paddingRight: 50,
    fontSize: 12,
    border: 3,
    borderRadius: 10,
  },
  header: {
    fontFamily: "DM_SANS",
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase",
    marginBottom: 20,
    textAlign: "center",
  },
  rotatedText: {
    transform: "rotate(-90deg)",
    writingMode: "vertical-lr",
    marginLeft: -60,
    marginTop: 75,
    fontSize: 20,
    fontFamily: "DM_SANS",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  section: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "bold",
    width: 160,
  },
  value: {
    marginLeft: 10,
    flex: 1,
  },
  qrSection: {
    alignItems: "center",
    marginTop: 30,
  },
  qrCodeContainer: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
  qrLink: {
    color: "blue",
    textDecoration: "underline",
    fontSize: 10,
    marginTop: 10,
  },
});

export const LicensPDF = ({ data = {} }) => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(
          canvas,
          `https://keke-verify.barinstorm.ng/vehicles?query_type=verify&plate_no=${data?.plate_no}`
        );
        setQr(canvas.toDataURL());
      } catch (err) {
        console.error("Failed to generate QR code:", err);
      }
    };
    generateQRCode();
  }, [data?.plate_no]);

  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={{ padding: 60 }}>
          <View style={styles.body}>
            {/* Header */}
            <Text style={styles.header}>KANO STATE VEHICLE LICENSE</Text>

            {/* Main Content */}
            <View style={{ width: "100%", flexDirection: "row" }}>
              {/* Rotated Date */}
              <View>
                <Text style={styles.rotatedText}>
                  {moment(data?.create_at).format("MMMM YYYY")}
                </Text>
              </View>

              {/* Vehicle Info */}
              <View style={{ marginLeft: 40, flex: 1 }}>
                {[
                  ["PIN", data?.pin],
                  ["Reg. Number", data?.lg_reg_no],
                  ["Engine Number", data?.engine_no],
                  ["Chassis Number", data?.chasis_no],
                  ["Vehicle Make", data?.vehicle_make],
                  ["Vehicle Model", data?.vehicle_model],
                  ["Color", data?.color],
                  ["Engine Capacity", data?.engine_capacity],
                  [
                    "Transaction Date",
                    moment(data?.create_at).format("D MMMM, YYYY"),
                  ],
                  ["Date Issued", moment().format("YYYY/MM/DD")],
                  [
                    "Expiry Date",
                    moment(data?.expiry_date).format("YYYY/MM/DD"),
                  ],
                ].map(([label, value], index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.label}>{label}:</Text>
                    <Text style={styles.value}>{value || "N/A"}</Text>
                  </View>
                ))}
              </View>

              {/* QR Code Section */}
              <View style={styles.qrSection}>
                {qr && <Image style={styles.qrCodeContainer} src={qr} />}
                <Text>Verify your Vehicle at</Text>
                <Link
                  src={`https://keke-verify.brainstorm.ng/verify/${data?.plate_no}`}
                  style={styles.qrLink}
                >
                  {`https://keke-verify.brainstorm.ng/verify/${data?.plate_no}`}
                </Link>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};