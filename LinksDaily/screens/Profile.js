import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView,ScrollView, TouchableOpacity, ImageBackground,Image,Alert } from 'react-native'
import Text from'@kaloraat/react-native-text'
import { useRoute } from '@react-navigation/native'
import { AuthContext } from '../context/auth'
import { LinkContext } from '../context/link'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { Divider } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { API } from '../config'

dayjs.extend(relativeTime)

const Profile = ({ navigation }) => {
    const route = useRoute()

    const [state,setState] = useContext(AuthContext)
    const [links,setLinks] = useContext(LinkContext)

    const [userProfile,setUserProfile] = useState({})
    const [userLinks,setUserLinks] = useState([])

    const [loading,setLoading] = useState(true)

    const routeParamsId = route?.params?._id

    useEffect(() => {
        // console.log(route.params)
        const fetchUserProfile = async (userId) => {
            try {
                const { data } = await axios.get(`${API}/user-profile/${userId}`)
                console.log("user profile data => ", data.profile)
                console.log("links data => ", data.links)
                setUserProfile(data.profile)
                setUserLinks(data.links)
                setTimeout(() => {
                    setLoading(false)
                },1000)
            } catch (err) {
                console.log(err)
            }
        }
        routeParamsId ? fetchUserProfile(routeParamsId) : fetchUserProfile(state.user._id)
    },[])

    const handleDelete = async (linkId) => {
        try {

            const { data } = axios.delete(`${API}/link-delete/${linkId}`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })

            //update user links
            setUserLinks((links) => {
                const index = userLinks.findIndex((l) => l._id === linkId)
                userLinks.splice(index,1)
                return [...links]
            })

            //update context
            setLinks((links) => {
                const index = links.findIndex((l) => l._id === linkId)
                links.splice(index,1)
                return [...links]
            })

            alert("Deleted Successfully")


        } catch (err) {
            console.log(err)
            alert("Delete Failed")
        }
    }

    if (loading) {
        return (
            <View style={{
                alignItems: "center",
                paddingBottom: 20,
                backgroundColor: "#fff",
                height: "100%",
                justifyContent: "center"
            }}>
                <Image 
                    source={require("../assets/loading.gif")}
                    style={{ height: 100 ,width: 100 }}
                />
            </View>
        )
    }

    return (
        <ImageBackground 
            source={require("../assets/bgi.jpg")}
            style={{ flex: 1, height: "100%"}}
            resize="cover"

        >
            
            {/* <Text large light center style={{ color: "fff",  paddingTop: 30, paddingBottom: 10 }}>Profile</Text> */}
            <SafeAreaView>
                <View style={{ alignItems: "center", paddingBottom: 10 }}>
                    <Image 
                        source={{ uri: userProfile?.image?.url ? userProfile.image.url : `https://via.placeholder.com/500x500.png?text=${userProfile?.name?.charAt(0)}` }}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 50
                        }}
                    />
                    <Text large color="#fff" style={{ paddingTop: 10 }}>{userProfile.name}</Text>
                    <Text medium color="#fff" style={{ paddingTop: 10 }}>{userProfile.role}</Text>
                    <Text tiny color="#fff" style={{ paddingTop: 10 }}>Joined {dayjs(userProfile.createdAt).fromNow()}</Text>
                </View>

                <Divider width={2}/>
                <View style={{ paddingBottom: 20 }}></View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text bold medium center color="#fff">
                        {userLinks.length} Links
                    </Text>

                    {userLinks.map((link) => (
                        <View key={link._id} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                            
                            <Text color="#fff">{link?.urlPreview?.ogTitle}</Text>

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text color="#fff">{link?.views} Views</Text>
                                {state?.user?._id === link?.postedBy._id && 
                                <TouchableOpacity onPress={() => handleDelete(link._id)}>
                                    <FontAwesome5 name="trash" color="#ff9900" size={25}/>
                                </TouchableOpacity>}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            
        </ImageBackground>
    );
}

export default Profile;