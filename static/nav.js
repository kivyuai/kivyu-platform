(function(){
  // Reveal on scroll
  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!els.length)return;
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
      });
    },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  }

  // Toast system
  window.kvToast=function(msg,type){
    type=type||'info';
    var container=document.getElementById('kv-toast');
    if(!container)return;
    var item=document.createElement('div');
    item.className='kv-toast-item '+type;
    item.textContent=msg;
    container.appendChild(item);
    setTimeout(function(){
      item.style.opacity='0';
      item.style.transform='translateX(20px)';
      item.style.transition='all .3s ease';
      setTimeout(function(){if(item.parentNode)item.parentNode.removeChild(item)},300);
    },3000);
  };

  // Navigation
  function initNav(){
    var placeholder=document.getElementById('kv-nav-placeholder');
    if(!placeholder)return;
    var user=null;
    try{user=JSON.parse(localStorage.getItem('kv_user')||'null')}catch(e){}
    var currentPage=window.location.pathname.split('/').pop()||'index.html';
    var links=[
      {href:'index.html',label:'Home'},
      {href:'videogen.html',label:'Video Gen'},
      {href:'dashboard.html',label:'Dashboard'},
      {href:'admin.html',label:'Admin',adminOnly:true}
    ];
    var isAdmin=user&&user.role==='admin';
    var navLinks=links.filter(function(l){return !l.adminOnly||isAdmin});
    var linksHtml=navLinks.map(function(l){
      var active=currentPage===l.href?'active':'';
      return '<a href="'+l.href+'" class="kv-nav-link '+active+'">'+l.label+'</a>';
    }).join('');
    var userHtml='';
    if(user){
      var initials=(user.name||user.email||'U').charAt(0).toUpperCase();
      userHtml='<div class="kv-nav-user"><div class="kv-nav-avatar">'+initials+'</div><span>'+( user.name||user.email)+'</span></div>'
        +'<button onclick="kvLogout()" style="background:none;border:1px solid rgba(255,255,255,.15);border-radius:7px;color:rgba(240,240,248,.55);padding:6px 12px;font-size:.8rem;cursor:pointer;">Sign Out</button>';
    }else{
      userHtml='<a href="login.html" class="btn-outline" style="padding:8px 18px;font-size:.85rem;">Sign In</a>'
        +'<a href="register.html" class="btn-primary" style="padding:8px 18px;font-size:.85rem;">Get Started</a>';
    }
    placeholder.outerHTML='<nav class="kv-nav"><a href="index.html" class="kv-nav-logo">KIVYU</a><div class="kv-nav-links">'+linksHtml+'</div><div class="kv-nav-actions">'+userHtml+'</div></nav>';
  }

  window.kvLogout=function(){
    localStorage.removeItem('kv_user');
    window.location.href='index.html';
  };

  // Init on DOM ready
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){initNav();initReveal()});
  }else{
    initNav();
    initReveal();
  }
})();
