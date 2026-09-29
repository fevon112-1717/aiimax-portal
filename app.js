(() => {
  'use strict';
  const config = window.PORTAL_CONFIG;
  const paths = {
    search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M9 21h6"/>',
    settings:'<path d="m9 3 1-2h4l1 2 3 2 2 0 2 4-2 2v3l2 2-2 4-3-1-3 2-1 2h-4l-1-2-3-2-2 1-2-4 2-2v-3L1 9l2-4h3z" transform="translate(1 1) scale(.9)"/><circle cx="12" cy="12" r="3.5"/>',
    menu:'<path d="M3 5h18M3 12h18M3 19h18"/>',
    megaphone:'<path d="m3 9 12-5v16L3 15zM15 8h4v8h-4M6 16l1 6h4l-2-5M22 7v10"/>',
    document:'<path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h7"/>',
    link:'<path d="m10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 8l2-2a4 4 0 0 0-6-6L7 5" transform="translate(3 3)"/>',
    eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    people:'<circle cx="9" cy="6" r="3"/><path d="M2 21v-4c0-5 14-5 14 0v4zM17 3c4 0 4 6 0 6M19 13c4 1 4 4 4 8h-4"/>',
    person:'<circle cx="12" cy="6" r="4"/><path d="M4 22v-5c0-6 16-6 16 0v5z"/>',
    laptop:'<path d="M3 3h18v14H3zM1 21h22M9 17v4M15 17v4"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.document}</svg>`;
  document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
  const modal = document.querySelector('#modal');
  const modalBody = document.querySelector('#modal-body');
  let lastFocus;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function showModal(title, html) {
    if (!modal.open) lastFocus = document.activeElement;
    document.querySelector('#modal-title').textContent = title;
    modalBody.innerHTML = html;
    if (!modal.open) modal.showModal();
    document.querySelector('#close-modal').focus();
  }
  document.querySelector('#close-modal').addEventListener('click', () => modal.close());
  modal.addEventListener('close', () => lastFocus?.focus());
  modal.addEventListener('click', e => { if(e.target === modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) modal.close();} });
  function safeUrl(raw) {
    const value = (raw || '').trim();
    if (!value || /[\u0000-\u001f\u007f]/.test(value)) return '';
    if (/^[a-z][a-z\d+.-]*:/i.test(value) && !/^(https?:|mailto:)/i.test(value)) return '';
    return value;
  }
  function linkAttrs(key) {
    const item = config.links[key];
    const url = safeUrl(item.url);
    return `href="${escape(url || '#')}" data-link="${escape(key)}"${url && item.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}`;
  }
  function card(key) {
    const item = config.links[key];
    return `<a class="portal-card searchable" ${linkAttrs(key)} data-search="${escape(item.title+' '+item.description)}"><img class="card-image" src="${escape(item.image)}" alt="" width="370" height="139"><div class="card-caption"><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><span class="card-arrow" aria-hidden="true"></span></div></a>`;
  }
  document.querySelector('#systems-grid').innerHTML = config.systems.map(card).join('');
  document.querySelector('#training-grid').innerHTML = config.training.map(card).join('');
  document.querySelector('#document-list').innerHTML = config.documents.map(key => `<li class="searchable" data-search="${escape(config.links[key].title)}"><a ${linkAttrs(key)}><span style="color:${escape(config.links[key].color)}">${icon('document')}</span>${escape(config.links[key].title)}</a></li>`).join('');
  document.querySelector('#quick-grid').innerHTML = config.quickLinks.map(key => `<a class="quick-link searchable" ${linkAttrs(key)} data-search="${escape(config.links[key].title+' '+config.links[key].description)}">${icon(config.links[key].icon)}<span>${escape(config.links[key].title)}</span></a>`).join('');
  document.querySelector('#news-list').innerHTML = config.news.map((item,index) => `<li class="searchable" data-search="${escape(item.title)}"><a href="${escape(safeUrl(item.url)||'#')}" data-news="${index}"><span>${escape(item.title)}</span><time datetime="${escape(item.date)}">${escape(item.date.replaceAll('-','/'))}</time></a></li>`).join('');
  document.querySelector('#apps-links').innerHTML = [...config.systems,...config.training].map(key => `<a ${linkAttrs(key)}>${escape(config.links[key].title)}</a>`).join('');
  document.querySelectorAll('a[data-link]').forEach(a => {
    const item=config.links[a.dataset.link]; const url=safeUrl(item.url);
    a.href=url || '#'; if(url && item.newTab){a.target='_blank';a.rel='noopener noreferrer';}
  });
  document.addEventListener('click', e => {
    const link=e.target.closest('a[data-link]');
    if(link && !safeUrl(config.links[link.dataset.link].url)){
      e.preventDefault();const item=config.links[link.dataset.link];
      showModal(item.title, '<p>此入口尚未設定正式網址。</p><p>請聯絡網站管理員提供連結；設定後即可從此處開啟。</p>');
    }
    const news=e.target.closest('[data-news]');
    if(news && !safeUrl(config.news[news.dataset.news].url)){
      e.preventDefault();const item=config.news[news.dataset.news];
      showModal(item.title,`${config.previewMode?'<span class="sample-label">示範公告</span>':''}<p>${escape(item.date.replaceAll('-','/'))}</p><p>${escape(item.body)}</p>`);
    }
    const directory=e.target.closest('[data-directory]');
    if(directory) openDirectory(directory.dataset.directory);
  });
  function openDirectory(type){
    const titles={systems:'常用系統',training:'教育訓練 & 文件',documents:'常用文件',news:'最新公告'};
    let html;
    if(type==='news') html=config.news.map((item,i)=>`<li><a href="${escape(safeUrl(item.url)||'#')}" data-news="${i}">${escape(item.title)}<small>${escape(item.date)}</small></a></li>`).join('');
    else html=config[type].map(key=>`<li><a ${linkAttrs(key)}>${escape(config.links[key].title)}<small>${escape(config.links[key].description||'')}</small></a></li>`).join('');
    showModal(titles[type],`<ul class="modal-list">${html}</ul>`);
  }
  const input=document.querySelector('#search');
  const status=document.querySelector('#search-status');
  function search(){
    const query=input.value.trim().toLocaleLowerCase();let count=0;
    document.querySelectorAll('.searchable').forEach(el=>{el.hidden=!!query&&!el.dataset.search.toLocaleLowerCase().includes(query);if(!el.hidden) count++;});
    status.hidden=!query;document.querySelector('#clear-search').hidden=!query;
    status.textContent=count?`「${input.value.trim()}」找到 ${count} 個項目`:`找不到「${input.value.trim()}」，請嘗試其他關鍵字。`;
  }
  input.addEventListener('input',search);
  document.querySelector('#search-form').addEventListener('submit',e=>{e.preventDefault();search();if(input.value.trim())status.scrollIntoView({block:'nearest'});});
  document.querySelector('#clear-search').addEventListener('click',()=>{input.value='';search();input.focus();});
  const menu=document.querySelector('#menu-toggle'),nav=document.querySelector('#main-nav');
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'關閉導覽選單':'開啟導覽選單');});
  nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
  const apps=document.querySelector('#apps-panel'),appsToggle=document.querySelector('#apps-toggle');
  function closeApps(){apps.hidden=true;appsToggle.setAttribute('aria-expanded','false');}
  appsToggle.addEventListener('click',()=>{apps.hidden=!apps.hidden;appsToggle.setAttribute('aria-expanded',!apps.hidden);});
  document.addEventListener('click',e=>{if(!apps.contains(e.target)&&!appsToggle.contains(e.target))closeApps();document.querySelectorAll('.nav-dropdown[open]').forEach(d=>{if(!d.contains(e.target))d.open=false;});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeApps();document.querySelectorAll('.nav-dropdown[open]').forEach(d=>d.open=false);nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
  document.querySelector('#notifications').addEventListener('click',()=>openDirectory('news'));
  document.querySelector('#help').addEventListener('click',()=>showModal('網站使用說明','<p>點選卡片可進入常用系統與訓練教材。上方搜尋框可搜尋本頁的系統、公告、文件與相關連結。</p><p>使用 Tab 鍵可切換項目；按 Escape 鍵可關閉視窗。</p><p>尚未設定網址的入口會顯示提示。若需存取內部系統，請依公司規定登入或連接公司網路。</p>'));
  document.querySelector('#profile').addEventListener('click',()=>showModal('內部入口網站','<p>此頁為獨立網站版型，右上角 EC 是示意頭像，未連接 Microsoft 帳號。</p><p>此頁不會收集帳號或密碼。</p>'));
  document.querySelector('#settings').addEventListener('click',()=>{showModal('顯示設定',`<p>調整此頁文字大小，讓內容更容易閱讀。</p><button class="setting-button" id="text-size" aria-pressed="${document.documentElement.classList.contains('large-text')}">切換標準／較大文字</button>`);document.querySelector('#text-size').addEventListener('click',e=>{const large=document.documentElement.classList.toggle('large-text');e.target.setAttribute('aria-pressed',large);});});
  document.querySelector('.preview-note').hidden=!config.previewMode;
})();
