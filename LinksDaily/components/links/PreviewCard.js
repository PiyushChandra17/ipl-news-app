import React, { useContext } from 'react'
import { View, Image, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Text from '@kaloraat/react-native-text'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { LinkContext } from '../../context/link'
import { AuthContext } from '../../context/auth'
import IconSet from './IconSet'
import { API } from '../../config'

const PreviewCard = ({ ogTitle='Untitled',ogDescription='No description found...', ogImage="https://via.placeholder.com/500x500.png?text=Image", handlePress = (f) => f , link = {}, showIcons=false }) => {

    const [links,setLinks] = useContext(LinkContext)
    const [state,setState] = useContext(AuthContext)

    const handleLikePress = async (link) => {
        console.log('link clicked => ', link._id)
        const { data } = await axios.put(`${API}/like`, { linkId: link._id }, {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        })
        setLinks((links) => {
            const index = links.findIndex((l) => l._id === link._id)
            links[index] = data
            return [...links]
        })
    }
    const handleUnlikePress = async (link) => {
        console.log('link clicked => ', link._id)
        const { data } = await axios.put(`${API}/unlike`, { linkId: link._id }, {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        })
        setLinks((links) => {
            const index = links.findIndex((l) => l._id === link._id)
            links[index] = data
            return [...links]
        })
    }

    return (
        <View style={{ 
            height: 280, 
            backgroundColor: "#fff", 
            width: "92%", 
            borderRadius: 14, 
            shadowColor: '#171717', 
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            marginBottom: 30
        }}
        >
            <Image style={{ height: Platform.OS === "android" ? "64%" : "70%" , width: "100%", borderTopRightRadius:14, borderTopLeftRadius: 14}} source={{ uri: ogImage.url }}/>

            <View style={showIcons ? { marginBottom: -40 } : {}}>
                <IconSet 
                    handleLikePress={handleLikePress}
                    handleUnlikePress={handleUnlikePress}
                    link={link}
                    showIcons={showIcons}
                    state={state}
                />
            </View>
            
            <TouchableOpacity onPress={() => handlePress(link)}>
                <View style={{ padding: 5, height: 50 }}>
                    <Text medium style={{ paddingTop: 5, paddingBottom: 5  }}>{ogTitle}</Text>
                    <Text semi>{ogDescription}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}


export default PreviewCard;