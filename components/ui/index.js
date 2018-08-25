
import Breadcrumb from './breadcrumb/index.js';
import BreadcrumbItem from './breadcrumb-item/index.js';
import Select from './select/index.js';
import SelectArea from './select-area/index.js';
import Option from './option/index.js'
import Button from './button/index.js'
import Loading from './loading/index.js'
import Pagination from './pagination/index.js'
import Steps from './steps/index.js';
import Step from './step/index.js';
import Message from './message/index.js';
import upload from './upload/index.js';
import Dialog from './dialog/index.js';
import Input from './input/index.js';
import Confirm from './confirm/index.js'

const components = [
  Breadcrumb,
  BreadcrumbItem,
  Select,
  SelectArea,
  Option,
  Button,
  Pagination,
  Steps,
  Step,
  upload,
  Dialog,
  Input,
  Confirm
];
const install = function(Vue, options) {
  components.map(component => {
    Vue.component(component.name, component);
});
  Vue.prototype.$createLoading = Loading.service;
  Vue.prototype.$createMessage = Message.service;
};
export default {
  version: '1.0.0',
  install,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  SelectArea,
  Option,
  Button,
  Loading,
  Pagination,
  Steps,
  Step,
  Message,
  upload,
  Dialog,
  Input,
  Confirm
}
