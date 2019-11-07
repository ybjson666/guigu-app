import fetch from './request';

/**注册接口 */
export const req_register = (data) => fetch('/api/register',data) 

/*登录接口*/
export const req_login = (data) => fetch('/api/login',data) 

/**更新用户信息 */
export const req_upDateUser = (data) => fetch('/api/update',data) 

/**获取用户信息 */
export const req_getUser = () => fetch('/api/user',{},"GET") 

/**获取用户列表 */
export const req_getUserList = (userType) => fetch('/api/userList',{userType},"GET") 

/**获取用户消息列表 */
export const req_getMsgList = () => fetch('/api/msgList',{},"GET") 

/**修改指定消息为已读 */
export const req_readMsg = (from) => fetch('/api/readMsg',{from})