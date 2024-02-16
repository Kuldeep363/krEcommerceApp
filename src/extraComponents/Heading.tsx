import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../config/theme'

interface Heading{
    startText:string | undefined
    endText: string | undefined
    imgURL: string | undefined
}

const Heading: React.FC<Heading> = ({startText,endText,imgURL}) => {
  return (
    <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            gap: 0,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom:10
          }}>
          <Text style={styles.categoriesTitle}>{startText}</Text>
          <View>
            <Text style={styles.categoriesTitleInnerText}>{endText}</Text>
            <View
              style={{
                position: 'absolute',
                bottom: -8,
                left: 0,
                right: 0,
                alignItems: 'flex-end',
              }}>
              <Image
                source={{
                  uri: imgURL,
                }}
                style={{
                  width: '80%',
                  height: 8,
                }}
              />
            </View>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
    categoriesTitle: {
        color: COLORS.balck,
        fontFamily: FONTS.AcronymMedium,
        fontSize: 16,
      },
      categoriesTitleInnerText: {
        fontFamily: FONTS.AcronymMedium,
        fontSize: 16,
        color: COLORS.primary1,
      },
})

export default Heading