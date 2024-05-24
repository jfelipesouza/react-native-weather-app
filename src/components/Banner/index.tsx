import React, {useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {colors} from '../../theme/colors';

export const BannerComponent: React.FC = () => {
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });
  return (
    <View style={styles.container}>
      <BannerAd
        ref={bannerRef}
        unitId={TestIds.ADAPTIVE_BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginBottom: 5,
    backgroundColor: colors.bg,
  },
});
