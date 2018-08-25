

export default function ({store, to, from, next}, iterator) {
  
  return new Promise((resolve, reject)=>{
    // debugger
    if (to.meta.requireAuth) {
      if(store.state.isLogin) {
        resolve(true);
        if(iterator) {
          iterator.next()
        }
      } else {
        let redirectUrl = to.fullPath;
        // next('/login');
        next({path: '/login', query: {redirectUrl:redirectUrl}});
      }
    } else {
      if(to.path == '/login') {
        if(store.state.isLogin) {
          next('/manage');
        } else {
          resolve(true);
          if(iterator) {
            iterator.next()
          }
        }
      }
      resolve(true);
      if(iterator) {
        iterator.next()
      }
    }
  })
}
