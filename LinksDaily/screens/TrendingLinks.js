import React, { useState,useEffect,useContext } from 'react'
import { SafeAreaView,View,ScrollView,TouchableOpacity,ImageBackground } from 'react-native'
import Text from "@kaloraat/react-native-text"
import { AuthContext } from '../context/auth'
import { LinkContext } from '../context/link'
import FooterTabs from '../components/nav/FooterTabs'
import axios from 'axios'
import PreviewCard from '../components/links/PreviewCard'
import { API } from '../config'


const TrendingLinks = ({ navigation }) => {
    const [state,setState] = useContext(AuthContext)
    const [links,setLinks] = useContext(LinkContext)

    useEffect(() => {
        fetchLinks()
    },[])

    const fetchLinks = async () => {
        const { data } = await axios.get(`${API}/links`)
        setLinks(data)
    }

    const handlePress = async (link) => {
        await axios.put(`${API}/view-count/${link._id}`)
        navigation.navigate("LinkView", { link })
        setLinks(() => {
            const index = links.findIndex((l) => l._id === link._id)
            links[index] = { ...link, views: link.views + 1}
            return [...links]
        })
    }

    return (
        <ImageBackground
            style={{ flex: 1, height: "100%"}}
            source={require("../assets/bgi.jpg")}
            resizeMode='cover'
        >
            <Text title center light style={{color: "#fff", paddingTop: 80, paddingBottom: 10}}>Trending IPL News</Text>

            <RenderLinks links={links && links.sort((a,b) => (a.views < b.view ? 1 : -1)).slice(0,5)} handlePress={handlePress}/>

            <Text title center light style={{color: "#fff", paddingBottom: 10}}>Latest IPL News</Text>

            <RenderLinks links={links && links.sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0,5)} handlePress={handlePress}/>

            <FooterTabs />
        </ImageBackground>
        
    );
}

const RenderLinks = ({ links, handlePress }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {links.map((link) => (
            <View key={link._id} style={{ alignItems: "center", width: 400, height: 300 }}>
                <PreviewCard { ...link.urlPreview } handlePress={handlePress} link={link} showIcons={true} />
            </View> 
        ))}
    </ScrollView>
)

export default TrendingLinks;