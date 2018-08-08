import myinfo from '../info/myinfo';
//由于存储的数据会转换成字符串类型
function PrivateRoute(history){
    let isLogin = sessionStorage.getItem('isLogin');
    if(isLogin ===  'true'){
        
    }else{
        history.push('/');
        myinfo('请先登陆');
    }
}
/*
console.log(isLogin)
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        console.log(...rest),
        isLogin ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

  */

export default PrivateRoute;