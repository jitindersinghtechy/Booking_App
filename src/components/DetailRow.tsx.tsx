
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

type Props = {
  label: string;
  value?: string;
  checkboxKey: string;
  checkboxValue: boolean;
  onToggle: (key: string) => void;
  icon?: any; // PNG source
  iconStyle?: ImageStyle;
  showCount?: number;
  isBabySeat?: boolean;
  isChecked: boolean;
};

export const DetailRow: React.FC<Props> = ({
  label,
  value,
  checkboxKey,
  checkboxValue,
  onToggle,
  icon,
  iconStyle,
  showCount,
  isBabySeat = false,
  isChecked=false,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <View style={styles.labelRow}>
          {icon && (
            <Image
              source={icon}
              style={[styles.icon, iconStyle]}
              resizeMode="contain"
            />
          )}
          <Text style={styles.label}>
            {label}{' '}
            {showCount !== undefined && (
              <Text style={styles.countText}>(x{showCount})</Text>
            )}
          </Text>
        </View>
        {value && (
          <Text style={isBabySeat ? styles.valueWithIndent : styles.value}>
            {value}
          </Text>
        )}
      </View>

      <Checkbox
        value={isChecked}
        onValueChange={() => onToggle(checkboxKey)}
        tintColors={{ true: '#4CAF50', false: '#ccc' }}
        style={styles.checkbox}
        {...(Platform.OS === 'ios' ? { boxType: 'square' } : {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '600',
  },
  value: {
    fontSize: 15,
    color: '#222',
  },
  valueWithIndent: {
    fontSize: 15,
    color: '#222',
    marginLeft: 30,
  },
  countText: {
    fontWeight: '700',
    color: '#222',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    top: 5,
    borderColor: '#999999',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#4CAF50',
    top: 8,
  },
});
