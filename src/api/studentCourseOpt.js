import request from '@/utils/request'

export function takeCourse(data) {
  return request({
    url: `/courseChoose/takeCourse?courseId=${data}`,
    method: 'post'
  })
}

export function getAllCourse() {
  return request({
    url: '/courseChoose/optionalCourse',
    method: 'post'
  })
}

export function getMyCourse(data) {
  return request({
    url: '/courseChoose/pageMyCourse',
    method: 'post',
    data: data
  })
}

export function getMyGrade(data) {
  return request({
    url: '/courseSchedulingChoose/stuGradeSelect',
    method: 'post',
    data: data
  })
}

export function backCourse(courseId, reason) {
  return request({
    url: `/courseBack/backCourse?courseId=${courseId}&reason=${reason}`,
    method: 'post'
  })
}

export function getMyCourseScheduling(data) {
  return request({
    url: '/courseScheduling/myCourseScheduling',
    method: 'post',
    data: data
  })
}

// export function backCourseScheduling(stuId, courseSchedulingId) {
//   return request({
//     url: `/courseSchedulingBack/backScheduling?stuId=${stuId}&courseSchedulingId=${courseSchedulingId}`,
//     method: 'post'
//   })
// }

export function addEvaluate(data) {
  return request({
    url: '/courseChoose/addEvaluate',
    method: 'post',
    data: data
  })
}

export function takeCourseScheduling(data) {
  return request({
    url: `/courseSchedulingChoose/takeCourseScheduling?courseSchedulingId=${data}`,
    method: 'post'
  })
}

export function backCourseScheduling(data) {
  return request({
    url: `/courseSchedulingChoose/backCourseScheduling?courseSchedulingId=${data}`,
    method: 'post'
  })
}

export function getAllCourseScheduling(data) {
  return request({
    url: '/courseSchedulingChoose/optionalCourseScheduling',
    method: 'post',
    data: data
  })
}

export function getMyAllCourseScheduling(data) {
  return request({
    url: '/courseSchedulingChoose/pageMyCourseScheduling',
    method: 'post',
    data: data
  })
}
