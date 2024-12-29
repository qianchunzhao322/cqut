const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  userRealId: state => state.user.userRealId,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  modifyNumber: state => state.user.modifyNumber,
  permission_routes: state => state.permission.routes
}
export default getters
