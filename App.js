import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { 
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade 
} from 'rn-placeholder';


const App = () => {
  const [loadingPlaceholder, setLoadingPlaceholder] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoadingPlaceholder(false);
      }, 3000)
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 30, marginHorizontal: 20,}}>
        {
          loadingPlaceholder ? 
          (
            <View>
              <Placeholder
                Animation={Fade}
                Right={PlaceholderMedia}
              />
              <Placeholder
                Animation={Fade}
                style={{marginTop: 20}}
              >
                <PlaceholderLine width={30} />

                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />

              </Placeholder>
            </View>
          ) : 
          (
            <View>
              <Placeholder
                Right={PlaceholderMedia}
              />
              <Placeholder
                style={{marginTop: 20}}
              >
                <PlaceholderLine width={30} />

                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />
                <PlaceholderLine style={styles.messages} />

              </Placeholder>
            </View>
          )
        }
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  messages: {
    height: 132,
    borderRadius: 5,
  }
})
