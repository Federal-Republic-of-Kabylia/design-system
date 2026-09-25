window.rfkStorage = window.rfkStorage || {
  get(key){try{return window.localStorage.getItem(key)}catch{return null}},
  set(key,value){try{window.localStorage.setItem(key,value);return true}catch{return false}},
  remove(key){try{window.localStorage.removeItem(key);return true}catch{return false}}
};

(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const desktopMQ=window.matchMedia('(min-width:1101px)');

  /* Theme manager */
  const setTheme=(theme)=>{
    const value=['light','dark','aaa'].includes(theme)?theme:'light';
    document.documentElement.dataset.theme=value;
    window.rfkStorage.set('rfk-theme',value);
    $$('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===value)));
  };
  window.rfkSetTheme=setTheme;
  const savedTheme=window.rfkStorage.get('rfk-theme');
  const systemTheme=window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light';
  setTheme(savedTheme||systemTheme);
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change',(e)=>{
    if(!window.rfkStorage.get('rfk-theme')) setTheme(e.matches?'dark':'light');
  });
  $$('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>setTheme(button.dataset.themeChoice)));

  /* Shared language state */
  const languagePanel=$('#languagePanel');
  const languageOptions=$$('.rfk-language-option',languagePanel||document);
  const langDict={
    en:{label:'English',code:'EN',flagClass:'us',flagSrc:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgOTc1IDY1MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgo8dGl0bGUgaWQ9InRpdGxlIj5GbGFnIG9mIHRoZSBVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2E8L3RpdGxlPgo8ZGVzYyBpZD0iZGVzYyI+VW5pdGVkIFN0YXRlcyBmbGFnIHdpdGggcmVkIGFuZCB3aGl0ZSBzdHJpcGVzIGFuZCBhIGJsdWUgY2FudG9uIHdpdGggd2hpdGUgc3RhcnMuPC9kZXNjPgo8ZGVmcz4KICA8cG9seWdvbiBpZD0icHQiIHBvaW50cz0iLTAuMTYyNDU5ODQ4MTE2NDUzMSwwIDAsLTAuNSAwLjE2MjQ1OTg0ODExNjQ1MzEsMCIgdHJhbnNmb3JtPSJzY2FsZSgwLjA2MTYpIiBmaWxsPSIjRkZGIi8+CiAgPGcgaWQ9InN0YXIiPgogICAgPHVzZSBocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKC0xNDQpIi8+CiAgICA8dXNlIGhyZWY9IiNwdCIgdHJhbnNmb3JtPSJyb3RhdGUoLTcyKSIvPgogICAgPHVzZSBocmVmPSIjcHQiLz4KICAgIDx1c2UgaHJlZj0iI3B0IiB0cmFuc2Zvcm09InJvdGF0ZSg3MikiLz4KICAgIDx1c2UgaHJlZj0iI3B0IiB0cmFuc2Zvcm09InJvdGF0ZSgxNDQpIi8+CiAgPC9nPgogIDxnIGlkPSJzNSI+CiAgICA8dXNlIGhyZWY9IiNzdGFyIiB4PSItMC4yMzIiLz4KICAgIDx1c2UgaHJlZj0iI3N0YXIiIHg9Ii0wLjExNiIvPgogICAgPHVzZSBocmVmPSIjc3RhciIvPgogICAgPHVzZSBocmVmPSIjc3RhciIgeD0iMC4xMTYiLz4KICAgIDx1c2UgaHJlZj0iI3N0YXIiIHg9IjAuMjMyIi8+CiAgPC9nPgogIDxnIGlkPSJzNiI+CiAgICA8dXNlIGhyZWY9IiNzNSIgeD0iLTAuMDU4Ii8+CiAgICA8dXNlIGhyZWY9IiNzdGFyIiB4PSIwLjI5Ii8+CiAgPC9nPgogIDxnIGlkPSJ4NCI+CiAgICA8dXNlIGhyZWY9IiNzNiIvPgogICAgPHVzZSBocmVmPSIjczUiIHk9IjAuMDU0Ii8+CiAgICA8dXNlIGhyZWY9IiNzNiIgeT0iMC4xMDgiLz4KICAgIDx1c2UgaHJlZj0iI3M1IiB5PSIwLjE2MiIvPgogIDwvZz4KICA8ZyBpZD0idSI+CiAgICA8dXNlIGhyZWY9IiN4NCIgeT0iLTAuMjE2Ii8+CiAgICA8dXNlIGhyZWY9IiN4NCIvPgogICAgPHVzZSBocmVmPSIjczYiIHk9IjAuMjE2Ii8+CiAgPC9nPgogIDxyZWN0IGlkPSJzdHJpcGUiIHdpZHRoPSI5NzUiIGhlaWdodD0iNTAiIGZpbGw9IiNCMzE5NDIiLz4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iOTc1IiBoZWlnaHQ9IjY1MCIgZmlsbD0iI0ZGRiIvPgo8dXNlIGhyZWY9IiNzdHJpcGUiLz4KPHVzZSBocmVmPSIjc3RyaXBlIiB5PSIxMDAiLz4KPHVzZSBocmVmPSIjc3RyaXBlIiB5PSIyMDAiLz4KPHVzZSBocmVmPSIjc3RyaXBlIiB5PSIzMDAiLz4KPHVzZSBocmVmPSIjc3RyaXBlIiB5PSI0MDAiLz4KPHVzZSBocmVmPSIjc3RyaXBlIiB5PSI1MDAiLz4KPHVzZSBocmVmPSIjc3RyaXBlIiB5PSI2MDAiLz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSIzNTAiIGZpbGw9IiMwQTMxNjEiLz4KPHVzZSBocmVmPSIjdSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjE5LDE3Nikgc2NhbGUoNjUwKSIvPgo8L3N2Zz4='},
    fr:{label:'Français',code:'FR',flagClass:'fr',flagSrc:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgOTAwIDYwMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgo8dGl0bGUgaWQ9InRpdGxlIj5GcmVuY2ggZmxhZzwvdGl0bGU+CjxkZXNjIGlkPSJkZXNjIj5GcmVuY2ggdHJpY29sb3VyIGZsYWcgaW4gYmx1ZSwgd2hpdGUgYW5kIHJlZC48L2Rlc2M+CjxwYXRoIGZpbGw9IiNDRTExMjYiIGQ9Ik0wIDBoOTAwdjYwMEgwIi8+CjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNjAwdjYwMEgwIi8+CjxwYXRoIGZpbGw9IiMwMDI2NTQiIGQ9Ik0wIDBoMzAwdjYwMEgwIi8+Cjwvc3ZnPg=='},
    kab:{label:'Taqbaylit',code:'KAB',flagClass:'kab',flagSrc:'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk1OSA2MzkiIHJvbGU9ImltZyIgYXJpYS1sYWJlbGxlZGJ5PSJ0aXRsZSBkZXNjIj4KPHRpdGxlIGlkPSJ0aXRsZSI+S2FieWxlIGZsYWc8L3RpdGxlPgo8ZGVzYyBpZD0iZGVzYyI+Qmx1ZSBhbmQgeWVsbG93IEthYnlsZSBmbGFnIHdpdGggYSByZWQgWWF6IGFuZCBkZWNvcmF0aXZlIGJyYW5jaGVzLjwvZGVzYz4KPGcgaWQ9IkxheWVyXzEiPgogIDxyZWN0IGZpbGw9IiMwMDY1QkQiIHdpZHRoPSI0ODAuODc1IiBoZWlnaHQ9IjYzOSIvPgogIDxyZWN0IHg9IjQ4MC44NzUiIGZpbGw9IiNGMkNFMDEiIHdpZHRoPSI0NzguMTI1IiBoZWlnaHQ9IjYzOSIvPgogIDxwYXRoIGZpbGw9IiNDRDI2M0UiIGQ9Ik02NDIuNSwzNzYuOTJ2NTZINTg3YzAsMCwxLTQzLjUsMC02MC41cy03OC0xOS41LTc4LTE5LjVsMC41LDgwSDQ1NGwwLjUtODBjMCwwLTc3LDIuNS03OCwxOS41CiAgICBzMCw2MC41LDAsNjAuNUgzMjF2LTU2YzAsMC0xMS0zNCwxMzIuNS0zNFYyOThDMzEwLDI5OCwzMjEsMjY0LDMyMSwyNjR2LTU2aDU1LjVjMCwwLTEsNDMuNSwwLDYwLjVzNzcsMTkuNSw3NywxOS41bC0wLjUtODBoNTcuNQogICAgbC0wLjUsODBjMCwwLDc2LTIuNSw3Ny0xOS41czAtNjAuNSwwLTYwLjVoNTUuNXY1NmMwLDAsMTEsMzQtMTMyLjUsMzR2NDQuOTJDNjUzLjUsMzQyLjkyLDY0Mi41LDM3Ni45Miw2NDIuNSwzNzYuOTJ6Ii8+CiAgPGVsbGlwc2UgZmlsbD0iIzAwNjVCRCIgY3g9IjY3NC43OSIgY3k9IjQ4MS40NTgiIHJ4PSIxMC4xMjUiIHJ5PSIxMCIvPgogIDxlbGxpcHNlIGZpbGw9IiMwMDY1QkQiIGN4PSI1OTUuNTEzIiBjeT0iNTIyLjcwOCIgcng9IjEwLjEyNSIgcnk9IjEwIi8+CiAgPGVsbGlwc2UgZmlsbD0iIzAwNjVCRCIgY3g9IjY1MC4zMDQiIGN5PSI0NTUuNjg3IiByeD0iMTAuMTI1IiByeT0iMTAiLz4KICA8ZWxsaXBzZSBmaWxsPSIjMDA2NUJEIiBjeD0iNTc1LjI2MyIgY3k9IjQ5MS40NTgiIHJ4PSIxMC4xMjUiIHJ5PSIxMCIvPgogIDxlbGxpcHNlIGZpbGw9IiMwMDY1QkQiIGN4PSI3MDMuMDkiIGN5PSIzOTUuNTM5IiByeD0iMTAuMTI1IiByeT0iMTAiLz4KICA8ZWxsaXBzZSBmaWxsPSIjMDA2NUJEIiBjeD0iNzM3LjU4NyIgY3k9IjQwOS45MTciIHJ4PSIxMC4xMjUiIHJ5PSIxMCIvPgogIDxlbGxpcHNlIGZpbGw9IiMwMDY1QkQiIGN4PSI3MjEuNjY5IiBjeT0iMzI0LjgzOSIgcng9IjEwLjEyNSIgcnk9IjEwIi8+CiAgPGVsbGlwc2UgZmlsbD0iIzAwNjVCRCIgY3g9Ijc1OS41ODQiIGN5PSIzMjQuODM5IiByeD0iMTAuMTI1IiByeT0iMTAiLz4KICA8cGF0aCBmaWxsPSIjRjJDRTAxIiBkPSJNNDgwLjg4LDUzNi43MmMtOC4yNSwxLjg2LTQ0LjEzLDUuNzgtNDQuMTMsNS43OGwtMC41LTUuNWMwLDAsMjQuODctMi41LDI3LjI1LTQuNWwtMjguODgtNC43NWwtMjcuMzcsMjMKICAgIGwtNDIuNzUtMkwzOTYuNzUsNTI0aDI1LjVjLTM4Ljg4LTkuNjItNjYuMDQtMjAuMzYtNjYuMDQtMjAuMzZMMzI2LjUsNTI0bC00MS4zNS00Ljg2TDMxNyw0OTZsMjguNDEsMi4yCiAgICBDMzAxLjYyLDQ3OS44NywyNzgsNDU1Ljc1LDI3OCw0NTUuNzVMMjM3LjI1LDQ2MmwtMzIuNS0yMGw0MC41LTcuMjVsMjguNjIsMTYuMzdDMjQ1LjUsNDI3LjUsMjMwLjUsMzg2LDIzMC41LDM4NmwtMzgtOS4yNQogICAgbC0yMi0zMi41bDM5LjUsOS4yNWwxOC4xMiwyNi43NUMyMTYuNSwzNTAuNjIsMjE3LjI1LDMwNiwyMTcuMjUsMzA2bC0zMy0xOS41TDE3NCwyNDlsMzQuMzIsMjEuNDJsOS40MywzMS4wOGwxLTMxLjc1bC0zLjQyLTMyLjIxCiAgICBsMjUuMTctMzEuMjlsMy4xMywzOS4zN2wtMjAuMzgsMjUuMTN2MzMuMzdsMTAuNS0yNy4zN2wzNi0xOC4yNUwyNTcsMjk1bC0zMy42MiwxNy4zN2MwLDAtMSwzOCwxMi4xMiw2OS4yNWwwLjEzLTI4LjM3TDI2NC43NSwzMjYKICAgIGwwLjM4LDM5LjI1bC0yNi42MywyNC41YzAsMCwxNS4zNywzNS44Nyw0My4yNSw2MC43NWwtMTMuMjQtMjYuMTVsMTIuNzQtMzYuNkwyOTguNSw0MjNMMjg3LDQ1NC44N2MwLDAsMjcuMjUsMjUuMzgsNzAsNDEuODgKICAgIGwtMjIuNS0xOS41TDMzMC43NSw0MzlsMzAuNzUsMjQuNzVsMy41LDM2LjM4YzAsMCw1Mi4zOSwyMS4xOCwxMTUuODgsMjkuMDEiLz4KICA8cGF0aCBmaWxsPSIjMDA2NUJEIiBkPSJNNDgwLjg4LDUyOS4xNGM2My40OS03Ljg0LDExNS44Ny0yOS4wMiwxMTUuODctMjkuMDJsMy41LTM2LjM3TDYzMSw0MzlsLTMuNzUsMzguMjVsLTIyLjUsMTkuNQogICAgYzQyLjc1LTE2LjUsNzAtNDEuODcsNzAtNDEuODdMNjYzLjI1LDQyM2wxNy4yNS0zNS4yNWwxMi43NCwzNi42TDY4MCw0NTAuNWMyNy44OC0yNC44OCw0My4yNS02MC43NSw0My4yNS02MC43NWwtMjYuNjMtMjQuNQogICAgTDY5NywzMjZsMjkuMTIsMjcuMjVsMC4xMywyOC4zN2MxMy4xMy0zMS4yNCwxMi4xMy02OS4yNCwxMi4xMy02OS4yNEw3MDQuNzUsMjk1TDY5MiwyNTguNWwzNiwxOC4yNWwxMC41LDI3LjM3di0zMy4zNwogICAgbC0yMC4zOC0yNS4xM2wzLjEzLTM5LjM3bDI1LjE3LDMxLjI5TDc0MywyNjkuNzVsMSwzMS43NWw5LjQzLTMxLjA4TDc4Ny43NSwyNDlsLTEwLjI1LDM3LjVsLTMzLDE5LjVjMCwwLDAuNzUsNDQuNjItMTAuODgsNzQuMjUKICAgIGwxOC4xMy0yNi43NWwzOS41LTkuMjVsLTIyLDMyLjVsLTM4LDkuMjVjMCwwLTE1LDQxLjUtNDMuMzcsNjUuMTJsMjguNjItMTYuMzdMNzU3LDQ0MmwtMzIuNSwyMGwtNDAuNzUtNi4yNQogICAgYzAsMC0yMy42MywyNC4xMy02Ny40MSw0Mi40NWwyOC40MS0yLjJsMzEuODUsMjMuMTRMNjM1LjI1LDUyNGwtMjkuNzEtMjAuMzZjMCwwLTI3LjE2LDEwLjc0LTY2LjA0LDIwLjM2SDU2NWwzMi4yNSwyNC43NQogICAgbC00Mi43NSwybC0yNy4zOC0yM2wtMjguODcsNC43NWMyLjM3LDIsMjcuMjUsNC41LDI3LjI1LDQuNWwtMC41LDUuNWMwLDAtMzUuODUtMy45Mi00NC4xMi01Ljc4Ii8+CiAgPGVsbGlwc2UgZmlsbD0iI0YyQ0UwMSIgY3g9IjI4Ni45NiIgY3k9IjQ4MS40NTgiIHJ4PSIxMC4xMjUiIHJ5PSIxMCIvPgogIDxlbGxpcHNlIGZpbGw9IiNGMkNFMDEiIGN4PSIzNjYuMjM3IiBjeT0iNTIyLjcwOCIgcng9IjEwLjEyNSIgcnk9IjEwIi8+CiAgPGVsbGlwc2UgZmlsbD0iI0YyQ0UwMSIgY3g9IjMxMS40NDYiIGN5PSI0NTUuNjg3IiByeD0iMTAuMTI1IiByeT0iMTAiLz4KICA8ZWxsaXBzZSBmaWxsPSIjRjJDRTAxIiBjeD0iMzg2LjQ4NyIgY3k9IjQ5MS40NTgiIHJ4PSIxMC4xMjUiIHJ5PSIxMCIvPgogIDxlbGxpcHNlIGZpbGw9IiNGMkNFMDEiIGN4PSIyNTguNjYiIGN5PSIzOTUuNTM5IiByeD0iMTAuMTI1IiByeT0iMTAiLz4KICA8ZWxsaXBzZSBmaWxsPSIjRjJDRTAxIiBjeD0iMjI0LjE2MyIgY3k9IjQwOS45MTciIHJ4PSIxMC4xMjUiIHJ5PSIxMCIvPgogIDxlbGxpcHNlIGZpbGw9IiNGMkNFMDEiIGN4PSIyNDAuMDgxIiBjeT0iMzI0LjgzOSIgcng9IjEwLjEyNSIgcnk9IjEwIi8+CiAgPGVsbGlwc2UgZmlsbD0iI0YyQ0UwMSIgY3g9IjIwMi4xNjYiIGN5PSIzMjQuODM5IiByeD0iMTAuMTI1IiByeT0iMTAiLz4KICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNDgwLjYyNyw1MjkuMTA5Ii8+CjwvZz4KPC9zdmc+'}
  };
  const setLanguage=(lang,returnFocus=false)=>{
    const cfg=langDict[lang]; if(!cfg) return;
    document.documentElement.lang=lang;
    window.rfkStorage.set('rfk-language',lang);
    $$('[data-current-language-label]').forEach(el=>el.textContent=cfg.label);
    $$('[data-current-language-code]').forEach(el=>el.textContent=cfg.code);
    $$('[data-current-language-flag]').forEach(el=>{
      el.className='lang-flag '+cfg.flagClass;
      el.innerHTML=`<img src="${cfg.flagSrc}" alt="">`;
    });
    languageOptions.forEach(opt=>opt.setAttribute('aria-selected',String(opt.dataset.lang===lang)));
    closeAll({returnFocus:returnFocus});
  };
  const savedLang=window.rfkStorage.get('rfk-language')||'en';

  /* Central header controller */
  const header=$('#siteHeader');
  const searchPanel=$('#searchPanel');
  const searchInput=$('#globalSearch');
  const drawer=$('#mobileNavDrawer');
  const burger=$('#burgerBtn');
  const megaButtons=$$('.rfk-primary-nav-item');
  const megaPanels=$$('.rfk-mega-panel');
  let activeType=null;
  let activeTrigger=null;

  const setExpanded=(selector,value)=>$$(selector).forEach(el=>el.setAttribute('aria-expanded',String(value)));
  const closeMega=()=>{
    megaPanels.forEach(panel=>panel.hidden=true);
    megaButtons.forEach(button=>button.setAttribute('aria-expanded','false'));
  };
  const closeSearch=()=>{
    if(searchPanel){searchPanel.hidden=true;searchPanel.setAttribute('aria-hidden','true')}
    setExpanded('[data-search-trigger]',false);
  };
  const closeLanguage=()=>{
    if(languagePanel){languagePanel.hidden=true;languagePanel.setAttribute('aria-hidden','true')}
    setExpanded('[data-language-trigger]',false);
  };
  const closeDrawer=()=>{
    if(drawer){drawer.hidden=true;drawer.setAttribute('aria-hidden','true')}
    if(burger){burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open main menu')}
  };
  function closeAll({returnFocus=false,except=null}={}){
    const trigger=activeTrigger;
    if(except!=='mega') closeMega();
    if(except!=='search') closeSearch();
    if(except!=='language') closeLanguage();
    if(except!=='drawer') closeDrawer();
    if(!except){activeType=null;activeTrigger=null}
    if(returnFocus&&trigger) requestAnimationFrame(()=>trigger.focus());
  }

  const openMega=(key,trigger)=>{
    if(!desktopMQ.matches) return;
    closeAll({except:'mega'});
    const panel=$('#mega-'+key); if(!panel) return;
    closeMega(); panel.hidden=false; trigger.setAttribute('aria-expanded','true');
    activeType='mega'; activeTrigger=trigger;
  };
  const openSearch=(trigger)=>{
    closeAll({except:'search'});
    if(!searchPanel) return;
    searchPanel.hidden=false; searchPanel.setAttribute('aria-hidden','false');
    setExpanded('[data-search-trigger]',true);
    activeType='search';activeTrigger=trigger;
    setTimeout(()=>searchInput?.focus(),40);
  };
  const openLanguage=(trigger,focusOption=false)=>{
    closeAll({except:'language'});
    if(!languagePanel) return;
    languagePanel.hidden=false;languagePanel.setAttribute('aria-hidden','false');
    setExpanded('[data-language-trigger]',true);
    activeType='language';activeTrigger=trigger;
    if(focusOption) setTimeout(()=>languagePanel.querySelector('[aria-selected="true"]')?.focus(),30);
  };
  const openDrawer=(trigger)=>{
    closeAll({except:'drawer'});
    if(!drawer) return;
    drawer.hidden=false;drawer.setAttribute('aria-hidden','false');
    burger?.setAttribute('aria-expanded','true');burger?.setAttribute('aria-label','Close main menu');
    activeType='drawer';activeTrigger=trigger;
  };

  if(langDict[savedLang]) setLanguage(savedLang,false);

  $$('[data-search-trigger]').forEach(trigger=>{
    trigger.addEventListener('click',(e)=>{e.stopPropagation();searchPanel?.hidden?openSearch(trigger):closeAll({returnFocus:false})});
  });
  $$('[data-language-trigger]').forEach(trigger=>{
    trigger.addEventListener('click',(e)=>{e.stopPropagation();languagePanel?.hidden?openLanguage(trigger,false):closeAll({returnFocus:false})});
    trigger.addEventListener('keydown',(e)=>{if(e.key==='ArrowDown'){e.preventDefault();openLanguage(trigger,true)}});
  });
  burger?.addEventListener('click',(e)=>{e.stopPropagation();drawer?.hidden?openDrawer(burger):closeAll({returnFocus:false})});
  $('[data-close-drawer]')?.addEventListener('click',()=>closeAll({returnFocus:true}));
  $$('[data-close-header-panel]').forEach(btn=>btn.addEventListener('click',()=>closeAll({returnFocus:true})));

  megaButtons.forEach((button,index)=>{
    button.addEventListener('click',(e)=>{
      e.stopPropagation();
      const open=button.getAttribute('aria-expanded')==='true';
      open?closeAll({returnFocus:false}):openMega(button.dataset.mega,button);
    });
    button.addEventListener('keydown',(e)=>{
      if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
        e.preventDefault();let target=index;
        if(e.key==='ArrowRight')target=(index+1)%megaButtons.length;
        if(e.key==='ArrowLeft')target=(index-1+megaButtons.length)%megaButtons.length;
        if(e.key==='Home')target=0;if(e.key==='End')target=megaButtons.length-1;
        megaButtons[target].focus();
      }
      if(e.key==='ArrowDown'){e.preventDefault();openMega(button.dataset.mega,button);setTimeout(()=>$('#mega-'+button.dataset.mega)?.querySelector('a')?.focus(),30)}
    });
  });

  /* Drawer accordions */
  $$('.rfk-drawer-accordion').forEach(button=>button.addEventListener('click',()=>{
    const panel=$('#'+button.getAttribute('aria-controls'));const opening=button.getAttribute('aria-expanded')!=='true';
    $$('.rfk-drawer-accordion').forEach(other=>{
      if(other!==button){other.setAttribute('aria-expanded','false');const p=$('#'+other.getAttribute('aria-controls'));if(p)p.hidden=true;const mark=other.querySelector('.rfk-drawer-plus');if(mark)mark.textContent='+'}
    });
    button.setAttribute('aria-expanded',String(opening));if(panel)panel.hidden=!opening;
    const mark=button.querySelector('.rfk-drawer-plus');if(mark)mark.textContent=opening?'−':'+';
  }));
  $$('.rfk-drawer-subnav a,.rfk-drawer-footer a').forEach(link=>link.addEventListener('click',()=>closeAll()));

  languageOptions.forEach((opt,index)=>{
    opt.addEventListener('click',()=>setLanguage(opt.dataset.lang,true));
    opt.addEventListener('keydown',(e)=>{
      if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
        e.preventDefault();let target=index;
        if(e.key==='ArrowDown')target=(index+1)%languageOptions.length;
        if(e.key==='ArrowUp')target=(index-1+languageOptions.length)%languageOptions.length;
        if(e.key==='Home')target=0;if(e.key==='End')target=languageOptions.length-1;
        languageOptions[target].focus();
      }
    });
  });

  $$('[data-search-suggestion]').forEach(button=>button.addEventListener('click',()=>{
    if(searchInput){searchInput.value=button.dataset.searchSuggestion;searchInput.focus()}
  }));

  /* One open panel at a time; click outside and Escape close it. */
  document.addEventListener('click',(e)=>{
    if(activeType&&header&&!header.contains(e.target))closeAll();
  });
  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'&&activeType){e.preventDefault();closeAll({returnFocus:true})}
  });
  desktopMQ.addEventListener?.('change',(e)=>{
    if(e.matches){closeDrawer();}else{closeMega();}
    activeType=null;activeTrigger=null;
  });

  $$('.accordion > button').forEach(btn=>btn.addEventListener('click',()=>{
    const item=btn.parentElement; const open=item.classList.toggle('open');
    btn.setAttribute('aria-expanded',String(open));
    const mark=$('.acc-mark',btn); if(mark) mark.textContent=open?'−':'+';
  }));

  // dialog with focus return
  let lastFocus=null;
  $$('[data-open-dialog]').forEach(btn=>btn.addEventListener('click',()=>{
    lastFocus=btn; const dlg=$('#'+btn.dataset.openDialog); if(dlg) dlg.showModal();
  }));
  $$('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',()=>{
    const dlg=btn.closest('dialog');dlg?.close();lastFocus?.focus();
  }));
  $$('dialog').forEach(dlg=>dlg.addEventListener('cancel',()=>setTimeout(()=>lastFocus?.focus(),0)));

  // toast
  const toast=$('#toast');
  function showToast(msg){
    if(!toast) return;
    toast.textContent=msg;toast.classList.add('show');
    clearTimeout(window.__rfkToast);
    window.__rfkToast=setTimeout(()=>toast.classList.remove('show'),2200);
  }
  window.rfkToast=showToast;
  $$('[data-toast]').forEach(b=>b.addEventListener('click',()=>showToast(b.dataset.toast)));

  // cookie consent
  const cookie=$('#cookieBanner');
  const pref=window.rfkStorage.get('rfk-cookie-choice');
  if(cookie && pref) cookie.hidden=true;
  $('#cookieAccept')?.addEventListener('click',()=>{window.rfkStorage.set('rfk-cookie-choice','accept');cookie.hidden=true;showToast('Preferences saved')});
  $('#cookieReject')?.addEventListener('click',()=>{window.rfkStorage.set('rfk-cookie-choice','reject');cookie.hidden=true;showToast('Optional trackers rejected')});
  $('#cookieCustomize')?.addEventListener('click',()=>$('#cookieDialog')?.showModal());

  // print/copy
  $('#printBtn')?.addEventListener('click',()=>window.print());
  $('#copyLinkBtn')?.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(location.href);showToast('Link copied')}catch{}
  });

  // feedback
  $$('.feedback-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const box=btn.closest('.feedback'); if(box) box.innerHTML='<h3>Thank you for your feedback.</h3><p>Your response helps us improve public services.</p>';
  }));
})();

// V12.4 — i18n LTR / RTL guideline demo
document.querySelectorAll('[data-dir]').forEach((button)=>{
  button.addEventListener('click',()=>{
    const preview=document.getElementById('i18nPreview');
    if(!preview) return;
    const dir=button.getAttribute('data-dir') === 'rtl' ? 'rtl' : 'ltr';
    preview.setAttribute('dir',dir);
    document.querySelectorAll('[data-dir]').forEach((item)=>{
      item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
    });
  });
});


// V12.5 — Page tools
const toolPrint = document.getElementById('toolPrint');
if(toolPrint) toolPrint.addEventListener('click',()=>window.print());

const toolCopy = document.getElementById('toolCopy');
if(toolCopy) toolCopy.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText(window.location.href);
    window.rfkToast?.('Link copied to the clipboard.');
  }catch(e){
    window.rfkToast?.('The link could not be copied automatically.');
  }
});

const toolShare = document.getElementById('toolShare');
if(toolShare) toolShare.addEventListener('click', async ()=>{
  if(navigator.share){
    try{ await navigator.share({title:document.title,url:window.location.href}); }catch(e){}
  }else{
    try{
      await navigator.clipboard.writeText(window.location.href);
      window.rfkToast?.('Sharing is unavailable: link copied.');
    }catch(e){}
  }
});

const toolFavorite = document.getElementById('toolFavorite');
if(toolFavorite) toolFavorite.addEventListener('click',()=>{
  const active = toolFavorite.getAttribute('aria-pressed') === 'true';
  toolFavorite.setAttribute('aria-pressed', String(!active));
  const icon=toolFavorite.querySelector('.tool-icon');
  if(icon) icon.textContent = active ? '☆' : '★';
  window.rfkToast?.(active ? 'Page removed from favourites.' : 'Page added to demo favourites.');
});

const toolDownload = document.getElementById('toolDownload');
if(toolDownload) toolDownload.addEventListener('click',()=>{
  const blob=new Blob(['<!doctype html>\n'+document.documentElement.outerHTML],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='page-rfk.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

const toolTop = document.getElementById('toolTop');
if(toolTop) toolTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const toolContrast = document.getElementById('toolContrast');
if(toolContrast) toolContrast.addEventListener('click',()=>{
  window.rfkStorage.set('rfk-theme','aaa');
  window.rfkSetTheme?.('aaa');
});

const toolFeedback = document.getElementById('toolFeedback');
if(toolFeedback) toolFeedback.addEventListener('click',()=>{
  document.querySelector('#feedback')?.scrollIntoView({behavior:'smooth'});
});

document.querySelectorAll('[data-font-size]').forEach((btn)=>{
  btn.addEventListener('click',()=>{
    const value=btn.dataset.fontSize;
    document.body.classList.remove('font-large','font-xlarge');
    if(value==='large') document.body.classList.add('font-large');
    if(value==='xlarge') document.body.classList.add('font-xlarge');
    document.querySelectorAll('[data-font-size]').forEach((b)=>b.setAttribute('aria-pressed',String(b===btn)));
    window.rfkStorage.set('rfk-font-size',value);
  });
});
const savedFontSize=window.rfkStorage.get('rfk-font-size');
if(savedFontSize){
  document.querySelector(`[data-font-size="${savedFontSize}"]`)?.click();
}


// V12.10 — live validation
const liveValidationInput=document.getElementById('liveValidationInput');
const liveValidationMsg=document.getElementById('liveValidationMsg');
if(liveValidationInput && liveValidationMsg){
  const validate=()=>{
    const ok=liveValidationInput.value.length===12;
    liveValidationMsg.textContent=ok ? 'Valid format.' : `${liveValidationInput.value.length}/12 characters`;
    liveValidationMsg.className='inline-validation '+(ok?'ok':'error');
    liveValidationInput.setAttribute('aria-invalid', String(!ok));
  };
  liveValidationInput.addEventListener('input',validate);
  validate();
}

// V12.10 — address autocomplete demo
const addressAuto=document.getElementById('addressAuto');
const addressSuggestions=document.getElementById('addressSuggestions');
if(addressAuto && addressSuggestions){
  addressAuto.addEventListener('input',()=>{
    const open=addressAuto.value.trim().length>=2;
    addressSuggestions.classList.toggle('is-open',open);
    addressAuto.setAttribute('aria-expanded',String(open));
  });
  addressSuggestions.querySelectorAll('button').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      addressAuto.value=btn.textContent.trim();
      addressSuggestions.classList.remove('is-open');
      addressAuto.setAttribute('aria-expanded','false');
      addressAuto.focus();
    });
  });
  document.addEventListener('click',(e)=>{
    if(!addressSuggestions.contains(e.target) && e.target!==addressAuto){
      addressSuggestions.classList.remove('is-open');
      addressAuto.setAttribute('aria-expanded','false');
    }
  });
}

// V12.10 — autosave demo
const autosaveField=document.getElementById('autosaveField');
const autosaveStatus=document.getElementById('autosaveStatus');
if(autosaveField && autosaveStatus){
  let autosaveTimer;
  autosaveField.addEventListener('input',()=>{
    autosaveStatus.textContent='Saving…';
    clearTimeout(autosaveTimer);
    autosaveTimer=setTimeout(()=>{
      window.rfkStorage.set('rfk-demo-draft',autosaveField.value);
      autosaveStatus.textContent='Draft saved';
    },500);
  });
  const draft=window.rfkStorage.get('rfk-demo-draft');
  if(draft) autosaveField.value=draft;
}

// V12.10 — time filter toggles
document.querySelectorAll('.time-filters button').forEach((btn)=>{
  btn.addEventListener('click',()=>{
    const parent=btn.closest('.time-filters');
    parent?.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));
    btn.setAttribute('aria-pressed','true');
  });
});

// V12.10 — OTP auto advance
document.querySelectorAll('.otp-row').forEach((row)=>{
  const inputs=[...row.querySelectorAll('input')];
  inputs.forEach((input,i)=>{
    input.addEventListener('input',()=>{
      input.value=input.value.replace(/\D/g,'').slice(0,1);
      if(input.value && inputs[i+1]) inputs[i+1].focus();
    });
    input.addEventListener('keydown',(e)=>{
      if(e.key==='Backspace' && !input.value && inputs[i-1]) inputs[i-1].focus();
    });
  });
});




// V12.10.8 — tabs example
(() => {
  const panel=document.getElementById('tabPanel');
  const copy={
    overview:'Overview content.',
    documents:'List of documents associated with the case.',
    history:'History of actions and decisions.'
  };

  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click',() => {
      document.querySelectorAll('.tab-btn').forEach((item) => {
        item.setAttribute('aria-selected','false');
        item.setAttribute('tabindex','-1');
      });
      button.setAttribute('aria-selected','true');
      button.setAttribute('tabindex','0');
      if(panel){
        panel.innerHTML='<p>'+copy[button.dataset.tab]+'</p>';
        if(button.id) panel.setAttribute('aria-labelledby',button.id);
      }
    });
  });
})();


// V12.10.8 — keyboard navigation for tabs
(() => {
  const tabs=[...document.querySelectorAll('.tab-btn')];
  if(!tabs.length) return;

  tabs.forEach((tab,index) => {
    tab.setAttribute('tabindex',tab.getAttribute('aria-selected')==='true' ? '0' : '-1');
    tab.addEventListener('keydown',(event) => {
      if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let target=index;
      if(event.key==='ArrowRight') target=(index+1)%tabs.length;
      if(event.key==='ArrowLeft') target=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home') target=0;
      if(event.key==='End') target=tabs.length-1;
      tabs[target].focus();
      tabs[target].click();
    });
  });
})();