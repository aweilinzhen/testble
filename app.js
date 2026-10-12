/*
 * 智能录音卡设备调试工具 · 可交互前端原型
 * 无第三方依赖；蓝牙/Wi-Fi/设备通讯均使用模拟数据。
 * 真实接入时，将下方 action 函数内的模拟更新替换成设备 SDK / API 调用。
 */
(() => {
  'use strict';

  const ICONS = {
    'chevron-left':'<path d="m15 18-6-6 6-6"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>',
    'more':'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    'bluetooth':'<path d="m7 7 10 10-5 4V3l5 4L7 17"/>',
    'mic':'<rect width="8" height="13" x="8" y="2" rx="4"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3m-4 0h8"/>',
    'wifi':'<path d="M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.9a5 5 0 0 1 7 0M12 20h.01"/>',
    'wifi-off':'<path d="m2 2 20 20M8.5 16.9a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 8.17-3.68M14.5 5.2A15 15 0 0 1 22 8.82M5 12.86a10 10 0 0 1 3.19-2.03M13 10.27a10 10 0 0 1 6 2.59M12 20h.01"/>',
    'clock':'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'refresh':'<path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"/>',
    'file':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    'folder':'<path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z"/>',
    'search':'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    'layers':'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
    'check':'<path d="m20 6-11 11-5-5"/>',
    'check-circle':'<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
    'x':'<path d="M18 6 6 18M6 6l12 12"/>',
    'square':'<rect x="4" y="4" width="16" height="16" rx="1"/>',
    'bookmark':'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    'bookmark-x':'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M10 9l4 4m0-4-4 4"/>',
    'lock':'<rect width="14" height="11" x="5" y="11" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/>',
    'unlock':'<rect width="14" height="11" x="5" y="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
    'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    'upload':'<path d="M12 16V4m-5 5 5-5 5 5"/><path d="M20 16a4 4 0 0 0-3-7.8 6 6 0 0 0-11.3 2A4 4 0 0 0 6 18h12a3 3 0 0 0 2-2Z"/>',
    'power':'<path d="M12 2v10M18.36 6.64a9 9 0 1 1-12.72 0"/>',
    'trash':'<path d="M3 6h18m-2 0-1 14H6L5 6m3 0V4h8v2m-6 4v7m4-7v7"/>',
    'copy':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    'eye':'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off':'<path d="m3 3 18 18M9.9 4.8A10.7 10.7 0 0 1 12 4.6c6.5 0 10 7.4 10 7.4a16 16 0 0 1-3.1 3.7M6.1 6A16 16 0 0 0 2 12s3.5 7.4 10 7.4c1.4 0 2.7-.3 3.8-.9"/><path d="M10 10a3 3 0 0 0 4 4"/>',
    'link':'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/>',
    'info':'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>',
    'hard-drive':'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 15h.01M10 15h.01"/>',
    'pause':'<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    'shield':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    'battery':'<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M5 10h11v4H5z"/>',
    'signal':'<path d="M3 20v-3m5 3v-7m5 7v-11m5 11V4"/>',
    'volume':'<path d="M11 5 6 9H2v6h4l5 4V5ZM15 9a5 5 0 0 1 0 6M18 6a9 9 0 0 1 0 12"/>',
    'alert':'<circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>',
    'terminal':'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/>',
    'usb':'<path d="M12 2v18m0-18 3 3m-3-3L9 5m3 15-4-4m4 4 4-4"/><circle cx="12" cy="21" r="1"/>',
    'cloud':'<path d="M20 16.6A4.5 4.5 0 0 0 18 8a6 6 0 0 0-11.7 1.6A4 4 0 0 0 7 18h11"/>',
  };
  const I = (name, size=18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
  const E = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tabs = [ ['device','设备信息'], ['record','录音'], ['ota','固件升级'], ['wifi','Wi-Fi'], ['files','文件管理'], ['more','更多'] ];
  const nearby = [
    { id:'AOne-0001FA', mac:'FA:01:00:19:30:AC', rssi:-42 },
    { id:'AOne-0001FB', mac:'FA:01:00:19:30:AD', rssi:-65 },
    { id:'AOne-0001FC', mac:'FA:01:00:19:30:AE', rssi:-78 }
  ];
  const s = {
    page:'home', tab:'device', connected:true, name:'AOne-0001FA', mac:'FA:01:00:19:30:AC', battery:78,
    scanning:false, menu:false, devicePopover:false, modal:null, logHeight:265,
    record:{ mode:'idle', elapsed:0, marked:false, locked:false },
    wifi:{ enabled:true, connected:true, ssid:'JiaTui', ssidInput:'JiaTui', password:'12345678', showPassword:false, strength:-42 },
    ota:{ enabled:false, source:'local', url:'', type:'一代卡（3）', file:null, downloaded:false, downloading:false, downloadProgress:0, running:false, progress:0, resumePoint:0, done:false },
    sleepTime:600, sleepInput:'600',
    deviceTime:'2026-10-12 09:41:00', uptime:'2 天 6 小时 18 分钟',
    recordSync:false, markHistory:[{id:1,when:'10月12日 09:21',type:'会议录音',time:'00:01:32'}],
    wifiTest:{last:'尚未测试',rssi:'—'},
    usb:{enabled:false},
    advanced:{paste:'—',frame:{running:false,progress:0},generation:2,g2Files:[],pairing:'已配对',lastCommand:'—'},
    transfers:{active:null,downloads:[],nextId:1},
    fileVisible:4,
    firmwareVersion:'0.2.0',

    files:[
      { id:1, name:'Meeting_20261012_091530.wav', size:'12.8 MB', length:'08:24', date:'今天 09:15' },
      { id:2, name:'Idea_20261011_163208.wav', size:'4.2 MB', length:'02:41', date:'昨天 16:32' },
      { id:3, name:'Meeting_20261010_104126.wav', size:'21.5 MB', length:'14:02', date:'10月10日 10:41' },
    ],
    logs:[]
  };
  let scanTimeout, otaTimer, transferTimer, frameTimer; const fileCatalog=[];
  const app = document.querySelector('#app');
  for(let i=4;i<=18;i++) fileCatalog.push({id:i,name:`${i%3===0?'Idea':'Meeting'}_202610${String(12-Math.floor(i/5)).padStart(2,'0')}_${String(90000+i*423).padStart(6,'0')}.opus`,size:`${(1+i*.78).toFixed(1)} MB`,length:`0${i%9}:3${i%6}`,date:`10月${12-Math.floor(i/5)}日`});
  function allFiles(){return [...s.files,...fileCatalog];}
  function simLog(action,detail,level='success'){addLog('TX',action);addLog(level==='success'?'Result':'Error',detail,level);}
  function checkedConnection(){if(s.connected)return true;addLog('Error','设备未连接，请先连接蓝牙','error');return false;}
  function labelStatus(on){return `<span class="flag ${on?'ok':'gray'}">${on?'已开启':'已关闭'}</span>`;}
  function fieldValue(id,value){const el=app.querySelector(id);if(el)el.textContent=value;}

  function stamp(){ const d=new Date(); return d.toLocaleTimeString('zh-CN',{hour12:false})+'.'+String(d.getMilliseconds()).padStart(3,'0'); }
  function addLog(tag,msg,level='normal'){
    s.logs.push({time:stamp(),tag,msg,level});
    if(s.logs.length>110) s.logs.splice(0,s.logs.length-110);
    const host=document.querySelector('.debug-lines');
    if(host){ host.innerHTML=logLines(); host.scrollTop=host.scrollHeight; }
    const counter=document.querySelector('.log-count');if(counter)counter.textContent=s.logs.length+' 条';
  }
  // 不使用 Toast；状态反馈由页面字段、按钮状态和底部调试日志负责。
  function notify(message){
    const errors = [
      ['有效的 http/https 固件地址', '#firmware-url'],
      ['请输入 Wi-Fi 名称', '#wifi-ssid'],
      ['密码至少', '#wifi-password'],
      ['60–3600', '#sleep-input']
    ];
    const found=errors.find(([term])=>message.includes(term));
    if(found){
      const input=app.querySelector(found[1]);
      if(input){input.classList.add('invalid');input.setAttribute('aria-invalid','true');input.focus();}
    }
  }
  function timeText(sec){ return new Date(sec*1000).toISOString().slice(11,19); }
  function secondsHuman(sec){ return sec%60===0? `${sec/60} 分钟` : `${Math.floor(sec/60)} 分 ${sec%60} 秒`; }
  // 设备信息收纳至右上角图标，避免常驻设备卡片浪费垂直空间。
  function devicePopover(){return s.devicePopover?`<div class="device-popover-backdrop" data-action="device-popover-close" aria-hidden="true"></div>
    <div class="device-popover" role="dialog" aria-label="当前设备详情">
      <div class="device-popover-heading"><span class="pop-status ${s.connected?'online':''}"></span><span>${s.connected?'设备已连接':'设备未连接'}</span></div>
      <div class="device-popover-sn">${E(s.name)}</div>
      <div class="device-popover-row"><span>SN 码</span><strong>${E(s.name)}</strong></div>
      <div class="device-popover-row"><span>蓝牙地址</span><strong>${E(s.mac)}</strong></div>
      <div class="device-popover-row"><span>固件版本</span><strong>${E(s.firmwareVersion)}</strong></div>
      <div class="device-popover-row"><span>设备电量</span><strong>${s.battery}%</strong></div>
      <button type="button" class="device-popover-link" data-action="device-detail">${I('info',15)} 查看设备信息 ${I('chevron-right',15)}</button>
    </div>`:'';}
  function btn(label,action,cls='',disabled=false,attrs=''){return `<button type="button" class="btn ${cls}" data-action="${action}" ${disabled?'aria-disabled="true"':''} ${attrs}>${label}</button>`;}
  function title(text,right=''){return `<div class="title-row"><h2 class="card-title">${text}</h2>${right}</div>`;}
  function row(label,value){return `<div class="info-row"><span class="info-label">${label}</span><span class="info-value">${value}</span></div>`;}
  function smallAction(text,action,ic='refresh'){return `<button type="button" class="tiny-action" data-action="${action}">${I(ic,15)} ${text}</button>`;}
  function header(){
    if(s.page==='home')return '';
    const isDevice = s.page==='device';
    const caption = ({device:'录音卡',scan:'扫描蓝牙连接设备',sleep:'休眠',framework:'测试通话框架',advanced:'高级调试'})[s.page] || '录音卡';
    return `<div class="top-bar"><button type="button" class="round-button" aria-label="返回" data-action="back">${I('chevron-left',24)}</button><h1>${caption}</h1>${isDevice ? `<div class="top-actions"><button type="button" class="round-button device-trigger ${s.devicePopover?'selected':''}" aria-label="查看已连接设备信息" aria-expanded="${s.devicePopover}" data-action="device-popover">${I('bluetooth',21)}<span class="top-device-dot ${s.connected?'online':''}"></span></button><button type="button" class="round-button" aria-label="更多操作" data-action="menu">${I('more',23)}</button></div>` : `<span class="round-placeholder"></span>`}</div>`;
  }
  function statusBar(){return `<div class="status-bar"><span>9:41</span><div class="status-right">${I('signal',18)}${I('wifi',17)}<span class="battery-shell"></span></div></div>`;}
  function tabStrip(){return `<nav class="tab-strip" aria-label="设备功能分页">${tabs.map(([key,label])=>`<button type="button" class="tab-btn ${s.tab===key?'active':''}" data-action="tab" data-tab="${key}" aria-current="${s.tab===key?'page':'false'}" aria-selected="${s.tab===key?'true':'false'}">${label}</button>`).join('')}</nav>`;}

  function home(){ return `<div class="home-head"><div class="version">App Version: 1.0.7 (Build 2)</div><h2>设备调试工具</h2><div class="english">Device Debug Tool</div></div><div class="home-list">
    <button type="button" class="home-nav-card" data-action="goto" data-page="framework"><span class="home-icon">${I('layers',31)}</span><span style="flex:1"><span class="home-nav-title">Test call framework.</span><span class="home-nav-desc" style="display:block">测试通话框架</span></span><span class="nav-arrow">${I('chevron-right',22)}</span></button>
    <button type="button" class="home-nav-card" data-action="goto" data-page="scan"><span class="home-icon blue">${I('bluetooth',33)}</span><span style="flex:1"><span class="home-nav-title">扫描蓝牙连接设备</span><span class="home-nav-desc" style="display:block">扫描、连接和管理蓝牙设备</span></span><span class="nav-arrow">${I('chevron-right',22)}</span></button>
    <button type="button" class="home-nav-card" data-action="goto" data-page="device"><span class="home-icon">${I('mic',32)}</span><span style="flex:1"><span class="home-nav-title">录音卡</span><span class="home-nav-desc" style="display:block">录音卡功能调试</span></span><span class="nav-arrow">${I('chevron-right',22)}</span></div>
    <button type="button" class="home-nav-card" data-action="goto" data-page="advanced"><span class="home-icon gray-purple">${I('terminal',30)}</span><span style="flex:1"><span class="home-nav-title">高级调试</span><span class="home-nav-desc" style="display:block">协议测试、U 盘、设备维护与音频帧</span></span><span class="nav-arrow">${I('chevron-right',22)}</span></button></div>`; }

  // 扫描页统一使用固定大小的图标、对齐的设备信息和操作区。
  function scan(){
    const current = s.connected
      ? `<div class="scan-current-row">
          <span class="scan-device-icon is-blue">${I('bluetooth',24)}</span>
          <div class="scan-device-body">
            <div class="scan-name">${E(s.name)}</div>
            <div class="scan-meta">${E(s.mac)}</div>
            <div class="scan-meta scan-extra">固件版本：0.2.0 <span>电量：${s.battery}%</span></div>
          </div>
          <span class="scan-connected"><span class="scan-live-dot"></span>已连接</span>
        </div>`
      : `<div class="scan-not-connected">${I('bluetooth',19)} 当前没有连接的蓝牙设备</div>`;
    const paired = `<div class="scan-card scan-paired">
      <span class="scan-device-icon">${I('bluetooth',24)}</span>
      <div class="scan-device-body"><div class="scan-name">AOne-0001FA</div><div class="scan-meta">FA:01:00:19:30:AC · 已配对</div><div class="scan-meta scan-extra">固件版本：0.2.0 <span>电量：78%</span></div></div>
      <button type="button" class="icon-button scan-info" aria-label="查看配对设备" data-action="goto" data-page="device">${I('info',19)}</button>
    </div>`;
    const found = nearby.map(d=>`<div class="scan-card scan-discovered">
      <span class="scan-device-icon">${I('bluetooth',23)}</span>
      <div class="scan-device-body"><div class="scan-name">${E(d.id)}</div><div class="scan-meta">${E(d.mac)}</div></div>
      <span class="signal-readout">${I('signal',16)} <span>${d.rssi} dBm</span></span>
      <button type="button" class="scan-button ${s.connected&&s.name===d.id?'is-current':''}" aria-pressed="${s.connected&&s.name===d.id}" data-action="connect-device" data-device="${E(d.id)}">${s.connected&&s.name===d.id?'查看':'连接'}</button>
    </div>`).join('');
    return `<section class="scan-current-card"><div class="scan-current-label">当前连接设备</div>${current}</section>
      ${btn(`${I('search',19)} ${s.scanning?'正在扫描…':'开始扫描'}`,'scan',`${s.scanning?'is-loading':'primary'} full scan-trigger`,s.scanning)}
      <div class="scan-section-title"><span>已配对设备</span><small>1 个</small></div>
      ${paired}
      <div class="scan-section-title"><span>扫描设备 ${s.scanning?'<span class="scan-pulse"></span><span class="scan-running">正在扫描…</span>':''}</span><small>${nearby.length} 个</small></div>
      <div class="scan-list">${found}</div>`;
  }

  function deviceInfo(){return `<section class="white-card">
    ${title('设备信息',smallAction('刷新','refresh-device'))}
    <div class="info-table">${row('配对状态','已配对')}${row('蓝牙地址',E(s.mac))}${row('设备型号','AOne')}${row('SN号',E(s.name))}${row('固件版本',E(s.firmwareVersion))}${row('硬件版本','1.0.1')}${row('休眠时间',s.sleepTime+' 秒')}</div></section>
    <section class="white-card">${title('运行状态')}<div class="info-table">
    ${row('电量',`<span class="inline-value">${s.battery}% <span style="color:#1ac466">${I('battery',21)}</span></span>`)}
    ${row('存储容量','32 GB')}${row('已用空间','12.6 GB')}${row('可用空间','19.4 GB')}${row('设备状态',s.usb.enabled?'U 盘模式':'正常')}${row('运行时长',E(s.uptime))}${row('设备时间',`<span id="device-time-text">${E(s.deviceTime)}</span>`)}${row('最后连接时间','2026-10-12 09:38:55')}</div>
    <div class="compact-commands">${smallAction('查询电量','query-battery','battery')}${smallAction('查询 SN','query-sn','search')}${smallAction('查询存储','query-storage','hard-drive')}${smallAction('查询状态','query-device-state','refresh')}</div></section>
    <section class="white-card">${title('设备时间')}<p class="section-tip">设备时间可独立查询，或使用手机当前时间同步（模拟）。</p>
    <div class="action-grid">${btn(`${I('clock',17)} 查询设备时间`,'time-query')}${btn(`${I('refresh',17)} 同步到设备`,'time-sync')}</div></section>
    <section class="white-card"><button type="button" class="settings-entry" data-action="goto" data-page="advanced"><span class="file-icon">${I('terminal',20)}</span><span class="settings-entry-text"><b>高级调试</b><small>U 盘模式、恢复出厂、协议与音频帧</small></span>${I('chevron-right',19)}</button></section>`; }

    function record(){const r=s.record;const idle=r.mode==='idle';return `<section class="white-card">${title('录音控制')}
    <div class="state-strip"><span class="muted">当前状态</span><span class="state-primary"><span class="purple-dot ${idle?'':'green-dot'}"></span><span id="record-state">${idle?'未录音':r.mode==='meeting'?'会议录音中':'闪念录音中'}</span></span><span class="muted">录音时长</span><strong id="record-timer">${timeText(r.elapsed)}</strong></div>
    <div class="action-grid">
      ${btn(`${I('mic',21)} 开始会议录音`,'record-meeting',r.mode==='meeting'?'is-selected':idle?'primary':'',r.mode==='idea',`aria-pressed="${r.mode==='meeting'}"`)}
      ${btn(`${I('mic',21)} 开始闪念录音`,'record-idea',r.mode==='idea'?'is-selected':'',r.mode==='meeting',`aria-pressed="${r.mode==='idea'}"`)}
      ${btn(`${I('square',20)} 停止录音`,'record-stop','',idle)}
      ${btn(`${I('bookmark',20)} 打开 MARK`,'mark-on',!idle&&r.marked?'is-selected':'',idle,`aria-pressed="${!idle&&r.marked}"`)}
      ${btn(`${I('bookmark-x',20)} 关闭 MARK`,'mark-off','',idle,`aria-pressed="${!idle&&!r.marked}"`)}
      ${btn(`${I('refresh',19)} 查询录音状态`,'record-check','')}
      ${btn(`${I('lock',20)} 查询锁定状态`,'record-lock-check','')}
      ${btn(`${I('lock',20)} 锁定录音`,'record-lock',!idle&&r.locked?'is-selected':'',idle,`aria-pressed="${!idle&&r.locked}"`)}
      ${btn(`${I('unlock',20)} 解锁录音`,'record-unlock','',idle,`aria-pressed="${!idle&&!r.locked}"`)}
    </div></section>
    <section class="white-card">${title('录音同步',labelStatus(s.recordSync))}
      <p class="section-tip">查看或切换设备的录音同步开关。</p>
      <div class="action-grid">${btn(`${I('refresh',17)} 查询同步状态`,'sync-query')}${btn(`${I('check-circle',17)} 开启同步`,'sync-on',s.recordSync?'is-selected':'',false,`aria-pressed="${s.recordSync}"`)}${btn(`${I('power',17)} 关闭同步`,'sync-off',!s.recordSync?'is-selected':'',false,`aria-pressed="${!s.recordSync}"`)}</div>
    </section><section class="white-card">${title('MARK 记录',smallAction('获取 MARK','mark-query','bookmark'))}
      <div class="mini-list">${s.markHistory.length?s.markHistory.slice(0,6).map(m=>`<div class="mini-item"><span>${I('bookmark',15)} ${E(m.type)} · ${E(m.time)}</span><small>${E(m.when)}</small></div>`).join(''):'<div class="empty-state">暂无 MARK 记录</div>'}</div>
    </section>`; }

  function ota(){const o=s.ota;const local=o.source==='local';const hasFile=!!o.file;const canUpgrade=o.enabled&&!o.running&&!o.downloading&&(local?hasFile:o.downloaded);
    return `<section class="white-card">${title('固件升级（OTA）',`<span class="flag ${o.enabled?'ok':'gray'}">${o.enabled?'OTA 已开启':'OTA 未开启'}</span>`)}
    <div class="step-head"><span>1. 开启 OTA</span></div>
    <p class="section-tip">先开启设备 OTA 模式，再选择固件并执行升级。</p>
    ${btn(`${I(o.enabled?'check-circle':'wifi',19)} ${o.enabled?'OTA 已开启':'打开 OTA'}`,'ota-open',`full ${o.enabled?'is-selected':'primary'}`,false,`aria-pressed="${o.enabled}"`)}
    ${o.enabled?`<div style="text-align:right;margin-top:8px"><button type="button" class="tiny-action" data-action="ota-close">${I('power',15)} 关闭 OTA</button></div>`:''}
    <div class="step-head"><span>2. 选择固件来源</span></div>
    <div class="choice-grid"><button type="button" class="choice-btn ${local?'chosen':''}" data-action="ota-source" data-source="local" aria-pressed="${local}" ${o.running||o.downloading?'aria-disabled="true"':''}><span class="radio-ring"></span>本地固件</button><button type="button" class="choice-btn ${!local?'chosen':''}" data-action="ota-source" data-source="online" aria-pressed="${!local}" ${o.running||o.downloading?'aria-disabled="true"':''}><span class="radio-ring"></span>线上固件</button></div>
    ${local? localFirmware():onlineFirmware()}
    <div class="step-head"><span>${local?'4':'5'}. 开始升级</span></div>
    <p class="section-tip">${local?'将选择的固件发送至设备，进行升级。':'固件下载成功后，才能将固件发送到设备。'}</p>
    ${btn(`${I('upload',18)} ${o.running?'正在升级…':o.done?'升级已完成':'开始升级'}`,'ota-upgrade',`${o.done?'is-complete':o.running?'is-loading':'primary'} full`,!canUpgrade||o.done,`aria-busy="${o.running}"`)}
    <div class="progress-wrap"><div class="progress-top"><strong>升级进度</strong><span class="progress-num">${o.progress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${o.progress}%"></div></div><div class="progress-caption">${o.done?'升级成功（演示数据）':o.running?'固件传输中，请保持设备连接…':'等待开始升级…'}</div></div>
    ${o.running?btn(`${I('x',16)} 取消升级`,'ota-cancel','gray full',false,'style="margin-top:10px"'):''}
    ${o.resumePoint>0&&!o.running?`<div class="resume-card"><div><strong>检测到中断的升级任务</strong><small>已传输 ${o.resumePoint}%，可以尝试断点升级</small></div>${btn(`${I('refresh',17)} 断点升级`,'ota-resume','secondary small',false)}</div>`:''}
    ${o.done?`<div class="ota-status">${I('check-circle',16)} 固件升级流程已完成（模拟）</div>`:''}
    <div class="ota-warning">提示：此页面是前端演示，不会向真实蓝牙设备写入固件。</div>
    </section>`;
  }
  function localFirmware(){ const o=s.ota;const f=o.file;return `<div class="step-head"><span>3. 选择固件文件</span></div>
    <button type="button" class="file-picker ${f?'is-selected-file':''}" data-action="pick-file" ${!o.enabled?'aria-disabled="true"':''}>
      <span class="file-picker-icon">${I('file',24)}</span><span style="min-width:0;flex:1"><span class="file-picker-name">${f?E(f.name):'选择固件文件'}</span><span class="file-picker-hint">${f?formatBytes(f.size):'支持 .bin、.zip 格式'}</span></span><span class="right-icon">${I('chevron-right',18)}</span>
    </button><input type="file" id="ota-file" accept=".bin,.zip" hidden />
    ${f?`<div class="firmware-facts" style="margin-top:10px"><div class="fact-line"><span class="fact-label">文件名称</span><span class="fact-value">${E(f.name)}</span></div><div class="fact-line"><span class="fact-label">文件大小</span><span>${formatBytes(f.size)}</span></div><div class="fact-line"><span class="fact-label">固件类型</span><span>一代卡（3）</span></div></div>`:''}`; }
  function onlineFirmware(){const o=s.ota;return `<div class="step-head"><span>3. 输入固件地址</span></div>
      <label class="form-label" for="firmware-url" style="margin-top:2px">固件下载地址</label>
      <div class="input-wrap"><input class="form-input" id="firmware-url" data-field="ota-url" type="url" autocomplete="off" spellcheck="false" placeholder="请输入固件下载地址（http/https）" value="${E(o.url)}" ${!o.enabled||o.running||o.downloading?'disabled':''} /><button type="button" class="input-action" data-action="ota-url-clear" aria-label="清空固件地址" ${!o.enabled?'aria-disabled="true"':''}>${I('x',17)}</button></div>
      <label class="form-label" for="fw-type">固件类型</label><select id="fw-type" data-field="ota-type" class="form-select" ${!o.enabled||o.running?'disabled':''}><option ${o.type==='一代卡（3）'?'selected':''}>一代卡（3）</option><option ${o.type==='二代卡（4）'?'selected':''}>二代卡（4）</option></select>
      <div class="step-head"><span>4. 下载固件</span></div>
      ${btn(`${I('download',18)} ${o.downloading?'下载中…':o.downloaded?'重新下载固件':'下载固件'}`,'ota-download',`${o.downloading?'is-loading':o.downloaded?'is-selected':'secondary'} full`,!o.enabled||o.downloading||o.running,`aria-busy="${o.downloading}"`)}
      ${o.downloading?`<div class="progress-wrap"><div class="progress-top"><strong>下载进度</strong><span class="progress-num">${o.downloadProgress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${o.downloadProgress}%"></div></div></div>`:''}
      ${o.downloaded?`<div class="ota-status">${I('check-circle',16)} 固件已下载（演示）：${E(fileNameFromUrl(o.url))}</div><div class="firmware-facts" style="margin-top:9px"><div class="fact-line"><span class="fact-label">当前版本</span><span>0.2.0</span></div><div class="fact-line"><span class="fact-label">固件类型</span><span>${E(o.type)}</span></div></div>`:''}`; }
  function formatBytes(bytes){ if(!Number.isFinite(bytes))return '—'; if(bytes<1024)return bytes+' B'; return (bytes/1024/1024).toFixed(2)+' MB'; }
  function fileNameFromUrl(url){try{const p=new URL(url).pathname.split('/').filter(Boolean); return p.pop()||'firmware.bin';}catch{return 'firmware.bin';}}
  function isUrlValid(url){try{return ['https:','http:'].includes(new URL(url).protocol);}catch{return false;}}

  function wifi(){ const w=s.wifi;return `<section class="white-card">${title('Wi-Fi 状态',smallAction('查询状态','wifi-check'))}
    <div class="info-table wifi-status-table">${row('Wi-Fi 开关',`<span class="${w.enabled?'status-good':'status-neutral'}">${w.enabled?'已开启':'已关闭'}</span>`)}
    ${row('Wi-Fi 名称',w.enabled&&w.connected?E(w.ssid):'—')}
    ${row('连接状态',w.enabled&&w.connected?'已连接':'未连接')}
    ${row('信号强度',w.enabled&&w.connected?`<span class="inline-value"><span style="color:#0dbf54">${I('wifi',18)}</span> ${w.strength} dBm</span>`:'—')}</div>
    <div style="margin-top:12px" class="device-choices">${btn(`${I('wifi',17)} 打开 Wi-Fi`,'wifi-on',w.enabled?'is-selected':'',false,`aria-pressed="${w.enabled}"`)}${btn(`${I('wifi-off',17)} 关闭 Wi-Fi`,'wifi-off',!w.enabled?'is-selected':'',false,`aria-pressed="${!w.enabled}"`)}</div>
    </section><section class="white-card">${title('连接 Wi-Fi',w.enabled?'':'<span style="font-size:11px;color:#929ab5">需先开启 Wi-Fi</span>')}
    <div class="form-panel"><label class="form-label" for="wifi-ssid" style="margin-top:0">Wi-Fi 名称（SSID）</label><div class="input-wrap"><input class="form-input" id="wifi-ssid" data-field="wifi-ssid" placeholder="输入 Wi-Fi 名称" value="${E(w.ssidInput)}" ${!w.enabled?'disabled':''}/><button class="input-action" type="button" aria-label="清空名称" data-action="wifi-clear" ${!w.enabled?'aria-disabled="true"':''}>${I('x',17)}</button></div>
    <label class="form-label" for="wifi-password">Wi-Fi 密码</label><div class="input-wrap"><input class="form-input" id="wifi-password" data-field="wifi-password" type="${w.showPassword?'text':'password'}" placeholder="请输入 Wi-Fi 密码" value="${E(w.password)}" ${!w.enabled?'disabled':''}/><button type="button" class="input-action ${w.showPassword?'is-revealed':''}" data-action="wifi-toggle-password" aria-label="切换密码可见性" ${!w.enabled?'aria-disabled="true"':''}>${I(w.showPassword?'eye-off':'eye',18)}</button></div>
    <label class="checkbox-line"><input type="checkbox" data-field="wifi-show-password" ${w.showPassword?'checked':''} ${!w.enabled?'disabled':''}> 显示密码</label>
    ${btn(`${I('wifi',17)} ${w.connected&&w.ssidInput.trim()===w.ssid?'已连接 '+E(w.ssid):'连接 Wi-Fi'}`,'wifi-connect',`${w.connected&&w.ssidInput.trim()===w.ssid?'is-selected':'primary'} full`,!w.enabled,`aria-pressed="${w.enabled&&w.connected&&w.ssidInput.trim()===w.ssid}"`)}
    ${!w.enabled?'<div class="disabled-message">打开 Wi-Fi 后才能填写名称、密码并连接。</div>':''}
    </div></section><section class="white-card">${title('Wi-Fi 测试',smallAction('运行测试','wifi-test','signal'))}
    <div class="info-table">${row('测试结果',E(s.wifiTest.last))}${row('信号强度',E(s.wifiTest.rssi))}</div>
    <p class="form-hint">用于验证 Wi-Fi 状态与模拟网络连通性，不执行真实测速。</p></section>`; }

  function fileRows(list){return list.map(f=>`<div class="file-row" data-file-id="${f.id}"><div class="file-icon">${I('file',18)}</div><div style="flex:1;min-width:0"><div class="file-name" title="${E(f.name)}">${E(f.name)}</div><div class="file-details">${E(f.size)} · ${E(f.length||'—')} · ${E(f.date)}</div></div><button type="button" class="icon-button" data-action="download-file" data-id="${f.id}" aria-label="传输 ${E(f.name)}">${I('download',16)}</button><button type="button" class="icon-button danger" data-action="remove-file" data-id="${f.id}" aria-label="删除 ${E(f.name)}">${I('trash',16)}</button></div>`).join('');}
  function files(){ const t=s.transfers.active;const list=allFiles();return `<section class="white-card">${title('设备文件',smallAction('刷新','refresh-files'))}
      <div class="flag-row" style="justify-content:space-between;margin-bottom:7px"><span class="page-subtitle" style="margin:0">共 ${list.length} 个文件 · 已加载 ${Math.min(s.fileVisible,list.length)} 个</span><button class="text-action danger-text" data-action="clear-files">清空文件</button></div>
      <div class="file-list">${list.length?fileRows(list.slice(0,s.fileVisible)):`<div class="empty-state">${I('folder',28)} 暂无设备文件</div>`}</div>
      ${s.fileVisible<list.length?`<div class="load-marker" data-action="load-more-files">继续下滑自动加载剩余文件</div>`:''}</section>
      <section class="white-card">${title('文件传输')}
      ${t?`<div class="transfer-card"><div class="transfer-heading"><strong>${E(t.name)}</strong><span class="flag ${t.status==='done'?'ok':'gray'}">${t.status==='running'?'传输中':t.status==='paused'?'已暂停':'已完成'}</span></div>
      <div class="progress-top"><span>${t.status==='done'?'传输已完成':t.status==='paused'?'可从已完成的位置继续':'正在传输模拟数据'}</span><strong>${t.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${t.progress}%"></div></div>
      <div class="transfer-actions">${t.status==='running'?btn('取消传输','transfer-cancel','gray small'):''}${t.status==='paused'?btn('断点续传','transfer-resume','secondary small'):''}${t.status==='paused'?btn('结束任务','transfer-close','gray small'):''}${t.status==='done'?btn('关闭记录','transfer-close','gray small'):''}</div></div>`:`<div class="empty-compact">选择上方文件的下载图标开始模拟传输，支持取消与断点续传。</div>`}
      <div class="subline-header"><strong>已下载文件</strong><span>${s.transfers.downloads.length} 个</span></div>
      ${s.transfers.downloads.length?`<div class="mini-list">${s.transfers.downloads.map(d=>`<div class="mini-item"><span>${I('check-circle',15)} ${E(d.name)}</span><button type="button" class="text-action" data-action="local-file" data-id="${d.id}">本地音频数据</button></div>`).join('')}</div>`:'<div class="empty-compact">暂无已完成的文件传输</div>'}
      <p class="form-hint">列表分页自动加载；这里显示的是前端模拟任务，不会读取真实音频。</p>
      </section>`; }

  function advanced(){const a=s.advanced, f=a.frame;return `<section class="white-card">${title('设备维护',`<span class="flag gray">高级指令</span>`)}
      <p class="section-tip">独立研发调试入口，不影响「更多」中只保留休眠的设计。</p>
      <div class="action-grid">
      ${btn('查询配对','pair-query')}${btn('获取电量','query-battery')}${btn('查询 SN 号','query-sn')}${btn('存储信息','query-storage')}${btn('设备状态','query-device-state')}${btn('查询设备时间','time-query')}${btn('同步时间到设备','time-sync')}${btn('恢复出厂设置','factory-reset','danger')}
      </div></section>
      <section class="white-card">${title('U 盘模式',labelStatus(s.usb.enabled))}<div class="action-grid">
      ${btn(`${I('refresh',16)} 查询 U 盘模式`,'usb-query')}${btn(`${I('usb',16)} 打开 U 盘`,'usb-on',s.usb.enabled?'is-selected':'',false,`aria-pressed="${s.usb.enabled}"`)}${btn(`${I('power',16)} 关闭 U 盘`,'usb-off',!s.usb.enabled?'is-selected':'',false,`aria-pressed="${!s.usb.enabled}"`)}</div>
      <p class="form-hint">U 盘模式属于设备模拟状态，并不挂载真实磁盘。</p></section>
      <section class="white-card">${title('第二代文件与音频帧')}
      <div class="action-grid">${btn('查询二代音频文件','g2-query')}${btn('传输音频帧','frame-start',f.running?'is-selected':'',f.running)}${btn('取消传输音频帧','frame-cancel','',!f.running)}${btn('查看本地音频数据','local-audio-list')}</div>
      ${f.running?`<div class="progress-wrap"><div class="progress-top"><strong>音频帧传输中</strong><span>${f.progress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${f.progress}%"></div></div></div>`:''}
      ${a.g2Files.length?`<div class="subline-header"><strong>二代音频文件</strong><span>${a.g2Files.length} 个</span></div><div class="mini-list">${a.g2Files.map(x=>`<div class="mini-item"><span>${I('file',15)} ${E(x.name)}</span><small>${E(x.size)}</small></div>`).join('')}</div>`:''}</section>
      <section class="white-card">${title('协议及网络测试')}
        <div class="action-grid">${btn('粘贴 0x00','paste-00')}${btn('粘贴 0x01','paste-01')}${btn('Wi-Fi 测试','wifi-test')}${btn('查询录音同步','sync-query')}
        </div><div class="info-table" style="margin-top:12px">${row('最近指令',E(a.lastCommand))}${row('协议测试结果',E(a.paste))}</div>
      </section><section class="white-card">${title('操作说明')}<p class="section-tip" style="margin:0">所有指令都是前端模拟状态与日志，正式接入需按硬件协议映射命令码、返回值与错误状态。恢复出厂、删除等危险操作需要二次确认。</p></section>`; }

    function more(){return `<section class="white-card" style="padding:9px 10px"><button type="button" class="home-nav-card" data-action="goto" data-page="sleep" style="min-height:73px;margin:0;background:#fff;border:0;padding:7px 8px;border-radius:12px"><span class="home-icon" style="width:43px;height:43px;border-radius:11px;background:#f2edff;color:var(--accent)">${I('clock',23)}</span><span style="flex:1"><span class="home-nav-title" style="font-size:14px">休眠</span><span class="home-nav-desc" style="display:block;margin-top:4px;font-size:11px">设置设备无操作时的休眠时间</span></span>${I('chevron-right',19)}</button></section>`; }
  function sleep(){return `<section class="white-card"><div class="sleep-count"><div class="page-subtitle" style="font-size:13px;color:#666e8a">当前休眠时间</div><div class="value">${s.sleepTime} 秒</div><div class="conversion">${secondsHuman(s.sleepTime)}</div></div></section>
    <section class="white-card">${title('休眠时间设置')}<p class="section-tip">设备在无操作一段时间后将自动进入休眠状态。</p>
    <label class="form-label" for="sleep-input">休眠时间（秒）</label><div class="input-wrap"><input class="form-input" id="sleep-input" data-field="sleep" type="number" inputmode="numeric" min="60" max="3600" step="1" value="${E(s.sleepInput)}"/><button type="button" class="input-action" data-action="sleep-clear" aria-label="清空">${I('x',16)}</button></div>
    <div class="form-hint">范围：60 – 3600 秒</div>${btn('设置休眠时间','set-sleep','primary full',false,'style="margin-top:19px"')}
    ${s.sleepTime!==600?`<div class="ota-status">${I('check-circle',17)} 当前设置：${s.sleepTime} 秒</div>`:''}</section>`; }
  function framework(){return `<section class="white-card">${title('测试通话框架')}<p class="section-tip">此入口保留为调试演示，用于模拟通话框架的指令状态。</p><div class="action-grid">${btn(`${I('mic',18)} 发起测试`,'framework-start','primary')}${btn(`${I('square',17)} 结束测试`,'framework-stop')}${btn(`${I('refresh',18)} 查询状态`,'framework-query')}</div></section>`; }
  function logLines(){return s.logs.map(l=>`<div class="log-line ${l.level}"><span class="log-time">[${E(l.time)}]</span><span class="log-tag">${E(l.tag)}</span><span class="log-text">${E(l.msg)}</span></div>`).join('')||'<div class="log-line">暂无调试日志</div>';}
  function debugPanel(){return `<section class="debug-sheet" style="--log-height:${s.logHeight}px" aria-label="调试日志面板">
    <div class="debug-drag-zone" role="separator" tabindex="0" aria-label="上下拖动以调整日志区域高度" aria-orientation="horizontal" title="向上滑动放大日志，向下滑动缩小日志"><span class="debug-grabber"></span></div>
    <div class="debug-title"><h2 class="card-title">调试日志 <span class="log-count">${s.logs.length} 条</span></h2><div class="debug-actions">${smallAction('复制全部','copy-log','copy')}${smallAction('清空','clear-log','trash')}</div></div>
    <div class="debug-lines" role="log" aria-live="off">${logLines()}</div></section>`;}
  function modalMarkup(){ if(!s.modal)return '';const m=s.modal;let titleText='确认操作',bodyText='确认继续？';
    if(m.kind==='delete'){titleText='删除文件';bodyText=`确定删除「${m.name}」吗？该操作仅在前端演示数据中生效。`;}
    if(m.kind==='clear-files'){titleText='清空全部设备文件';bodyText='这会清除演示设备文件列表。实际设备上该操作不可恢复，请确认。';}
    if(m.kind==='factory-reset'){titleText='恢复出厂设置';bodyText='恢复出厂会重置设备配置。此页面仅执行模拟恢复，不会操作真实设备。';}
    if(m.kind==='local-audio'){titleText='本地音频数据';bodyText=m.name?`文件：${m.name}。演示版仅保存模拟文件记录，未获取设备实际音频字节。`:`共有 ${s.transfers.downloads.length} 条已下载演示记录，实际设备音频需接入协议后读取。`; }
    if(m.kind==='disconnect'){titleText='断开蓝牙';bodyText='确定断开当前录音卡连接吗？';}
    if(m.kind==='cancel-ota'){titleText='中断升级';bodyText=`确认中断当前模拟升级？已完成的 ${s.ota.progress}% 会被保留，用于演示断点升级。`;}
    return `<div class="modal-overlay"><div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><h3 id="dialog-title">${E(titleText)}</h3><p>${E(bodyText)}</p><div class="modal-actions">${m.kind==='local-audio'?'':btn('取消','modal-close','gray small')}${btn(m.kind==='local-audio'?'关闭':'确认',m.kind==='local-audio'?'modal-close':'modal-confirm','primary small')}</div></div></div>`; }

    function floatingMenu(){return s.menu?`<div class="menu-overlay" data-action="menu-close"></div><div class="float-menu"><button data-action="menu-scan">${I('search',17)} 扫描其他设备</button><button data-action="menu-disconnect">${I('power',17)} 断开连接</button></div>`:'';}
  function isDebugPage(){return s.page==='device'||s.page==='framework'||s.page==='advanced';}
  function view(){ if(s.page==='home')return home();if(s.page==='scan')return scan();if(s.page==='sleep')return sleep();if(s.page==='framework')return framework();if(s.page==='advanced')return advanced();return ({device:deviceInfo,record,ota,wifi,files,more})[s.tab](); }
  function render({resetScroll=false}={}){
    const previous=app.querySelector('.scroll-area');const saved=(!resetScroll&&previous)?previous.scrollTop:0;
    const debug=isDebugPage();
    app.innerHTML=`<div class="phone ${debug?'with-logs':''}">
      ${statusBar()}${header()}${s.page==='device'?tabStrip():''}
      <main class="scroll-area" id="main-scroll"><div class="screen-content ${s.page==='home'?'home-content':''}">${view()}</div></main>
      ${debug?debugPanel():''}
      ${devicePopover()}${floatingMenu()}${modalMarkup()}<div class="home-indicator"></div></div>`;
    const current=app.querySelector('.scroll-area');if(current)current.scrollTop=saved;
    const activeTab=app.querySelector('.tab-btn.active');if(activeTab&&resetScroll)activeTab.scrollIntoView({block:'nearest',inline:'nearest'});
    const lines=app.querySelector('.debug-lines');if(lines)lines.scrollTop=lines.scrollHeight;
  }
  function nav(page,tab){s.page=page;if(tab)s.tab=tab;s.menu=false;s.devicePopover=false;s.modal=null;if(page==='sleep')s.sleepInput=String(s.sleepTime);render({resetScroll:true});
    const labels={home:'设备调试工具',scan:'蓝牙扫描',device:'录音卡',sleep:'休眠设置',framework:'测试通话框架',advanced:'高级调试'};
    notify('已进入'+(labels[page]||'页面'));
  }
  function requireConnection(){if(s.connected)return true;notify('请先连接蓝牙设备');nav('scan');return false;}
  function recordAction(mode){if(!requireConnection())return;if(s.record.mode!=='idle'){notify(s.record.mode===mode?'当前模式正在录音':'请先停止当前录音后切换模式');return;}s.record.mode=mode;s.record.elapsed=0;s.record.marked=false;s.record.locked=false;addLog('TX',mode==='meeting'?'开始会议录音':'开始闪念录音');addLog('Result','录音已开始','success');render();notify('录音已开始（模拟）');}
  function startDownload(){const o=s.ota;if(!o.enabled){notify('请先打开 OTA');return;}if(!isUrlValid(o.url)){notify('请输入有效的 http/https 固件地址');return;}o.downloaded=false;o.downloading=true;o.downloadProgress=0;o.done=false;o.progress=0;addLog('TX',`下载线上固件：${o.url}`);render();let n=0;clearInterval(otaTimer);otaTimer=setInterval(()=>{n+=20;o.downloadProgress=Math.min(100,n);const bar=app.querySelector('.progress-wrap .progress-fill');if(bar&&o.downloading)bar.style.width=n+'%';const num=app.querySelector('.progress-wrap .progress-num');if(num&&o.downloading)num.textContent=n+'%';if(n>=100){clearInterval(otaTimer);o.downloading=false;o.downloaded=true;addLog('Result','线上固件下载完成（模拟）','success');render();notify('固件下载完成，可以开始升级');}},320);}
  function startUpgrade(){const o=s.ota;if(!o.enabled){notify('请先打开 OTA');return;}if(o.source==='local'&&!o.file){notify('请先选择固件文件');return;}if(o.source==='online'&&!o.downloaded){notify('请先下载固件');return;}if(!requireConnection())return;o.running=true;o.progress=0;o.resumePoint=0;o.done=false;addLog('TX',`开始升级：${o.source==='local'?o.file.name:fileNameFromUrl(o.url)}`);addLog('RX','设备进入固件升级流程');render();let n=0;clearInterval(otaTimer);otaTimer=setInterval(()=>{n+=10;o.progress=Math.min(100,n);const bar=app.querySelector('.progress-wrap .progress-fill');if(bar)bar.style.width=n+'%';const num=app.querySelector('.progress-wrap .progress-num');if(num)num.textContent=n+'%';const cap=app.querySelector('.progress-caption');if(cap)cap.textContent='固件传输中，请保持设备连接…';if(n%20===0)addLog('Progress',n+'%');if(n>=100){clearInterval(otaTimer);o.running=false;o.done=true;o.resumePoint=0;addLog('Result','模拟固件升级成功','success');render();notify('升级流程完成（模拟）');}},430);}
  async function copyLogs(){const text=s.logs.map(l=>`[${l.time}] ${l.tag} ${l.msg}`).join('\n');if(!text){notify('暂无日志可复制');return;}try{await navigator.clipboard.writeText(text);notify('日志已复制');}catch{const el=document.createElement('textarea');el.value=text;el.style.position='absolute';el.style.opacity='0';document.body.append(el);el.select();try{document.execCommand('copy');notify('日志已复制');}catch{notify('复制失败，请在安全上下文中运行');}el.remove();}}

  function beginTransfer(file,resume=false){
    if(!checkedConnection())return;
    const t=s.transfers;
    if(t.active&&t.active.status==='running'){addLog('Error','已有传输任务，请先取消','error');return;}
    if(!resume){t.active={id:t.nextId++,fileId:file.id,name:file.name,progress:0,status:'running'};}
    else if(t.active){t.active.status='running';}
    else return;
    addLog('TX',`${resume?'断点续传':'传输文件'}：${t.active.name}（模拟）`);
    clearInterval(transferTimer);render();
    transferTimer=setInterval(()=>{
      const x=s.transfers.active;if(!x||x.status!=='running'){clearInterval(transferTimer);return;}
      x.progress=Math.min(100,x.progress+8);
      fieldValue('.transfer-card .progress-top strong',x.progress+'%');
      const bar=app.querySelector('.transfer-card .progress-fill');if(bar)bar.style.width=x.progress+'%';
      if(x.progress>=100){clearInterval(transferTimer);x.status='done';s.transfers.downloads.unshift({id:x.id,name:x.name,sourceId:x.fileId,when:stamp()});addLog('Result',`模拟传输完成：${x.name}`,'success');render();}
    },220);
  }
  function queryCommand(command,answer){if(!checkedConnection())return;simLog(command,answer);}
  function timeNow(){return new Date().toLocaleString('sv-SE',{hour12:false}).replace('T',' ');}
  function wifiTest(){if(!checkedConnection())return;const passed=s.wifi.enabled&&s.wifi.connected;s.wifiTest.last=passed?'连接检测通过（模拟）':s.wifi.enabled?'尚未连接 Wi-Fi':'Wi-Fi 未开启';s.wifiTest.rssi=passed?s.wifi.strength+' dBm':'—';simLog('Wi-Fi 测试',s.wifiTest.last,passed?'success':'error');render();}
  function loadMoreFiles(){if(s.fileVisible>=allFiles().length)return;s.fileVisible=Math.min(s.fileVisible+4,allFiles().length);addLog('RX',`自动查询文件列表，已加载 ${s.fileVisible}/${allFiles().length}`);render();}
  // 自动分页，不在页面暴露底层的起止序号查询参数。
  app.addEventListener('scroll',ev=>{
    if(!ev.target.classList?.contains('scroll-area')||s.page!=='device'||s.tab!=='files')return;
    const sc=ev.target;
    if(sc.scrollTop+sc.clientHeight>=sc.scrollHeight-90 && s.fileVisible<allFiles().length){
      const pos=sc.scrollTop;loadMoreFiles();const current=app.querySelector('.scroll-area');if(current)current.scrollTop=pos;
    }
  },true);
  app.addEventListener('click',event=>{
    const b=event.target.closest('[data-action]');if(!b||b.disabled)return;
    const a=b.dataset.action;
    if(b.getAttribute('aria-disabled')==='true'){
      const reasons={
        'record-meeting':'请先停止当前录音','record-idea':'请先停止当前录音','record-stop':'当前未在录音',
        'mark-on':'请先开始录音，或 MARK 已打开','mark-off':'请先开始录音，或 MARK 已关闭',
        'record-lock':'请先开始录音，或录音已锁定','record-unlock':'请先开始录音，或录音未锁定',
        'scan':'正在扫描附近蓝牙设备，请稍候','ota-noop':'OTA 已开启',
        'ota-upgrade':'请先开启 OTA 并选择或下载固件',
        'ota-download':'请先开启 OTA，或等待当前任务结束',
        'ota-source':'升级或下载期间不能切换固件来源',
        'wifi-on':'Wi-Fi 已开启','wifi-off':'Wi-Fi 已关闭',
        'wifi-connect':'请先打开 Wi-Fi','pick-file':'请先打开 OTA'
      };
      notify(reasons[a]||'当前操作暂不可用，请先完成前置操作');
      return;
    }
    switch(a){
      case 'goto':nav(b.dataset.page);break;
      case 'back':s.page==='sleep'?nav('device','more'):nav('home');break;
      case 'tab':if(!requireConnection())break;s.tab=b.dataset.tab;render({resetScroll:true});addLog('UI',`切换至${tabs.find(t=>t[0]===s.tab)?.[1]}`);break;
      case 'device-popover':s.devicePopover=!s.devicePopover;s.menu=false;render();break;
      case 'device-popover-close':s.devicePopover=false;render();break;
      case 'device-detail':s.devicePopover=false;s.tab='device';render({resetScroll:true});notify('已打开设备信息');break;
      case 'menu':s.menu=!s.menu;s.devicePopover=false;render();break;
      case 'menu-close':s.menu=false;render();break;
      case 'menu-scan':nav('scan');break;
      case 'menu-disconnect':s.menu=false;s.modal={kind:'disconnect'};render();break;
      case 'scan':s.scanning=true;addLog('TX','开始扫描蓝牙设备');render();clearTimeout(scanTimeout);scanTimeout=setTimeout(()=>{s.scanning=false;addLog('Result','发现 3 个蓝牙设备','success');render();notify('扫描完成，发现 3 个设备');},1500);break;
      case 'connect-device':{const target=nearby.find(x=>x.id===b.dataset.device);if(!target)return;s.name=target.id;s.mac=target.mac;s.connected=true;addLog('TX',`连接设备 ${target.id}`);addLog('Result',`连接成功：${target.mac}`,'success');nav('device','device');notify('设备已连接（模拟）');break;}
      case 'query-battery':queryCommand('获取电量',`当前电量：${s.battery}%`);break;
      case 'query-sn':queryCommand('查询 SN 号',`SN：${s.name}`);break;
      case 'query-storage':queryCommand('存储信息','总容量 32GB，已用 12.6GB，可用 19.4GB');break;
      case 'query-device-state':queryCommand('设备状态',s.usb.enabled?'U 盘模式':'正常运行');break;
      case 'pair-query':s.advanced.pairing=s.connected?'已配对':'未连接';queryCommand('查询配对',s.advanced.pairing);render();break;
      case 'time-query':if(!checkedConnection())break;s.deviceTime=timeNow();queryCommand('查询设备时间',s.deviceTime);render();break;
      case 'time-sync':if(!checkedConnection())break;s.deviceTime=timeNow();simLog('同步时间到设备',`同步成功：${s.deviceTime}`);render();break;
      case 'sync-query':queryCommand('查询录音同步',s.recordSync?'已开启':'已关闭');break;
      case 'sync-on':if(!checkedConnection())break;s.recordSync=true;simLog('开启录音同步','已开启');render();break;
      case 'sync-off':if(!checkedConnection())break;s.recordSync=false;simLog('关闭录音同步','已关闭');render();break;
      case 'mark-query':if(!checkedConnection())break;queryCommand('获取 MARK',`找到 ${s.markHistory.length} 条 MARK 记录`);render();break;
      case 'usb-query':queryCommand('查询 U 盘模式',s.usb.enabled?'已开启':'已关闭');break;
      case 'usb-on':if(!checkedConnection())break;s.usb.enabled=true;simLog('打开 U 盘','U 盘模式已开启');render();break;
      case 'usb-off':if(!checkedConnection())break;s.usb.enabled=false;simLog('关闭 U 盘','U 盘模式已关闭');render();break;
      case 'factory-reset':s.modal={kind:'factory-reset'};render();break;
      case 'paste-00':case 'paste-01':{if(!checkedConnection())break;const code=a==='paste-00'?'0x00':'0x01';s.advanced.paste=code+' 指令已执行（模拟）';s.advanced.lastCommand=code;simLog('粘贴 '+code,s.advanced.paste);render();break;}
      case 'g2-query':if(!checkedConnection())break;s.advanced.g2Files=[{name:'2026-10-12_09-10-20.opus',size:'14.9 KB'},{name:'2026-10-12_08-45-30_flash.opus',size:'32.1 KB'},{name:'2026-10-11_16-24-06.opus',size:'24.0 KB'}];simLog('查询二代音频文件列表',`找到 ${s.advanced.g2Files.length} 个文件`);render();break;
      case 'frame-start':if(!checkedConnection()||s.advanced.frame.running)break;s.advanced.frame.running=true;s.advanced.frame.progress=0;simLog('传输音频帧','开始模拟音频帧传输');render();clearInterval(frameTimer);frameTimer=setInterval(()=>{const f=s.advanced.frame;if(!f.running){clearInterval(frameTimer);return;}f.progress=Math.min(100,f.progress+5);fieldValue('.progress-wrap .progress-top span',f.progress+'%');const el=app.querySelector('.progress-wrap .progress-fill');if(el)el.style.width=f.progress+'%';if(f.progress===100){clearInterval(frameTimer);f.running=false;addLog('Result','模拟音频帧传输已完成','success');render();}},320);break;
      case 'frame-cancel':clearInterval(frameTimer);s.advanced.frame.running=false;addLog('TX','取消传输音频帧');render();break;
      case 'local-audio-list':s.modal={kind:'local-audio'};render();break;
      case 'wifi-test':wifiTest();break;
      case 'clear-files':s.modal={kind:'clear-files'};render();break;
      case 'load-more-files':loadMoreFiles();break;
      case 'transfer-cancel':if(s.transfers.active){clearInterval(transferTimer);s.transfers.active.status='paused';addLog('TX',`取消传输，保留 ${s.transfers.active.progress}% 断点`);render();}break;
      case 'transfer-resume':if(s.transfers.active){const f=allFiles().find(x=>x.id===s.transfers.active.fileId)||{name:s.transfers.active.name};beginTransfer(f,true);}break;
      case 'transfer-close':clearInterval(transferTimer);s.transfers.active=null;render();break;
      case 'local-file':{const d=s.transfers.downloads.find(x=>x.id===Number(b.dataset.id));if(d){s.modal={kind:'local-audio',name:d.name};render();}break;}
      case 'ota-resume':{const o=s.ota;if(!o.enabled||!o.resumePoint||o.running){addLog('Error','无法恢复 OTA 升级','error');break;}const prior=o.resumePoint;startUpgrade();clearInterval(otaTimer);o.progress=prior;o.resumePoint=0;let n=prior;addLog('TX',`断点升级从 ${prior}% 继续`);render();otaTimer=setInterval(()=>{n=Math.min(100,n+10);o.progress=n;const bar=app.querySelector('.progress-wrap .progress-fill');if(bar)bar.style.width=n+'%';const num=app.querySelector('.progress-wrap .progress-num');if(num)num.textContent=n+'%';if(n>=100){clearInterval(otaTimer);o.running=false;o.done=true;addLog('Result','断点升级完成（模拟）','success');render();}},430);break;}
      case 'refresh-device':addLog('TX','获取设备信息');addLog('Result','查询设备信息成功（83ms）','success');render();notify('设备信息已刷新');break;
      case 'record-meeting':recordAction('meeting');break;
      case 'record-idea':recordAction('idea');break;
      case 'record-stop':if(s.record.mode==='idle')break;addLog('TX','停止录音');addLog('Result',`录音已停止，时长 ${timeText(s.record.elapsed)}`,'success');s.record.mode='idle';s.record.elapsed=0;s.record.marked=false;s.record.locked=false;render();notify('录音已停止（模拟）');break;
      case 'mark-on':if(s.record.marked){notify('MARK 已处于开启状态');break;}s.record.marked=true;s.markHistory.unshift({id:Date.now(),when:timeNow().slice(5,16),type:s.record.mode==='meeting'?'会议录音':'闪念录音',time:timeText(s.record.elapsed)});addLog('TX','打开 MARK');addLog('Result','MARK 已开启','success');render();notify('MARK 已开启');break;
      case 'mark-off':if(!s.record.marked){notify('MARK 已处于关闭状态');break;}s.record.marked=false;addLog('TX','关闭 MARK');addLog('Result','MARK 已关闭','success');render();notify('MARK 已关闭');break;
      case 'record-check':addLog('TX','查询录音状态');addLog('RX',s.record.mode==='idle'?'当前未录音':`正在录音：${timeText(s.record.elapsed)}`);notify(s.record.mode==='idle'?'当前未录音':'当前正在录音');break;
      case 'record-lock-check':addLog('TX','查询锁定状态');addLog('RX',s.record.locked?'录音已锁定':'录音未锁定');notify(s.record.locked?'录音已锁定':'录音未锁定');break;
      case 'record-lock':if(s.record.locked){notify('录音已经锁定');break;}s.record.locked=true;addLog('Result','锁定录音成功','success');render();notify('录音已锁定');break;
      case 'record-unlock':if(!s.record.locked){notify('录音当前未锁定');break;}s.record.locked=false;addLog('Result','解锁录音成功','success');render();notify('录音已解锁');break;
      case 'ota-open':if(!requireConnection())break;if(s.ota.enabled){notify('OTA 已处于开启状态');break;}s.ota.enabled=true;addLog('TX','打开 OTA');addLog('Result','OTA 已开启','success');render();notify('OTA 已开启');break;
      case 'ota-close':if(s.ota.running||s.ota.downloading){notify('升级或下载期间不能关闭 OTA');break;}s.ota.enabled=false;addLog('TX','关闭 OTA');render();notify('OTA 已关闭');break;
      case 'ota-source':if(s.ota.running||s.ota.downloading)break;if(s.ota.source===b.dataset.source){notify('当前已经选择该固件来源');break;}s.ota.source=b.dataset.source;s.ota.progress=0;s.ota.resumePoint=0;s.ota.done=false;addLog('UI',`固件来源：${s.ota.source==='local'?'本地':'线上'}`);render();notify('已切换为'+(s.ota.source==='local'?'本地固件':'线上固件'));break;
      case 'pick-file':if(!s.ota.enabled){notify('请先打开 OTA');break;}app.querySelector('#ota-file')?.click();break;
      case 'ota-url-clear':s.ota.url='';s.ota.downloaded=false;render();notify('已清空固件地址');break;
      case 'ota-download':startDownload();break;
      case 'ota-upgrade':startUpgrade();break;
      case 'ota-cancel':s.modal={kind:'cancel-ota'};render();break;
      case 'wifi-check':addLog('TX','查询 Wi-Fi 状态');addLog('RX',s.wifi.enabled?(s.wifi.connected?'Wi-Fi 已连接':'Wi-Fi 已开启，尚未连接'):'Wi-Fi 已关闭');break;
      case 'wifi-on':if(!requireConnection())break;if(s.wifi.enabled){notify('Wi-Fi 已处于开启状态');break;}s.wifi.enabled=true;s.wifi.connected=false;addLog('TX','打开 Wi-Fi');addLog('Result','Wi-Fi 已开启','success');render();notify('Wi-Fi 已开启，可以连接网络');break;
      case 'wifi-off':if(!s.wifi.enabled){notify('Wi-Fi 已处于关闭状态');break;}s.wifi.enabled=false;s.wifi.connected=false;addLog('TX','关闭 Wi-Fi');render();notify('Wi-Fi 已关闭');break;
      case 'wifi-clear':s.wifi.ssidInput='';render();app.querySelector('#wifi-ssid')?.focus();notify('已清空 Wi-Fi 名称');break;
      case 'wifi-toggle-password':s.wifi.showPassword=!s.wifi.showPassword;render();notify(s.wifi.showPassword?'密码已显示':'密码已隐藏');break;
      case 'wifi-connect':{const w=s.wifi;if(!w.enabled){notify('请先打开 Wi-Fi');break;}if(!w.ssidInput.trim()){notify('请输入 Wi-Fi 名称');break;}if(w.password.length<8){notify('Wi-Fi 密码至少需要 8 个字符');break;}if(w.connected&&w.ssid===w.ssidInput.trim()){notify('已连接到该 Wi-Fi');break;}w.ssid=w.ssidInput.trim();w.connected=true;addLog('TX',`连接 Wi-Fi：${w.ssid}`);addLog('Result',`Wi-Fi 已连接到 ${w.ssid}（模拟）`,'success');render();notify(`已连接 ${w.ssid}（模拟）`);break;}
      case 'refresh-files':addLog('TX','刷新设备文件列表');addLog('Result',`读取 ${s.files.length} 个文件`,'success');render();notify('文件列表已刷新');break;
      case 'download-file':{const f=allFiles().find(f=>f.id===Number(b.dataset.id));if(!f)break;beginTransfer(f);break;}
      case 'remove-file':{const f=allFiles().find(f=>f.id===Number(b.dataset.id));if(!f)break;s.modal={kind:'delete',id:f.id,name:f.name};render();break;}
      case 'sleep-clear':s.sleepInput='';render();app.querySelector('#sleep-input')?.focus();notify('已清空休眠时间输入');break;
      case 'set-sleep':{const n=Number(s.sleepInput);if(!Number.isInteger(n)||n<60||n>3600){notify('请输入 60–3600 之间的整数秒数');break;}s.sleepTime=n;s.sleepInput=String(n);addLog('TX',`设置休眠时间 ${n} 秒`);addLog('Result',`休眠时间设置成功：${n} 秒`,'success');render();notify(`休眠时间已设为 ${n} 秒`);break;}
      case 'copy-log':copyLogs();break;
      case 'clear-log':s.logs=[];render();notify('日志已清空');break;
      case 'framework-start':addLog('TX','发起测试通话');addLog('Result','模拟测试成功','success');notify('测试已发起（模拟）');break;
      case 'framework-stop':addLog('TX','结束测试通话');notify('测试已结束');break;
      case 'framework-query':addLog('RX','通话框架状态：空闲');notify('通话框架处于空闲状态');break;
      case 'modal-close':s.modal=null;render();notify('已取消操作');break;
      case 'modal-confirm':if(!s.modal)break;{
        const m=s.modal;if(m.kind==='delete'){s.files=s.files.filter(f=>f.id!==m.id);const idx=fileCatalog.findIndex(f=>f.id===m.id);if(idx!==-1)fileCatalog.splice(idx,1);addLog('TX',`删除设备文件：${m.name}`);}
        if(m.kind==='clear-files'){s.files=[];fileCatalog.length=0;s.fileVisible=4;addLog('TX','清空设备全部文件（模拟）');}
        if(m.kind==='factory-reset'){s.wifi.enabled=false;s.wifi.connected=false;s.recordSync=false;s.usb.enabled=false;s.sleepTime=600;s.sleepInput='600';s.record.mode='idle';s.record.marked=false;s.record.locked=false;s.record.elapsed=0;s.ota.enabled=false;s.ota.running=false;s.ota.downloading=false;s.ota.resumePoint=0;clearInterval(otaTimer);s.advanced.frame.running=false;clearInterval(frameTimer);clearInterval(transferTimer);if(s.transfers.active&&s.transfers.active.status==='running')s.transfers.active.status='paused';addLog('Result','模拟恢复出厂设置完成','success');}
        if(m.kind==='disconnect'){s.connected=false;s.record.mode='idle';addLog('TX','断开蓝牙设备');notify('已断开蓝牙设备');}
        if(m.kind==='cancel-ota'){clearInterval(otaTimer);s.ota.running=false;s.ota.resumePoint=s.ota.progress;s.ota.done=false;addLog('TX',`中断 OTA 升级，保存断点 ${s.ota.resumePoint}%`);notify('已取消模拟升级');}
        s.modal=null;render();break;}
      default:break;
    }
  });
  // 原版 Bottom Sheet：日志始终显示；拖动横杠可放大/缩小，点击切换大小。
  let drag=null;
  function maxLogHeight(){
    const phone=app.querySelector('.phone');if(!phone)return 560;
    return Math.max(225,Math.min(Math.round(phone.clientHeight*.75),phone.clientHeight-260));
  }
  function updateLogHeight(height){
    s.logHeight=Math.max(168,Math.min(maxLogHeight(),Math.round(height)));
    const sheet=app.querySelector('.debug-sheet');if(sheet)sheet.style.setProperty('--log-height',s.logHeight+'px');
  }
  app.addEventListener('pointerdown',ev=>{
    const handle=ev.target.closest('.debug-drag-zone, .debug-title .card-title');if(!handle)return;
    drag={startY:ev.clientY,startHeight:s.logHeight,moved:false,id:ev.pointerId};
    try{handle.setPointerCapture(ev.pointerId);}catch{}
    handle.classList.add('dragging');
  });
  app.addEventListener('pointermove',ev=>{
    if(!drag||ev.pointerId!==drag.id)return;
    const delta=drag.startY-ev.clientY;
    if(Math.abs(delta)>5)drag.moved=true;
    updateLogHeight(drag.startHeight+delta);
  });
  const finishDrag=(ev)=>{
    if(!drag||ev.pointerId!==drag.id)return;
    if(!drag.moved){updateLogHeight(s.logHeight>maxLogHeight()-65?265:maxLogHeight());}
    else if(Math.abs(s.logHeight-drag.startHeight)>22){notify(`日志区域已调整为 ${s.logHeight}px`);}
    app.querySelector('.debug-drag-zone')?.classList.remove('dragging');drag=null;
  };
  app.addEventListener('pointerup',finishDrag);
  app.addEventListener('pointercancel',finishDrag);
  app.addEventListener('keydown',ev=>{
    if(!ev.target.closest('.debug-drag-zone'))return;
    if(ev.key==='ArrowUp'||ev.key==='ArrowDown'){
      ev.preventDefault();updateLogHeight(s.logHeight+(ev.key==='ArrowUp'?65:-65));notify(`日志区域高度 ${s.logHeight}px`);
    }
    if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();updateLogHeight(s.logHeight>maxLogHeight()-65?265:maxLogHeight());notify('日志区域高度已调整');}
  });
  window.addEventListener('resize',()=>updateLogHeight(s.logHeight));
  app.addEventListener('input',ev=>{
    if(ev.target.matches('.form-input')){ev.target.classList.remove('invalid');ev.target.removeAttribute('aria-invalid');}
    const f=ev.target.dataset.field;
    if(f==='ota-url'){if(s.ota.downloaded){s.ota.downloaded=false;const note=app.querySelector('.ota-status');if(note)note.remove();}s.ota.url=ev.target.value;}
    if(f==='wifi-ssid'){s.wifi.ssidInput=ev.target.value;const connected=s.wifi.connected&&s.wifi.ssidInput.trim()===s.wifi.ssid;const connect=app.querySelector('[data-action="wifi-connect"]');if(connect){connect.classList.toggle('is-selected',connected);connect.classList.toggle('primary',!connected);connect.setAttribute('aria-pressed',String(connected));connect.innerHTML=I('wifi',17)+' '+(connected?'已连接 '+E(s.wifi.ssid):'连接 Wi-Fi');}}
    if(f==='wifi-password')s.wifi.password=ev.target.value;
    if(f==='sleep')s.sleepInput=ev.target.value;
  });
  app.addEventListener('change',ev=>{
    const field=ev.target.dataset.field;
    if(field==='ota-type'){s.ota.type=ev.target.value;s.ota.downloaded=false;render();notify('已选择'+s.ota.type);}
    if(field==='wifi-show-password'){s.wifi.showPassword=ev.target.checked;render();notify(s.wifi.showPassword?'密码已显示':'密码已隐藏');}
    if(ev.target.id==='ota-file'){
      const file=ev.target.files?.[0];if(!file)return;
      if(!/\.(bin|zip)$/i.test(file.name)){notify('仅支持 .bin 或 .zip 固件文件');return;}
      s.ota.file={name:file.name,size:file.size};s.ota.done=false;s.ota.progress=0;
      addLog('UI',`已选择固件文件：${file.name}，${formatBytes(file.size)}`);render();notify('固件文件已选择');
    }
  });
  setInterval(()=>{
    if(s.record.mode==='idle')return;
    s.record.elapsed++;
    const timer=app.querySelector('#record-timer');if(timer)timer.textContent=timeText(s.record.elapsed);
  },1000);
  addLog('TX','开始连接设备…');
  addLog('Result','设备已连接','success');
  addLog('Result','查询设备信息成功','success');
  render();
})();
