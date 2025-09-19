import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { theme } from "../theme";
import Icons from "../constants/imagepath";

type Props = {
  title: string;
  onFilterPress?: () => void;
  onCalendarPress?: () => void;
};

export const ScreenHeader: React.FC<Props> = ({
  title,
  onFilterPress,
  onCalendarPress,
}) => {
  const [activeButton, setActiveButton] = useState<"filter" | "calendar" | null>(null);

  const handleFilterPress = () => {
    setActiveButton("filter");
    onFilterPress?.();
  };

  const handleCalendarPress = () => {
    setActiveButton("calendar");
    onCalendarPress?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.actions}>

          <TouchableOpacity
            style={[
              styles.iconButton,
              activeButton === "filter" && styles.iconButtonActive,
            ]}
            onPress={handleFilterPress}
          >
            <Image
              source={Icons.ic_search}
              style={[
                styles.iconImage,
                {
                  tintColor:
                    activeButton === "filter"
                      ? "white"
                      : theme.colors.muted,
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconButton,
              activeButton === "calendar" && styles.iconButtonActive,
            ]}
            onPress={handleCalendarPress}
          >
            <Image
              source={Icons.ic_calender}
              style={[
                styles.iconImage,
                {
                  tintColor: activeButton === "calendar" ? 'white' : theme.colors.muted,
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: theme.colors.background,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card, // default (white)
    marginLeft: 8,
  },
  iconButtonActive: {
    backgroundColor: theme.colors.primary, // green when active
  },
  iconImage: {
    width: 18,
    height: 18,
    tintColor: theme.colors.text,
  },
});
