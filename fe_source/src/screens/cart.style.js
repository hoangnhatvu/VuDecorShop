import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.small,
  },
  wrapper: {
    flexDirection: 'row',
    marginVertical: SIZES.large,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.large,
    marginLeft: SIZES.small,
    color: COLORS.primary,
  },
  checkoutContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    bottom: 20,
    borderRadius: 10,
    marginHorizontal: SIZES.small,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.medium,
    paddingHorizontal: SIZES.xSmall,
  },
  buttonCheckout: {
    backgroundColor: COLORS.primary,
    height: 50,
    margin: SIZES.medium,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textCheckout: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.xLarge,
    color: COLORS.offwhite,
  },
});

export default styles;
