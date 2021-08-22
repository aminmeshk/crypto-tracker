import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../helpers/navigation';
// @ts-ignore
import HTMLtoBase64Image from 'react-native-html-to-base64image';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HtmlToImg'>;

interface Props {
  navigation: NavigationProp;
}

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Need storage permission to save image file',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use storage');
      return true;
    } else {
      console.log('Storage permission denied: ', granted);
      return false;
    }
  } catch (error) {
    console.warn(error);
    return false;
  }
};

const HtmlToImg: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [html, setHtml] = useState(
    '<h1>Title</h1><h2>Second Title</h2><p>This is paragraph<br/>with a break</p><p style="font-size:12px;color:red;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque dolor, scelerisque vitae iaculis eget, molestie in orci. Suspendisse aliquet pharetra sem at dapibus. Fusce in diam dictum, scelerisque nibh placerat, tempor nunc. Ut nunc nisl, vulputate sit amet metus tristique, maximus tincidunt ipsum. Morbi leo mi, sollicitudin congue egestas a, varius at felis. In mi lectus, porttitor non tortor sit amet, egestas bibendum ligula. Mauris bibendum lectus risus, vitae mollis sem rutrum et. Sed in ultricies libero. Maecenas vel justo quis arcu sagittis facilisis a at magna. Ut diam urna, pharetra at placerat sit amet, mollis nec sem.</p>',
  );
  const [base64, setBase64] = useState<string>();

  const convertToBase64 = useCallback(async () => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }
      const options = {
        html,
        fileName: 'test2',
        // directory: 'Documents',
        height: 400,
        width: 300,
      };

      const file = await HTMLtoBase64Image.convert(options);
      setBase64(`data:image/jpeg;base64,${file}`);
    } catch (error) {
      console.log(error);
    }
  }, [html]);

  return (
    <View style={[s.screen, {paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContainer}>
        <Text>{html}</Text>
        {/* <Button onPress={convert} title="Convert to PDF" /> */}
        <Button onPress={convertToBase64} title="Convert to Base64" />
        {base64 && <Image style={s.img} source={{uri: base64}} />}
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {},
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default HtmlToImg;
