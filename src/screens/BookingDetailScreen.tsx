import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

import { useRoute, useNavigation } from '@react-navigation/native';
import Icons from '../constants/imagepath';  // and add carChildSeatIcon there
import { Bookings } from '../types/booking';
import { BookingHeader } from '../components/BookingHeader';
import { DetailRow } from '../components/DetailRow.tsx';
import { BookingActionButtons } from '../components/BookingActionButtons.tsx';

const BookingDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params as { booking: Bookings };

  useEffect(() => {
    console.log(booking, 'booking');
  }, [booking]);

  const checkboxKeys: string[] = [];

  if (booking.time) checkboxKeys.push('time');
  if (booking.from) checkboxKeys.push('from');
  if (booking.stop) checkboxKeys.push('stop');
  if (booking.to) checkboxKeys.push('to');
  if (booking.flight) checkboxKeys.push('flight');

  booking.details.forEach(d => checkboxKeys.push(d.checkboxKey));
  if (booking.babySeat) checkboxKeys.push(booking.babySeat.checkboxKey);
  if (booking.customer) checkboxKeys.push(booking.customer.checkboxKey);
  if (booking.comment) checkboxKeys.push(booking.comment.checkboxKey);

  const initialCheckboxState = checkboxKeys.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>(initialCheckboxState);

  const allChecked = Object.values(checkboxes).every(Boolean);

  const toggleCheckbox = (key: string) => {
    setCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openPDF = () => {
    if (booking.onSingboardPress) {
      booking.onSingboardPress();
    } else {
      Alert.alert('Open PDF', 'Open PDF file action triggered');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const infoMessage =
    booking.status === 'OPEN'
      ? 'If you agree to accept this booking please mark checkboxes as read info'
      : 'Please review all details before accepting.';

  const headerDateString = booking.dayOfWeek
    ? `${booking.date} ${booking.dayOfWeek}`
    : booking.date;

  return (
    <View style={styles.screen}>

      <BookingHeader
        onBack={handleBack}
        date={booking.date}
        duration={booking.duration}
        bookingId={booking.id}
      />

      <View
        style={[
          styles.statusBadge,
          booking.status === 'OPEN' ? styles.statusOpen : styles.statusOther,
        ]}
      >
        <Text style={styles.statusText}>{booking.status}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.priceValue}>
          {booking.currencySymbol ?? '$'}
          {booking.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>


      <Text style={styles.title}>{booking.title}</Text>


      <View style={styles.iconsRow}>
        <View style={styles.iconWithText}>

          <Image
            source={Icons.ic_profile}
            style={{ width: 15, height: 15, tintColor: '#4CAF50' }}
            resizeMode="contain"
          />
          <Text style={styles.iconText}>{booking.passengers}</Text>
        </View>
        <View style={styles.iconWithText}>
          <Image
            source={Icons.ic_suitcase}
            style={{ width: 15, height: 15, tintColor: '#4CAF50' }}
            resizeMode="contain"
          />
          <Text style={styles.iconText}>{booking.luggage}</Text>
        </View>
      </View>

      <View style={styles.infoMessageBox}>
        <Text style={styles.infoMessageText}>{infoMessage}</Text>
      </View>

      <ScrollView
        style={styles.detailsContainer}
        contentContainerStyle={styles.detailsContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {booking.time && (
          <DetailRow
            label="Time"
            value={booking.time}
            isChecked={checkboxes['time']}
            onToggle={() => toggleCheckbox('time')} checkboxKey={''} checkboxValue={false} />
        )}

        {booking.from && (
          <DetailRow
            label="From"
            value={booking.from}
            isChecked={checkboxes['from']}
            onToggle={() => toggleCheckbox('from')} checkboxKey={''} checkboxValue={false} />
        )}

        {/* Stop */}
        {booking.stop && (
          <DetailRow
            label="Stop"
            value={booking.stop}
            isChecked={checkboxes['stop']}
            onToggle={() => toggleCheckbox('stop')} checkboxKey={''} checkboxValue={false} />
        )}

        {/* To */}
        {booking.to && (
          <DetailRow
            label="To"
            value={booking.to}
            isChecked={checkboxes['to']}
            onToggle={() => toggleCheckbox('to')} checkboxKey={''} checkboxValue={false} />
        )}

        {booking.flight && (
          <DetailRow
            label="Flight"
            value={booking.flight}
            isChecked={checkboxes['flight']}
            onToggle={() => toggleCheckbox('flight')} checkboxKey={''} checkboxValue={false} />
        )}

        {booking.babySeat && (
          <DetailRow
            label="Babyseat"
            value={booking.babySeat.ages}
            checkboxKey={booking.babySeat.checkboxKey}
            checkboxValue={checkboxes[booking.babySeat.checkboxKey]}
            onToggle={toggleCheckbox}
            icon={Icons.ic_Vector}
            showCount={booking.babySeat.count}
            isBabySeat isChecked={false} />
        )}

        {booking.customer && (
          <DetailRow
            label="Customer"
            value={booking.customer.name}
            isChecked={checkboxes['booking.customer.name']}
            onToggle={() => toggleCheckbox('booking.customer.name')} checkboxKey={''} checkboxValue={false} />

        )}

        {booking.comment && (
          <DetailRow
            label="Comment"
            value={booking.comment.checkboxKey}
            isChecked={checkboxes['booking.comment.checkboxKey']}
            onToggle={() => toggleCheckbox('booking.comment.checkboxKey')} checkboxKey={''} checkboxValue={false} />
        )}

        {booking.singboardFilename && (
          <View style={styles.singboardRow}>
            <View style={styles.detailTextContainer}>

              <Text style={styles.singboardLabel}>Singboard</Text>
              <Text style={styles.pdfLink}>{booking.singboardFilename}</Text>
            </View>

            <TouchableOpacity onPress={openPDF} style={styles.pdfLinkContainer} activeOpacity={0.7}>
              <Image
                source={Icons.ic_Icon}
                style={{ width: 20, height: 20, tintColor: '#000000' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BookingActionButtons
        allChecked={allChecked}
        onAccept={() => console.log('Accept')}
        onReject={() => console.log('Reject')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    paddingRight: 12,
    paddingVertical: 4,
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
  statusBadge: {
    marginHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 7,
  },
  statusOpen: {
    backgroundColor: '#4CAF50',
  },
  statusOther: {
    backgroundColor: '#888',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  priceRow: {
    marginTop: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
  },
  priceValue: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
  title: {
    marginHorizontal: 16,
    marginTop: 3,
    fontSize: 16,
    fontWeight: '300',
    color: '#222',
  },
  iconsRow: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  iconText: {
    color: '#000000',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 12,
  },
  instructionBox: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#E9F7EF',
    borderRadius: 8,
    padding: 12,
  },
  instructionText: {
    fontWeight: '600',
    color: '#2E7D32',
    fontSize: 14,
  },
  infoMessageBox: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 10 }, // shadow offset
    shadowOpacity: 0.1, // shadow opacity
    shadowRadius: 5, // shadow blur radius
    elevation: 5, // Android shadow
  },
  infoMessageText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center'
  },
  detailsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    maxHeight: 450,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  detailsContentContainer: {
    paddingVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
    fontWeight: '400',
  },
  detailValue: {
    fontSize: 15,
    color: '#222',
  },
  detailValuebabyset: {
    fontSize: 15,
    color: '#222',
    marginLeft: 30,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    top: 5,
    borderColor: '#999999',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'transparent',
  },
  babySeatLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabelWithCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '600',
  },
  babySeatCount: {
    fontWeight: '700',
    color: '#222',
  },
  singboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  singboardLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  pdfLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfLink: {
    color: '#1E88E5',
    textDecorationLine: 'underline',
    marginRight: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomButtons: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  bottomButton: {
    flex: 1,
    // borderRadius: 24,
    paddingVertical: 14,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  noThanksButton: {
    backgroundColor: '#000',
  },
  noThanksText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  acceptButtonActive: {
    backgroundColor: '#4CAF50',
  },
  acceptButtonDisabled: {
    backgroundColor: '#ccc',
  },
  acceptText: {
    fontWeight: '700',
    fontSize: 16,
  },
  acceptTextActive: {
    color: '#fff',
  },
  acceptTextDisabled: {
    color: '#666',
  },
});

export default BookingDetailScreen;