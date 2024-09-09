import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Base from '@/layout/components/base.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
	roles: ['admin','editor']    control the page roles (you can set multiple roles)
	title: 'title'               the name show in sidebar and breadcrumb (recommend set)
	icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
	breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
	activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dataAnalysis',
    meta: {
      roles: ['1', '2', '3']
    },
    children: [{
      path: 'dataAnalysis',
      name: 'DataAnalysis',
      component: () => import('@/views/dataAnalysis/index'),
      meta: {
        title: '数据分析',
        icon: 'dataAnalysis'
      }
    }]
  },
  // 学生端路由
  {
    path: '/stuCourse',
    component: Layout,
    redirect: '/stuCourse/index',
    name: 'StuCourse',
    meta: {
      title: '课程管理',
      icon: 'table',
      roles: ['3']
    },
    children: [
      {
        path: 'courseOpt',
        name: 'CourseOpt',
        meta: { title: '选退课程' },
        component: () => import('@/views/studentCourse/courseOpt')
      },
      {
        path: 'hoursOpt',
        name: 'HoursOpt',
        meta: { title: '选退课时' },
        component: () => import('@/views/studentCourse/hoursOpt')
      },
      {
        path: 'grade',
        name: 'Grade',
        meta: { title: '课程成绩' },
        component: () => import('@/views/studentCourse/grade')
      }
    ]
  },
  {
    path: '/studentEvaluate',
    component: Layout,
    redirect: '/studentEvaluate/index',
    name: 'studentEvaluate',
    meta: {
      title: '课程教评',
      icon: 'dashboard',
      roles: ['3']
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: { title: '课程教评' },
        component: () => import('@/views/studentEvaluate/index')
      }
    ]
  },
  // 管理员端路由
  {
    path: '/systemSettings',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'studentOpt',
        name: 'StudentOpt',
        component: () => import('@/views/systemSettings/studentOpt'),
        meta: { title: '学生管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/systemSettings',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'teacherOpt',
        name: 'TeacherOpt',
        component: () => import('@/views/systemSettings/teacherOpt'),
        meta: { title: '教师管理', icon: 'alumniManagement' }
      }
    ]
  },
  {
    path: '/systemSettings',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'couseOpt',
        name: 'CouseOpt',
        component: () => import('@/views/systemSettings/courseOpt'),
        meta: { title: '课程管理', icon: 'taskCenter' }
      }
    ]
  },
  {
    path: '/courseSelection',
    component: Layout,
    redirect: '/courseSelection/index',
    meta: {
      title: '选课配置中心', icon: 'table',
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'courseSelectionIndex',
        component: () => import('@/views/unitManagement/index'),
        meta: { title: '课时配置', isClose: true, icon: 'table' },
        hidden: true
      },
      {
        path: 'unitform',
        name: 'UnitForm',
        component: () => import('@/views/unitManagement/unitForm'),
        meta: { title: '编辑课时', isClose: true },
        hidden: true
      },
      {
        path: 'detail',
        name: 'UnitDetail',
        component: () => import('@/views/unitManagement/unitDetail'),
        meta: { title: '课程详情', isClose: true },
        hidden: true
      }
    ]
  },
  {
    path: '/systemSettings',
    component: Layout,
    name: 'SystemSettings',
    redirect: '/systemSettings/studentOpt',
    meta: {
      title: '系统设置', icon: 'systemSettings',
      roles: ['1']
    },
    children: [
      {
        path: 'majorOpt',
        name: 'MajorOpt',
        component: () => import('@/views/systemSettings/majorOpt'),
        meta: { title: '专业管理' }
      },
      {
        path: 'index',
        name: 'SemesterResetIndex',
        component: () => import('@/views/systemSettings/index'),
        meta: { title: '学期重置' }
      }
    ]
  },
  {
    path: '/operationLog',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'OperationLogIndex',
        component: () => import('@/views/operationLog/index'),
        meta: { title: '操作日志', icon: 'operationLog' }
      }
    ]
  },
  // 教师端路由
  {
    path: '/',
    component: Layout,
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'index',
        name: 'TeacherCourseTodayIndex',
        component: () => import('@/views/teacherCourseToday/index'),
        meta: { title: '今日课程', icon: 'taskCenter' }
      },
      {
        path: '/teacherCourseToday/detail',
        name: 'TeacherCourseCenterIndex',
        component: () => import('@/views/teacherCourseCenter/index'),
        meta: { title: '学生管理', icon: 'user' },
        hidden: true
      }
    ]
  },
  {
    path: '/teacherGrade',
    component: Layout,
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'index',
        name: 'TeacherGradeIndex',
        component: () => import('@/views/teacherGrade/index'),
        meta: { title: '成绩登记', icon: 'userManagement' }
      }
    ]
  },
  {
    path: '/infoCenter',
    component: Layout,
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'index',
        name: 'TnfoCenterIndex',
        component: () => import('@/views/infoCenter/index'),
        meta: { title: '通知管理', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
