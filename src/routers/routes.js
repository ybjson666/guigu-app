import Loadable from 'react-loadable';
import Loading from './../components/Loading'

//懒加载
export const Login=Loadable({
    loader:()=>import('../pages/Login'),
    loading:Loading
})
export const Regist=Loadable({
    loader:()=>import('../pages/Regist'),
    loading:Loading
})
export const Main=Loadable({
    loader:()=>import('../pages/Main'),
    loading:Loading
})