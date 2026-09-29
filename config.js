/* 網址與內容集中設定。將 url 的空字串換成實際網址即可。
 * 支援 https://、http://、mailto:、相對路徑及 #頁內錨點。
 * newTab: true 為另開分頁；false 為原分頁。空網址會顯示提示，不會連到假系統。
 * 將 previewMode 改為 false 可隱藏預覽提示與示範標記；請先替換示範資料。
 */
window.PORTAL_CONFIG = {
  previewMode: true,
  links: {
    dcc: {title:'DCC 文件管理', description:'文件查詢・版次管理・流程追蹤', url:'', newTab:true, image:'assets/dcc.png'},
    pn: {title:'PN 料號編碼', description:'料號查詢・編碼規則・相關文件', url:'', newTab:true, image:'assets/pn.png'},
    sapCost: {title:'SAP 人力成本估算', description:'成本試算・內部工具・操作說明', url:'', newTab:true, image:'assets/sap-cost.png'},
    sharepoint: {title:'SharePoint 訓練教材', description:'新進員工・操作教學・常見問題', url:'', newTab:true, image:'assets/sharepoint.png'},
    sapTraining: {title:'SAP 訓練教材', description:'S/4HANA・操作手冊・教學資源', url:'', newTab:true, image:'assets/sap-training.png'},
    report: {title:'Y26 Q2 Report', description:'2026 Q2 季度報告', url:'', newTab:true, image:'assets/report.png'},
    vision: {title:'Vision', description:'企業願景', url:'', newTab:true, icon:'eye'},
    join: {title:'Join Us', description:'加入我們', url:'', newTab:true, icon:'people'},
    hr: {title:'人資專區', description:'人事與員工服務', url:'', newTab:true, icon:'person'},
    it: {title:'IT 服務', description:'資訊服務與支援', url:'', newTab:true, icon:'laptop'},
    organization: {title:'公司組織圖', url:'', newTab:true, color:'#48505e'},
    leave: {title:'請假申請表', url:'', newTab:true, color:'#2469c1'},
    travel: {title:'差旅費用申請表', url:'', newTab:true, color:'#2469c1'},
    itRequest: {title:'IT 服務申請單', url:'', newTab:true, color:'#e68c24'},
    handbook: {title:'員工手冊', url:'', newTab:true, color:'#208681'}
  },
  systems: ['dcc','pn','sapCost'],
  training: ['sharepoint','sapTraining','report'],
  documents: ['organization','leave','travel','itRequest','handbook'],
  quickLinks: ['vision','join','hr','it'],
  news: [
    {title:'2026 Q2 工作報告已上線', date:'2026-07-01', url:'', body:'季度工作報告公告示範。請在內容設定檔填入正式報告連結與公告內容。'},
    {title:'SAP 系統維護通知', date:'2026-06-25', url:'', body:'系統維護通知示範。正式公告請填入維護時段、影響範圍及聯絡窗口。'},
    {title:'資安宣導：強化帳號安全', date:'2026-06-20', url:'', body:'資安宣導公告示範。正式內容請依公司資訊安全政策更新。'},
    {title:'新人訓練課程開放報名', date:'2026-06-15', url:'', body:'教育訓練公告示範。正式公告請提供課程日期、報名方式與承辦窗口。'}
  ]
};
