import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import {ListObject, Loading, Object3D} from '../../components';
import React, {useEffect, useState, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../../constants';
import Modal from 'react-native-modal';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {searchProducts} from '../../helpers/handleProductApis';
import {useToastMessage} from '../../hook/showToast';
import {debounce} from 'lodash';

export default function ARDesignView({navigation}) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {showToast} = useToastMessage();
  const [productList, setProductList] = useState([]);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await searchProducts({});
      setProductList(responseResults.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = useCallback(
    debounce(async () => {
      try {
        setIsLoading(true);
        console.log('searchKey', searchKey);
        const responseResult = await searchProducts({searchText: searchKey});
        setProductList(responseResult.data);
      } catch (error) {
        showToast('Có lỗi xảy ra !', 'danger');
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [searchKey],
  );

  useEffect(() => {
    handleSearch();
    return () => {
      handleSearch.cancel();
    };
  }, [searchKey, handleSearch]);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <Ui3DObjectPage />,
        }}
        style={styles.rootContainer}
      />
      <TouchableOpacity style={styles.plusIcon} onPress={toggleBottomSheet}>
        <Ionicons name="add-circle" size={42} color={COLORS.primary} />
      </TouchableOpacity>
      <KeyboardAvoidingView>
        <Modal
          isVisible={isBottomSheetVisible}
          onBackdropPress={toggleBottomSheet}
          onSwipeComplete={toggleBottomSheet}
          swipeDirection={['down']}
          avoidKeyboard={true}
          scrollHorizontal={true}
          style={styles.bottomSheet}>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  value={searchKey}
                  onChangeText={setSearchKey}
                  avoidKeyboard={true}
                  placeholder="Tìm kiếm mô hình 3D"></TextInput>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={() => handleSearch()}>
                  <Feather name="search" size={24} color={COLORS.offwhite} />
                </TouchableOpacity>
              </View>
            </View>
            {isLoading ? <Loading /> : <ListObject data={productList} />}
          </SafeAreaView>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

class Ui3DObjectPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    function onInitialized(state, reason) {
      console.log('onInitialized', state, reason);
      if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
        // Handle loss of tracking
      }
    }
    return (
      <ViroARScene style={styles.container} onTrackingUpdated={onInitialized}>
        <ViroDirectionalLight direction={[1, 0, 0]} color="#ffffff" />
        <ViroDirectionalLight direction={[-1, 0, 0]} color="#ffffff" />
        <ViroDirectionalLight direction={[0, 1, 0]} color="#ffffff" />

        <ViroAmbientLight color="#ffffff" />
        {/* <Object3D url={this.props.url} /> */}
      </ViroARScene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  plusIcon: {
    position: 'absolute',
    right: SIZES.small,
    top: SIZES.small,
  },
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  wrapper: {
    height: SIZES.height - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: SIZES.small,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
    marginTop: SIZES.large,
  },
  searchIcon: {
    paddingHorizontal: 10,
    paddingStart: SIZES.small,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  closeIcon: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    zIndex: -1,
  },
  searchInput: {
    marginStart: SIZES.small,
    fontFamily: 'OpenSans-Regular',
    width: '100%',
    height: '100%',
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});
