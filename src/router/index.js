import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
      title: '实验管理',
      icon: 'table',
      roles: ['3']
    },
    children: [
      {
        path: 'courseOpt',
        name: 'CourseOpt',
        meta: { title: '选退实验课' },
        component: () => import('@/views/student/studentCourse/courseOpt')
      },
      {
        path: 'hoursOpt',
        name: 'HoursOpt',
        meta: { title: '选课时' },
        component: () => import('@/views/student/studentCourse/hoursOpt')
      },
      {
        path: 'hoursDel',
        name: 'HoursDel',
        meta: { title: '退课时' },
        component: () => import('@/views/student/studentCourse/hoursDel')
      }
    ]
  },
  {
    path: '/grade',
    component: Layout,
    redirect: '/grade/index',
    name: 'Grade',
    // hidden: true,
    meta: {
      title: '实验成绩',
      icon: 'dashboard',
      roles: ['3']
    },
    children: [
      {
        path: 'index',
        name: 'Grade',
        meta: { title: '实验成绩' },
        component: () => import('@/views/student/studentCourse/grade')
      }
    ]
  },
  {
    path: '/studentEvaluate',
    component: Layout,
    redirect: '/studentEvaluate/index',
    name: 'studentEvaluate',
    // hidden: true,
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
        component: () => import('@/views/student/studentEvaluate/index')
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
        component: () => import('@/views/administrators/userOpt/studentOpt'),
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
        component: () => import('@/views/administrators/userOpt/teacherOpt'),
        meta: { title: '教师管理', icon: 'alumniManagement' }
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
        component: () => import('@/views/administrators/courseSelection/index'),
        meta: { title: '课时配置', icon: 'table', activeMenu: '/courseSelection' },
        hidden: true
      },
      {
        path: 'unitform',
        name: 'UnitForm',
        component: () => import('@/views/administrators/courseSelection/unitForm'),
        meta: { title: '编辑课时', activeMenu: '/courseSelection' },
        hidden: true
      },
      {
        path: 'detail',
        name: 'UnitDetail',
        component: () => import('@/views/administrators/courseSelection/unitDetail'),
        meta: { title: '课程详情', activeMenu: '/courseSelection' },
        hidden: true
      }
    ]
  },
  {
    path: '/classDetail',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'ClassDetailIndex',
        component: () => import('@/views/administrators/classDetail/index'),
        meta: { title: '学生选课详情', icon: 'operationLog' }
      }
    ]
  },
  {
    path: '/gradeDetail',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'GradeDetailIndex',
        component: () => import('@/views/administrators/gradeDetail/index'),
        meta: { title: '成绩详情', icon: 'taskCenter' }
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
        path: 'couseOpt',
        name: 'CouseOpt',
        component: () => import('@/views/administrators/systemSettings/courseOpt'),
        meta: { title: '课程管理' }
      },
      {
        path: 'majorOpt',
        name: 'MajorOpt',
        component: () => import('@/views/administrators/systemSettings/majorOpt'),
        meta: { title: '专业管理' }
      },
      {
        path: 'index',
        name: 'SemesterResetIndex',
        component: () => import('@/views/administrators/systemSettings/index'),
        meta: { title: '学期重置' }
      }
    ]
  },
  {
    path: '/infoCenter',
    component: Layout,
    meta: {
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'TnfoCenterIndex',
        component: () => import('@/views/administrators/infoCenter/index'),
        meta: { title: '通知管理', icon: 'form' }
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
        component: () => import('@/views/administrators/operationLog/index'),
        meta: { title: '操作日志', icon: 'operationLog' }
      }
    ]
  },
  // 教师端路由
  {
    path: '/teacherAllCourse',
    component: Layout,
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'index',
        name: 'TeacherAllCourseIndex',
        component: () => import('@/views/teacher/teacherAllCourse/index'),
        meta: { title: '我的课时', icon: 'userManagement' }
      }
    ]
  },
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
        component: () => import('@/views/teacher/teacherCourseToday/index'),
        meta: { title: '今日课时', icon: 'taskCenter' }
      },
      {
        path: '/teacherCourseToday/detail',
        name: 'TeacherCourseCenterIndex',
        component: () => import('@/views/teacher/teacherCourseCenter/index'),
        meta: { title: '该课时学生管理', icon: 'user' },
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
        component: () => import('@/views/teacher/teacherGrade/index'),
        meta: { title: '成绩登记', icon: 'userManagement' }
      }
    ]
  },
  {
    path: '/gradeCenter',
    component: Layout,
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'index',
        name: 'GradeCenterIndex',
        component: () => import('@/views/teacher/gradeCenter/index'),
        meta: { title: '学生成绩', icon: 'operationLog' }
      }
    ]
  },
  {
    path: '/teacherEvaluate',
    component: Layout,
    meta: {
      roles: ['2']
    },
    children: [
      {
        path: 'index',
        name: 'TeacherEvaluate',
        component: () => import('@/views/teacher/teacherEvaluate/index'),
        meta: { title: '学生教评', icon: 'form' }
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
