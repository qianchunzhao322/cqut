// main.js
import Vue from 'vue';

Vue.directive('infinite-scroll', {
  bind(el, binding) {
    let throttleTimeout;
    const handleScroll = () => {
      if (throttleTimeout) {
        return;
      }
      throttleTimeout = setTimeout(() => {
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (distanceFromBottom <= 200) {
          binding.expression && binding.value();
        }
        throttleTimeout = null;
      }, 1500); // 设置节流延迟时间
    };

    el.addEventListener('scroll', handleScroll);

    // 在组件销毁时移除事件监听和清除节流定时器
    el._onInfiniteScroll = handleScroll;
    el._clearInfiniteScroll = () => {
      clearTimeout(throttleTimeout);
      throttleTimeout = null;
    };
  },
  unbind(el) {
    if (el._onInfiniteScroll) {
      el.removeEventListener('scroll', el._onInfiniteScroll);
      delete el._onInfiniteScroll;
    }
    if (el._clearInfiniteScroll) {
      el._clearInfiniteScroll();
      delete el._clearInfiniteScroll;
    }
  }
});
