import React from 'react'
import { View,TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Search = ({ value, setValue }) => {
    return (
        <View>
            <TextInput 
                style={{
                    height: 50,
                    paddingHorizontal: 20,
                    marginHorizontal: 15,
                    marginTop: 20,
                    borderRadius: 50,
                    borderWidth: 5,
                    borderColor: "gray",
                    backgroundColor: "#fff"
                }}
                value={value}
                onChangeText={(text) => setValue(text)}
                placeholder='Search'
                autoCapitalize='none'
            />
        </View>
    );
}

export default Search;