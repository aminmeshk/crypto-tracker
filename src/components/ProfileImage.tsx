import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  onPress?: () => void;
}

const ProfileImage: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <Image
        source={require('../../assets/images/avatar.jpg')}
        style={s.avatarImage}
      />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 16,
    marginBottom: 6,
  },
});

export default ProfileImage;
