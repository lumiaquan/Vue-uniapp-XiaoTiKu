import axios from 'vue-axios';

const instance = axios.create({
  timeout: 10000,
   headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});
 
export default {
  getQuestion (data) {
    return instance.get('http://127.0.0.1:8081/getQuestion', {params:data});
  }
};