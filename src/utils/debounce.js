import { debounce } from 'lodash'

const debounceDirective = {
  inserted: function(el, binding) {
    const delay = binding.value || 500 // 获取传入的延迟时间，如果未传入，则默认为 500 毫秒
    const debouncedClick = debounce(binding.expression, delay)
    el.addEventListener('click', debouncedClick)
  }
}

export default debounceDirective