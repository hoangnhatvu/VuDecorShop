import axios from 'axios';

const getProvinces = async () => {
  try {
    const endpoint = `https://provinces.open-api.vn/api/p`;
    const response = await axios.get(endpoint);
    return response;
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