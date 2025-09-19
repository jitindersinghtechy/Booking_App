import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  allChecked: boolean;
  onAccept: () => void;
  onReject: () => void;
};

export const BookingActionButtons: React.FC<Props> = ({ allChecked, onAccept, onReject }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, styles.noButton]}
      onPress={onReject}
      activeOpacity={0.7}
    >
      <Text style={styles.noText}>No thanks</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, allChecked ? styles.yesButton : styles.disabledButton]}
      onPress={onAccept}
      disabled={!allChecked}
      activeOpacity={allChecked ? 0.7 : 1}
    >
      <Text style={[styles.yesText, !allChecked && styles.disabledText]}>Accept</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#000',
  },
  yesButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  noText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  yesText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  disabledText: {
    color: '#666',
  },
});
