import dayjs from 'dayjs' // 导入day.js库
import 'dayjs/locale/zh-cn' // 导入中文语言包
import relativeTime from 'dayjs/plugin/relativeTime' //导入相对时间插件

dayjs.extend(relativeTime) // 使用相对时间插件
dayjs.locale('zh-cn') // 使用中文语言包

export default dayjs // 默认暴露