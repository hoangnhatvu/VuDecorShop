import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../constants';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
    marginTop: -SIZES.xLarge,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.offwhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    paddingHorizontal: SIZES.small,
  },
  titleRow: {
    paddingVertical: SIZES.small,
    marginLeft: 4,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.xLarge,
  },
  
  price: {
    paddingHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.large,
  },
  priceWrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: SIZES.large,
  },
  priceWrapper: {
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SIZES.large,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: SIZES.xSmall,
  },
  descriptionWrapper: {
    marginLeft: 4, 
    paddingBottom: SIZES.large,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: SIZES.small - 2,
    borderRadius: SIZES.large,
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.primary,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
