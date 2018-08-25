
import axios from '~/framework/core/http/axios'
import apis from '~/config/api'
export default function ({store, to, from, next}, iterator) {
  
  return new Promise(async (resolve, reject)=>{
    // debugger
    if (to.meta.requireAuth) {
      const r = await axios.get(apis.getMesNum).then((data)=>data.data);
      if(r.logoutCode == '400') {
        next('/logout');
      } else if(r.warnCode == '400'){
        if(!store.state.isWarned) {
          if(from.fullPath == '/warn') {
            if(iterator) {
              iterator.next()
            }
          } else {
            next('/warn');
          }
        } else {
          if(iterator) {
            iterator.next()
          }
        }
        
      } else {
        resolve(true)
        if(iterator) {
          iterator.next()
        }
      }
    } else {
      resolve(true);
      if(iterator) {
        iterator.next()
      }
    }
  })
}
