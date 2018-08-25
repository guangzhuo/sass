import SasUpload from './src/head-upload';

SasUpload.install = (Vue)=>{
  Vue.component(SasUpload.name, SasUpload);
};

export default SasUpload;
