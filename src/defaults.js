// Our default options
export default {

  /**
   * Basic options
   */
  inline: false,
  multiple: false,
  ranged: false,
  time: false,
  twentyFourHours: false,

  /**
   * Additional options
   */
  openOn: 'first',
  min: false,
  max: false,
  within: false,
  without: false,
  yearRange: 5,
  weekStart: 0,

  defaultTime: {
    start: [0, 0],
    end: [12, 0]
  },

  separator: ',',

  serialize(date) {
    let dateStr = date.toLocaleDateString()

    if (this.get('time')) {
      let timeStr = date.toLocaleTimeString()
      timeStr = timeStr.replace(/(\d{1,2}:\d{2}):00/, '$1')
      return `${dateStr}@${timeStr}`
    }

    return dateStr
  },

  deserialize(str) {
    return new Date(str)
  },

  /**
   * Callbacks
   */
  toValue: false,
  fromValue: false,
  onInit: false,
  onChange: false,
  onRender: false,

  /**
   * Localizations
   */
  i18n: {
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    time: ['Time', 'Start', 'End']
  },

  /**
   * ClassNames to be used by the Datepicker
   */
  classNames: {
    node: 'datepicker',
    wrapper: 'datepicker__wrapper',
    inline: 'is-inline',
    selected: 'is-selected',
    disabled: 'is-disabled',
    highlighted: 'is-highlighted',
    otherMonth: 'is-otherMonth',
    weekend: 'is-weekend',
    today: 'is-today'
  },

  /**
   * See below for available properties within each context
   */
  templates: {

    /**
     * renderHeader([index])
     * renderTimepicker()
     * renderCalendar([index])
     */
    container: [
      '<div class="datepicker__container">',
        '<%= obj.renderHeader() %>',
        '<%= obj.renderTimepicker() %>',
        '<%= obj.renderCalendar() %>',
      '</div>'
    ].join(''),

    /**
     * @see `calendar`
     */
    header: [
      '<header class="datepicker__header">',
        '<a class="datepicker__prev<%= (obj.hasPrev) ? "" : " is-disabled" %>" data-prev>&lsaquo;</a>',
        '<span class="datepicker__title"><%= obj.renderMonthSelect() %></span>',
        '<span class="datepicker__title"><%= obj.renderYearSelect() %></span>',
        '<a class="datepicker__next<%= (obj.hasNext) ? "" : " is-disabled" %>" data-next>&rsaquo;</a>',
      '</header>'
    ].join(''),

    /**
     * label - i18n option for `time`
     * renderHourSelect([24hour])
     * renderMinuteSelect()
     * renderPeriodSelect()
     */
    timepicker: [
      '<div class="datepicker__time">',
        '<span class="datepicker__label"><%= obj.label %></span>',
        '<span style="display: inline-flex">',
        '<span class="datepicker__field"><%= obj.renderHourSelect() %></span>:',
        '<span class="datepicker__field"><%= obj.renderMinuteSelect() %></span>',
        '<span class="datepicker__field"><%= obj.renderPeriodSelect() %></span>',
        '</span>',
      '</div>'
    ].join(''),

    /**
      * index - calendar index
      * year - current year
      * month - current month
      * days - @see `day`
      * weekdays - i18n weekdays
      * hasNext - next month is available
      * hasPrev: prev month is available
     */
    calendar: [
      '<table class="datepicker__cal">',
        '<thead>',
          '<tr>',
            '<% obj.weekdays.forEach(function(name) { %>',
              '<th><%= name %></th>',
            '<% }); %>',
          '</tr>',
        '</thead>',
        '<tbody>',
          '<% obj.days.forEach(function(day, i) { %>',
            '<%= (i % 7 == 0) ? "<tr>" : "" %>',
              '<%= obj.renderDay(day) %>',
            '<%= (i % 7 == 6) ? "</tr>" : "" %>',
          '<% }); %>',
        '</tbody>',
      '</table>',
    ].join(''),

    /**
      * date - the serialized date
      * daynum - the day of the month
      * timestamp - date timestamp
      * weekday - i18n weekday
      * isSelected - day is selected
      * isDisabled - day is unavailable
      * isPrevMonth - day is at the end of the previous month
      * isNextMonth - day is at the begining of the next month
      * isThisMonth - day is neither of the above
      * isWeekend - day is a weekend
      * isToday - day is today
      * classNames - relevant `classNames`
     */
    day: [
      '<% obj.classNames.push("datepicker__day"); %>',
      '<td class="<%= obj.classNames.join(" ") %>" data-day="<%= obj.timestamp %>"><div>',
        '<span class="datepicker__daynum"><%= obj.daynum %></span>',
      '</div></td>'
    ].join('')
  }
}
