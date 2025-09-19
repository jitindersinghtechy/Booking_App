
import React from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons'; // or 'react-native-vector-icons/MaterialCommunityIcons'

type TabBarIconProps = {
  name: string;
  color: string;
  size?: number;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size = 24 }) => {
  return <MaterialCommunityIcons name={name} color={color} size={size} />;
};

export default TabBarIcon;