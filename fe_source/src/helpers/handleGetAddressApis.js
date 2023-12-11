import axios from 'axios';

const token = '101e2d64-95a3-11ee-b1d4-92b443b7a897';

const getProvinces = async () => {
  try {
    const endpoint = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`;
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getDistrictsByProvince = async provinceCode => {
  try {
    if (!provinceCode) {
      throw new Error('Vui lòng chọn tỉnh thành trước !');
    }
    const endpoint = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;
    const response = await axios.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

const getWardsByDistrict = async districtCode => {
  try {
    if (!districtCode) {
      throw new Error('Vui lòng chọn quận huyện trước !');
    }
    const endpoint = `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`;
    const response = await axios.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

export {getProvinces, getDistrictsByProvince, getWardsByDistrict};
