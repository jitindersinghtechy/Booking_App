import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { FilterTabs } from '../components/FilterTabs';
import { BookingCard } from '../components/BookingCard';
import { Booking } from '../types/booking';
import { theme } from '../theme';
import { fetchMybooking } from '../api/bookingsApi';
import {TABS} from "../constants/bookingtabs"


const MyBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Active");

    useEffect(() => {
        (async () => {
            const data = await fetchMybooking();
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
                title="My bookings"
                onFilterPress={() => console.log("Filter pressed")}
                onCalendarPress={() => console.log("Calendar pressed")}
            />

            <FilterTabs selected={filter} onChange={setFilter} tabs={TABS} />

            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <BookingCard booking={item} />}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
    Active: { flexDirection: 'row', marginVertical: 16, backgroundColor: '#f5f5f5', borderRadius: 20, padding: 4 },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    tagContainer: { flexDirection: 'row', marginBottom: 8 },
    tag: {
        backgroundColor: '#333',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        fontSize: 12,
        fontWeight: '600',
    },
    preferredTag: {
        backgroundColor: '#3b82f6',
    },
    bookingInfo: { marginBottom: 8 },
    datePriceRow: { flexDirection: 'row', justifyContent: 'space-between' },
    dateText: { fontWeight: '700', fontSize: 16 },
    priceText: { fontWeight: '700', fontSize: 16 },
    addressText: { fontSize: 14, color: '#444', marginTop: 2 },
    confirmBox: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
    },
    highlightBox: {
        backgroundColor: '#f4d35e',
    },
    confirmText: {
        fontSize: 14,
        color: '#222',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    navItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navItemSelected: {
        backgroundColor: '#4CAF50',
    },
    navText: {
        color: '#777',
    },
    navTextSelected: {
        color: 'white',
        fontWeight: '600',
    },
});

export default MyBookings;