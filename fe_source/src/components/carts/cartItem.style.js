import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.small,
    backgroundColor: '#fff',
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
  checkBox: {
    paddingHorizontal: SIZES.small,
  },
  image: {
    width: 75,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 75,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
  },
  category: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    marginTop: 3,
  },
  actionContainer: {
    paddingRight: SIZES.small,
    alignItems: 'flex-end',
  },
  quantityAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SIZES.medium,

  },
  quantityText: {
    color: COLORS.gray,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: SIZES.xSmall,
  },
});

export default styles;
