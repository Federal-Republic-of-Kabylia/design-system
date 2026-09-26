(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  const currentDateTime=$('#currentDateTime');
  const updateDateTime=()=>{
    if(!currentDateTime) return;
    const now=new Date();
    const language=document.documentElement.lang;
    const locale=language==='fr'||language==='kab'?'fr-FR':'en-GB';
    currentDateTime.textContent=new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short'}).format(now);
    currentDateTime.dateTime=now.toISOString();
  };
  updateDateTime();
  window.setInterval(updateDateTime,1000);

  // theme manager
  const themeBtn=$('#themeBtn');
  const themeMenu=$('#themeMenu');
  const setTheme=(theme)=>{
    document.documentElement.dataset.theme=theme;
    localStorage.setItem('kabylia-webds-theme',theme);
    if(themeBtn) themeBtn.textContent = theme==='dark'?'◐ Dark':theme==='aaa'?'AAA High accessibility':'☀ Light';
  };
  const savedTheme=localStorage.getItem('kabylia-webds-theme');
  const systemTheme=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(savedTheme || systemTheme);
  if(window.matchMedia){
    const mq=window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change',(e)=>{
      if(!localStorage.getItem('kabylia-webds-theme')) setTheme(e.matches?'dark':'light');
    });
  }

  if(themeBtn&&themeMenu){
    themeBtn.addEventListener('click',(event)=>{
      event.stopPropagation();
      langMenu?.classList.remove('open');
      langBtn?.setAttribute('aria-expanded','false');
      searchPanel?.classList.remove('open');
      searchPanel?.setAttribute('aria-hidden','true');
      searchBtn?.setAttribute('aria-expanded','false');
      const open=themeMenu.classList.toggle('open');
      themeBtn.setAttribute('aria-expanded',String(open));
    });
    $$('.theme-option',themeMenu).forEach(b=>b.addEventListener('click',()=>{
      setTheme(b.dataset.theme);themeMenu.classList.remove('open');themeBtn.setAttribute('aria-expanded','false');
    }));
  }

  // header interactive controls
  const langBtn=$('#langBtn');
  const langMenu=$('#langMenu');
  const langFlag=$('#langFlag');
  const searchBtn=$('#searchBtn');
  const searchPanel=$('#searchPanel');
  const searchInput=$('#globalSearch');

  const dict={
    fr:{label:'French',code:'FR',title:'Institutional language selector',flagClass:'fr',flagSrc:'Html%20Design%20System/kabylia-webds-flag-fr.svg'},
    en:{label:'English',code:'EN',title:'Institutional language selector',flagClass:'us',flagSrc:'Html%20Design%20System/kabylia-webds-flag-en.svg'},
    kab:{label:'Taqbaylit',code:'KAB',title:'Afran n tutlayt n tnebdant',flagClass:'kab',flagSrc:'Html%20Design%20System/kabylia-webds-flag-kab.svg'}
  };

  const closeLang=()=>{
    if(!langMenu||!langBtn) return;
    langMenu.classList.remove('open');
    langBtn.setAttribute('aria-expanded','false');
  };

  const openLang=(focusOption=false)=>{
    if(!langMenu||!langBtn) return;
    themeMenu?.classList.remove('open');
    themeBtn?.setAttribute('aria-expanded','false');
    searchPanel?.classList.remove('open');
    searchPanel?.setAttribute('aria-hidden','true');
    searchBtn?.setAttribute('aria-expanded','false');
    langMenu.classList.add('open');
    langBtn.setAttribute('aria-expanded','true');
    if(focusOption){
      const selected=langMenu.querySelector('[aria-selected="true"]') || langMenu.querySelector('.lang-option');
      selected?.focus();
    }
  };

  const closeSearch=()=>{
    if(!searchPanel||!searchBtn) return;
    searchPanel.classList.remove('open');
    searchPanel.setAttribute('aria-hidden','true');
    searchBtn.setAttribute('aria-expanded','false');
  };

  const openSearch=()=>{
    if(!searchPanel||!searchBtn) return;
    closeLang();
    themeMenu?.classList.remove('open');
    themeBtn?.setAttribute('aria-expanded','false');
    searchPanel.classList.add('open');
    searchPanel.setAttribute('aria-hidden','false');
    searchBtn.setAttribute('aria-expanded','true');
    setTimeout(()=>searchInput?.focus(),60);
  };

  const setLanguage=(lang,returnFocus=false)=>{
    const cfg=dict[lang];
    if(!cfg) return;

    document.documentElement.lang=lang;
    localStorage.setItem('kabylia-webds-language',lang);
    updateDateTime();

    const label=$('#langLabel');
    const code=$('#langCode');
    if(label) label.textContent=cfg.label;
    if(code) code.textContent=cfg.code;
    $$('[data-i18n="lang-title"]').forEach(el=>el.textContent=cfg.title);

    if(langFlag){
      langFlag.className='lang-flag '+cfg.flagClass;
      langFlag.innerHTML=`<img src="${cfg.flagSrc}" alt="">`;
    }

    $$('.lang-option',langMenu).forEach(o=>{
      const selected=o.dataset.lang===lang;
      o.setAttribute('aria-selected',String(selected));
      o.removeAttribute('aria-current');
    });

    closeLang();
    if(returnFocus) langBtn?.focus();
  };

  if(langBtn&&langMenu){
    langBtn.addEventListener('click',(event)=>{
      event.stopPropagation();
      const open=langBtn.getAttribute('aria-expanded')==='true';
      open ? closeLang() : openLang(false);
    });

    langBtn.addEventListener('keydown',(event)=>{
      if(event.key==='ArrowDown'){
        event.preventDefault();
        openLang(true);
      }else if(event.key==='Escape'){
        closeLang();
      }
    });

    const options=$$('.lang-option',langMenu);
    options.forEach((opt,index)=>{
      opt.addEventListener('click',()=>setLanguage(opt.dataset.lang,true));
      opt.addEventListener('keydown',(event)=>{
        if(event.key==='ArrowDown'||event.key==='ArrowUp'){
          event.preventDefault();
          const delta=event.key==='ArrowDown'?1:-1;
          options[(index+delta+options.length)%options.length].focus();
        }else if(event.key==='Home'){
          event.preventDefault();options[0]?.focus();
        }else if(event.key==='End'){
          event.preventDefault();options[options.length-1]?.focus();
        }else if(event.key==='Escape'){
          event.preventDefault();closeLang();langBtn.focus();
        }
      });
    });

    const savedLang=localStorage.getItem('kabylia-webds-language') || 'en';
    if(dict[savedLang]) setLanguage(savedLang,false);
  }

  if(searchBtn&&searchPanel){
    searchBtn.addEventListener('click',(event)=>{
      event.stopPropagation();
      const open=searchBtn.getAttribute('aria-expanded')==='true';
      open ? closeSearch() : openSearch();
    });

    searchPanel.addEventListener('keydown',(event)=>{
      if(event.key==='Escape'){
        event.preventDefault();
        closeSearch();
        searchBtn.focus();
      }
    });
  }

  // outside click for dropdowns only; search stays open until explicitly closed.
  document.addEventListener('click',(e)=>{
    if(langMenu && !e.target.closest('.lang')){
      closeLang();
    }
    if(themeMenu && !e.target.closest('.theme-wrap')){
      themeMenu.classList.remove('open');
      themeBtn?.setAttribute('aria-expanded','false');
    }
  });

  // accordion
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
    clearTimeout(window.__kabyliaWebDSToast);
    window.__kabyliaWebDSToast=setTimeout(()=>toast.classList.remove('show'),2200);
  }
  window.kabyliaWebDS=window.kabyliaWebDS || {};
  window.kabyliaWebDS.toast=showToast;
  window.kabyliaWebDS.setTheme=setTheme;
  $$('[data-toast]').forEach(b=>b.addEventListener('click',()=>showToast(b.dataset.toast)));

  // cookie consent
  const cookie=$('#cookieBanner');
  const pref=localStorage.getItem('kabylia-webds-cookie-choice');
  if(cookie && pref) cookie.hidden=true;
  $('#cookieAccept')?.addEventListener('click',()=>{localStorage.setItem('kabylia-webds-cookie-choice','accept');cookie.hidden=true;showToast('Preferences saved')});
  $('#cookieReject')?.addEventListener('click',()=>{localStorage.setItem('kabylia-webds-cookie-choice','reject');cookie.hidden=true;showToast('Optional trackers rejected')});
  $('#cookieCustomize')?.addEventListener('click',()=>$('#cookieDialog')?.showModal());

  // print/copy
  $('#printBtn')?.addEventListener('click',()=>window.print());
  $('#copyLinkBtn')?.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(location.href);showToast('Link copied')}catch{}
  });

  const globalSearchForm=$('#globalSearchForm');
  if(globalSearchForm){
    globalSearchForm.addEventListener('submit',(event)=>{
      event.preventDefault();
      const query=$('#globalSearch')?.value.trim().toLowerCase();
      if(!query){
        showToast('Enter a search term');
        return;
      }
      const match=$$('main h2,main h3,main article,main section').find((element)=>
        element.textContent.toLowerCase().includes(query)
      );
      if(match){
        match.scrollIntoView({behavior:'smooth',block:'start'});
        showToast('Result found');
      }else{
        showToast('No results found');
      }
    });
  }

  // feedback
  $$('.feedback-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const box=btn.closest('.feedback'); if(box) box.innerHTML='<h3>Thank you for your feedback.</h3><p>Your response helps us improve public services.</p>';
  }));

  $$('a[href="#"]').forEach((link)=>link.addEventListener('click',(event)=>{
    event.preventDefault();
    window.kabyliaWebDS?.toast?.('Demo link: destination not configured.');
  }));
})();

// Navigation dropdowns
(() => {
  const dropdowns=[...document.querySelectorAll('.nav-dropdown')];
  const closeDropdowns=(except=null)=>dropdowns.forEach((dropdown)=>{
    if(dropdown===except) return;
    dropdown.classList.remove('is-open');
    dropdown.querySelector('.menu-trigger')?.setAttribute('aria-expanded','false');
    dropdown.querySelector('.nav-menu')?.classList.remove('open');
  });

  dropdowns.forEach((dropdown)=>{
    const trigger=dropdown.querySelector('.menu-trigger');
    const menu=dropdown.querySelector('.nav-menu');
    if(!trigger||!menu) return;

    trigger.addEventListener('click',(event)=>{
      event.stopPropagation();
      const open=trigger.getAttribute('aria-expanded')==='true';
      closeDropdowns(open?null:dropdown);
      trigger.setAttribute('aria-expanded',String(!open));
      dropdown.classList.toggle('is-open',!open);
      menu.classList.toggle('open',!open);
      if(!open) menu.querySelector('a')?.focus();
    });

    trigger.addEventListener('keydown',(event)=>{
      if(event.key==='ArrowDown'){
        event.preventDefault();
        if(trigger.getAttribute('aria-expanded')!=='true') trigger.click();
      }else if(event.key==='Escape'){
        closeDropdowns();
      }
    });

    menu.querySelectorAll('a').forEach((link)=>link.addEventListener('click',()=>closeDropdowns()));
  });

  document.addEventListener('click',(event)=>{
    if(!event.target.closest('.nav-dropdown')) closeDropdowns();
  });
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape') closeDropdowns();
  });
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
    window.kabyliaWebDS?.toast?.('Link copied to the clipboard.');
  }catch(e){
    window.kabyliaWebDS?.toast?.('The link could not be copied automatically.');
  }
});

const toolShare = document.getElementById('toolShare');
if(toolShare) toolShare.addEventListener('click', async ()=>{
  if(navigator.share){
    try{ await navigator.share({title:document.title,url:window.location.href}); }catch(e){}
  }else{
    try{
      await navigator.clipboard.writeText(window.location.href);
      window.kabyliaWebDS?.toast?.('Sharing is unavailable: link copied.');
    }catch(e){}
  }
});

const toolFavorite = document.getElementById('toolFavorite');
if(toolFavorite) toolFavorite.addEventListener('click',()=>{
  const active = toolFavorite.getAttribute('aria-pressed') === 'true';
  toolFavorite.setAttribute('aria-pressed', String(!active));
  const icon=toolFavorite.querySelector('.tool-icon');
  if(icon) icon.textContent = active ? '☆' : '★';
  window.kabyliaWebDS?.toast?.(active ? 'Page removed from favourites.' : 'Page added to demo favourites.');
});

const toolDownload = document.getElementById('toolDownload');
if(toolDownload) toolDownload.addEventListener('click',()=>{
  const blob=new Blob(['<!doctype html>\n'+document.documentElement.outerHTML],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='page-kabylia-webds.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

const toolTop = document.getElementById('toolTop');
if(toolTop) toolTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const toolContrast = document.getElementById('toolContrast');
if(toolContrast) toolContrast.addEventListener('click',()=>{
  localStorage.setItem('kabylia-webds-theme','aaa');
  window.kabyliaWebDS?.setTheme?.('aaa');
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
    localStorage.setItem('kabylia-webds-font-size',value);
  });
});
const savedFontSize=localStorage.getItem('kabylia-webds-font-size');
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
      addressSuggestions.querySelectorAll('[role="option"]').forEach((option)=>
        option.setAttribute('aria-selected',String(option===btn))
      );
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
      localStorage.setItem('kabylia-webds-demo-draft',autosaveField.value);
      autosaveStatus.textContent='Draft saved';
    },500);
  });
  const draft=localStorage.getItem('kabylia-webds-demo-draft');
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


// V12.10.5 — responsive navigation controller
(() => {
  const burger=document.getElementById('burgerBtn');
  const panel=document.getElementById('primaryNavigation');
  const searchBtn=document.getElementById('searchBtn');
  const searchPanel=document.getElementById('searchPanel');
  const langBtn=document.getElementById('langBtn');
  const langMenu=document.getElementById('langMenu');
  const themeBtn=document.getElementById('themeBtn');
  const themeMenu=document.getElementById('themeMenu');
  const desktopMQ=window.matchMedia('(min-width:1101px)');

  const closeMenu=(returnFocus=false)=>{
    if(!burger||!panel) return;
    panel.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label','Open main menu');
    if(!desktopMQ.matches) panel.setAttribute('aria-hidden','true');
    if(returnFocus) burger.focus();
  };

  const openMenu=()=>{
    if(!burger||!panel) return;
    searchPanel?.classList.remove('open');
    searchPanel?.setAttribute('aria-hidden','true');
    searchBtn?.setAttribute('aria-expanded','false');
    langMenu?.classList.remove('open');
    langBtn?.setAttribute('aria-expanded','false');
    themeMenu?.classList.remove('open');
    themeBtn?.setAttribute('aria-expanded','false');

    panel.classList.add('menu-open');
    panel.setAttribute('aria-hidden','false');
    burger.setAttribute('aria-expanded','true');
    burger.setAttribute('aria-label','Close main menu');
  };

  const syncResponsiveState=()=>{
    if(!panel) return;
    if(desktopMQ.matches){
      panel.classList.remove('menu-open');
      panel.setAttribute('aria-hidden','false');
      burger?.setAttribute('aria-expanded','false');
      burger?.setAttribute('aria-label','Open main menu');
    }else{
      const open=burger?.getAttribute('aria-expanded')==='true';
      panel.setAttribute('aria-hidden',open?'false':'true');
    }
  };

  if(burger&&panel){
    burger.addEventListener('click',(event)=>{
      event.stopPropagation();
      const open=burger.getAttribute('aria-expanded')==='true';
      open?closeMenu(false):openMenu();
    });

    panel.querySelectorAll('a[href^="#"]').forEach(link=>{
      link.addEventListener('click',()=>{
        if(!desktopMQ.matches) closeMenu(false);
      });
    });

    document.addEventListener('keydown',(event)=>{
      if(event.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){
        closeMenu(true);
      }
    });

    desktopMQ.addEventListener?.('change',syncResponsiveState);
    syncResponsiveState();
  }

  // If search or language is opened on tablet/mobile, close the burger drawer.
  searchBtn?.addEventListener('click',()=>{
    if(!desktopMQ.matches && burger?.getAttribute('aria-expanded')==='true'){
      closeMenu(false);
    }
  },{capture:true});

  langBtn?.addEventListener('click',()=>{
    if(!desktopMQ.matches && burger?.getAttribute('aria-expanded')==='true'){
      closeMenu(false);
    }
  },{capture:true});

})();
