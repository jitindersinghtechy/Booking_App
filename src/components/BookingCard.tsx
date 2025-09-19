import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Bookingcard } from "../types/booking"

type Props = { booking: Bookingcard };

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const dayShort = date.toLocaleString("en-US", { weekday: "short" });
  return `${day} ${monthShort}, ${hour12}:${minute.toString().padStart(2, "0")} ${ampm} (${dayShort})`;
};

export const BookingCard: React.FC<Props> = ({ booking }) => {
  const navigation = useNavigation();

  const transformedBooking = {
    id: "generated-id",
    date: formatDateTime(booking.date),
    status: "OPEN",
    price: Number(booking.price.replace(/[^\d]/g, "")),
    title: booking.title,
    passengers: 1,
    luggage: 1,
    instructions: "Please review all details before accepting.",
    details: [
      { label: "From", value: booking.from, checkboxKey: "from" },
      { label: "To", value: booking.to, checkboxKey: "to" },
      { label: "Price", value: booking.price, checkboxKey: "price" },
    ],

    // ✅ Pass extra fields if they exist
    from: booking.from,
    to: booking.to,
    stop: booking.stop ?? "Some Stop",
    flight: booking.flight ?? "QF641 Domestic",

    babySeat: {
      count: 1,
      ages: "2 yrs",
      checkboxKey: "babySeat",
    },

    customer: { name: "John Doe", checkboxKey: "customer" },
    comment: { text: "Handle with care", checkboxKey: "comment" },
    singboardFilename: "boarding-pass.pdf",
  };

  const handlePress = () => {
    navigation.navigate('BookingDetail', { booking: transformedBooking });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={{ marginBottom: 5 }}>
        {booking.tags.map((tag, index) => (
          <View key={index} style={[styles.tagBadge, { backgroundColor: tag.color }]}>
            <Text style={styles.tagText}>{tag.label.toUpperCase()}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tagsRow}>
        {booking.label.map((tag, index) => (
          <View key={index} style={[styles.taglabel, { backgroundColor: tag.color }]}>
            <Text style={styles.tagText}>{tag.label.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.dateText}>{formatDateTime(booking.date)}</Text>
        <Text style={styles.price}>{booking.price}</Text>
      </View>

      <View style={styles.routeContainer}>
        <Text style={styles.routeText}>
          From: <Text style={styles.routePlace}>{booking.from}</Text>
        </Text>
        <Text style={styles.routeText}>
          To: <Text style={styles.routePlace}>{booking.to}</Text>
        </Text>
      </View>
      {booking.confirmTextBold && <View
        style={[
          styles.confirmBox,
          booking.highlight ? styles.confirmBoxHighlight : styles.confirmBoxNormal,
        ]}
      >
        <Text style={styles.confirmText}>
          <Text style={{ fontWeight: "700" }}>{booking.confirmTextBold} </Text>
          {booking.confirmTime}
        </Text>
      </View>}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  tagsRow: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
  },

  tagBadge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 28,
    minWidth: 325,
  },
  taglabel: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 5,
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    minHeight: 28,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  dateText: { fontSize: 15, fontWeight: "700", color: "#000" },
  price: { fontSize: 15, fontWeight: "700", color: "#000" },
  routeContainer: { marginTop: 2 },
  routeText: { fontSize: 16, color: "#444", marginBottom: 4 },
  routePlace: { color: "#6b7280" },
  confirmBox: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  confirmBoxNormal: {
    backgroundColor: "#f0f0f7",
  },
  confirmBoxHighlight: {
    backgroundColor: "#ffdb5c",
  },
  confirmText: {
    fontSize: 18,
    color: "#000",
    textAlign: "auto"
  },
});
