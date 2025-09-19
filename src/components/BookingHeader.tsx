import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from 'react-native';
import imagepath from '../constants/imagepath';


type Props = {
  onBack: () => void;
  date: string;
  duration?: string;
  bookingId: string;
};

export const BookingHeader: React.FC<Props> = ({ onBack, date, duration, bookingId }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
    <Image source={imagepath.ic_Union} style={styles.backIcon} />
  </TouchableOpacity>

    <View style={styles.headerCenter}>
      <Text style={styles.headerDate}>
        <Text style={styles.headerDateBold}>{date}</Text> {duration ? `- ${duration}` : ''}
      </Text>
      <Text style={styles.bookingId}>booking {bookingId}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 65 : 24,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    backgroundColor: '#f0f9f6', 
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 15, 
    height: 15,
    resizeMode: 'contain',
    tintColor: '#222', 
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerDate: {
    fontSize: 14,
    color: '#222',
  },
  headerDateBold: {
    fontWeight: 'bold',
  },
  bookingId: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
