import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

export default function ReceiptHeader({ mda = '' }) {
    return (
        <View style={styles.headerContainer}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* <Image cache={false} src={Logo} style={styles.image} alt="logo" />
                <Image cache={false} src={Logo1} style={styles.image} alt="logo" /> */}
            </View>
            <Text style={styles.title}>KEKE APP </Text>
            {/* <Text style={styles.title}>MANAGEMENT AND ASSURANCE</Text>
            <Text style={styles.title}>SYSTEM. (KIRMAS)</Text> */}
            <Text style={styles.title}>{mda.toUpperCase()}</Text>
            {/* <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottom: 1,
          borderBottomColor: "#000000",
        }}
      ></View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
    },
    headerContainer: {
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
    },
    title: {
        fontSize: 11,
        textAlign: 'center',
        fontFamily: "DM_SANS",
        marginVertical: 2,
    },
    title1: {
        fontSize: 12,
        alignItems: "left",
        textAlign: 'center',
        fontFamily: "DM_SANS",
    },
    subtitle: {
        fontSize: 10,
        fontFamily: "DM_SANS",
    },
});