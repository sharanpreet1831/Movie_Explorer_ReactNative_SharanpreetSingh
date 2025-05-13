import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


interface PlanComponentProps {
  plandata: {
    "PlanName": string;
    PlanPrice: number;
    PlanFeature?: string[];
  };
}

const PlanComponent: React.FC<PlanComponentProps> = ({ plandata }) => {

    const planName = plandata["PlanName"]?.trim().toLowerCase();

    const getGradientColors = (planName: string): string[] => {
        switch (planName) {
            case 'basic':
                return [
                    'rgb(131, 155, 182)',
                    'rgb(76, 161, 175)',
                ];
            case 'standard':
                return [
                    'rgb(131, 119, 119)', 'rgb(235, 215, 215)'
                ];
            case 'premium':
                return [
                    'rgb(85, 137, 123)', 'rgb(153, 242, 200)'
                ];
            default:
                return ['#83a4d4', '#b6fbff']; 
        }
    };

    const gradientColors = getGradientColors(planName);

    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientWrapper}
        >
            <View style={styles.cardWrapper} testID="plan-card">
                <Text style={styles.Planheading} testID="plan-title">    
                    {plandata["PlanName"]?.trim()}
                </Text>
                <Text style={styles.priceOfPlan} testID="plan-price">
                    ${plandata.PlanPrice} / month
                </Text>

                {plandata.PlanFeature?.map((feature, index) => (
                    <View key={index} style={styles.featureRow} testID={`feature-${index + 1}`}>
                        <Text style={styles.subline}>✔️</Text>
                        <Text style={styles.sublinetext}>{feature}</Text>
                    </View>
                ))}
            </View>
        </LinearGradient>
    );
};

export default PlanComponent;


const styles = StyleSheet.create({
    gradientWrapper: {
        borderRadius: 20,
        marginHorizontal: 15,
        marginVertical: 10,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        width: 300,
    },
    cardWrapper: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: 'transparent',
    },
    Planheading: {
        color: '#1B1B1B',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    priceOfPlan: {
        color: '#333333',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    subline: {
        color: '#2E8B57',
        fontSize: 18,
        marginRight: 8,
    },
    sublinetext: {
        color: '#333333',
        fontSize: 16,
        flexShrink: 1,
    },
});