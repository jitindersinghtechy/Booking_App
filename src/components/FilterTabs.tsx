import React from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../theme";

type Props = {
  selected: string;
  onChange: (val: string) => void;
  tabs: string[];
};

export const FilterTabs: React.FC<Props> = ({ selected, onChange, tabs }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
        {tabs.map((tab) => {
          const active = tab === selected;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => onChange(tab)}
            >
              <Text style={[styles.text, active && styles.textActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 19,
    marginVertical: 12,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 29,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontSize: 14,
    color: theme.colors.muted,
    fontWeight: "500",
  },
  textActive: {
    color: "#fff",
  },
});
