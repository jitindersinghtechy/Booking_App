import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { BookingCard } from '../components/BookingCard';
import { fetchBookings } from '../api/bookingsApi';
import { Booking } from '../types/booking';
import { theme } from '../theme';
import { ScreenHeader } from "../components/ScreenHeader";
import { FilterTabs } from "../components/FilterTabs";
import { FILTER_TABS } from '../constants/filtertabs';

const BookingsScreen: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        (async () => {
            const data = await fetchBookings();
            setBookings(data);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator color={theme.colors.primary} size="large" style={{ marginTop: 40 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader
                title="Available bookings"
                onFilterPress={() => console.log("Filter pressed")}
                onCalendarPress={() => console.log("Calendar pressed")}
            />
            <FilterTabs selected={filter} onChange={setFilter} tabs={FILTER_TABS} />
            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <BookingCard booking={item} />}
                ListEmptyComponent={() => <Text style={styles.empty}>No bookings</Text>}
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    empty: { color: theme.colors.muted, textAlign: 'center', marginTop: 40 },
});

export default BookingsScreen;