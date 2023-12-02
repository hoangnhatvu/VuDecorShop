import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: '100%',
    resizeMode: 'cover',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    resizeMode: 'cover',
    marginTop: -90,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.small,
    borderRadius: SIZES.xxLarge,
    justifyContent: 'center',
    alignItems: "center",
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
    marginHorizontal: SIZES.large,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: borderBottomWidth => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
});

export default styles;
