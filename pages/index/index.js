/*
* @Author: HuangChonging
* @Date:   2017-08-05 16:53:31
* @Last Modified by:   hasee
* @Last Modified time: 2017-08-10 17:45:52
*/
const conf = {
  data: {
    hasEmptyGrid: false,
    campany: "百度校招",
    position: "产品实习生",
    start: "8.21",
    end: "8.24",
    // 假设点击9
    id: 9,
    changeColor: "color: #969696 "

  },
  // 点击对应日所展示对应校招信息
  showInfo(e) {
    console.log("点击日子出现的事件对象",e)
    const cdate = e.currentTarget.dataset.date
    console.log("点击日子", cdate)
    this.setData({
      // click_year: 
      // click_month: 
      click_day: cdate,
      match_data: cdate
    })

    // if (cdate==24){
    //   console.log("点击24进行匹配展示信息")
    // }

  },
  onLoad(options) {
    console.log("这是this：", this)
    const date = new Date();
    console.log("当前时间戳：", date.getTime())
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    console.log("这是当前日子：", cur_day)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
      cur_day
    })
  },
  sideColor(year, month){
    
  },
  getThisMonthDays(year, month) {
    // 得到这一月的总天数
    console.log("视图中这一月Date", new Date(year, month, 0).getDate())
    return new Date(year, month, 0).getDate();
  },
   // 获取当月第一天星期几
  getFirstDayOfWeek(year, month) {
    // 得到本月的第一天是周几，例如8月1号是周2
    const view_month = new Date(year, month, 0).getDate()
    console.log("本周总天数：",view_month)
    console.log("月起点:周",new Date(Date.UTC(year, month - 1, 1)).getDay())
    // -------------------------------------------------------------------------------
    // 得到周六周日的天数,获得数组getDays67
    let getDays67 = [];
    let start_week = new Date(Date.UTC(year, month - 1, 1)).getDay()
    for(let i=1;i<=view_month;i++){
      start_week++;
      const rest = (start_week-1)%7 
      console.log(rest, start_week)
      
      if (rest == 6 || rest == 0 ){
        getDays67.push(i)
      }
    }
    console.log("得到周六周日的天数:",getDays67)
    this.setData({
      getDays67: getDays67
    })
    this.setData({
      start_week: new Date(Date.UTC(year, month - 1, 1)).getDay(),
      // changeColor: "color: #969696 "
    });
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
   // 计算当月1号前空了几个格子
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  // 绘制当月天数占的格子
  calculateDays(year, month) {
    // 得到本月总天数
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);
    // 下面这一行获取不到now_day=undefined ？？？？？？
    // const now_day =  this.data.cur_day
    const date1 = new Date()
    // console.log("这是今天：", this.data.cur_day)
    for (let i = 1; i <= thisMonthDays; i++) {
      //加一个判断，本天数字为空
      if (date1.getDate() == i && date1.getFullYear() == year && date1.getMonth() + 1 == month){
        days.push('')
      }else{
      days.push(i);
      }
    }

    this.setData({
      days
    });
  },
  // 向前或向后一个月点击事件
  handleCalendar(e) {
    console.log('点击上下月份事件对象e:',e)
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  onShareAppMessage() {
    // 分享设置
    return {
      title: '校招日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/index/index'
    }
  }
};

Page(conf);
