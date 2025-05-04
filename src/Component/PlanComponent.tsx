import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PlanComponent = () => {
    return (
        <View style={styles.cardWrapper}>
            <Text style={styles.Planheading}> Basic</Text>
            <Text style={styles.priceOfPlan}> $ 7.99 / month</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.subline}> ✔️ </Text>
                <Text style={styles.sublinetext}> HD Streaming </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.subline}> ✔️ </Text>
                <Text style={styles.sublinetext}>Watch on 1 Device  </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.subline}> ✔️ </Text>
                <Text style={styles.sublinetext}>Limted content Library</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.subline}> ✔️ </Text>
                <Text style={styles.sublinetext}> Basic features </Text>
            </View>

        </View>
    )
}

export default PlanComponent

const styles = StyleSheet.create({
    cardWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: "grey",
        margin: 15,
        borderRadius: 20,
        padding : 15,
        width : 350

    },
    Planheading: {
        color: 'white',
        fontSize: 26,
        fontWeight: '700',
        paddingHorizontal: 10,
        marginBottom: 5
    },
    priceOfPlan: {
        color: 'white',
        fontSize: 28,
        fontWeight: '700'
    },
    subline: {
        color: 'white',
        fontSize : 16
    },
    sublinetext:{
        color : 'white',
        fontSize : 16
    }

})