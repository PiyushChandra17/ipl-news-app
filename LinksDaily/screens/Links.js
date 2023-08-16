import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Text from "@kaloraat/react-native-text"
import FooterTabs from '../components/nav/FooterTabs'

const Links = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Links Screen</Text>
            <View style={{ flex: 1, justifyContent: "flex-end"}}>
                <FooterTabs />
            </View>
        </SafeAreaView>
    );
}

export default Links;