/* ShameOnYou.com — site behaviour (vanilla JS, no dependencies) */
(function(){
  "use strict";
  var C = window.SOY_CONFIG || {}, D = window.SOY_DATA || {};
  var $ = function(s,r){return (r||document).querySelector(s)}, $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var store = {get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
  function route(){ try{ return atob(C.c).split("").reverse().join("") }catch(e){ return "" } }
  function toast(msg){var t=$(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");setTimeout(function(){t.classList.remove("show")},2600)}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

  /* Theme */
  var root=document.documentElement, saved=store.get("soy-theme",null); if(saved) root.setAttribute("data-theme",saved);
  $$("[data-theme-toggle]").forEach(function(b){b.addEventListener("click",function(){
    var dark = root.getAttribute("data-theme")==="dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var n = dark?"light":"dark"; root.setAttribute("data-theme",n); store.set("soy-theme",n);
  })});

  /* Mobile menu */
  var burger=$(".burger"), menu=$(".menu");
  if(burger&&menu){burger.addEventListener("click",function(){var o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)})}

  /* Year */
  $$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});

  /* Hidden mail links: <a data-mail="Subject">Email us</a> — address never in the DOM until click */
  $$("[data-mail]").forEach(function(a){a.setAttribute("href","#");a.addEventListener("click",function(e){e.preventDefault();window.location.href="mailto:"+route()+"?subject="+encodeURIComponent(a.getAttribute("data-mail")||"ShameOnYou.com inquiry")})});

  /* Forms → FormSubmit AJAX endpoint (address decoded at submit time) */
  $$("form[data-form]").forEach(function(f){
    f.addEventListener("submit",function(e){
      e.preventDefault();
      if(f.querySelector("[name=_honey]") && f.querySelector("[name=_honey]").value) return;
      if(!f.checkValidity()){f.reportValidity();return}
      var msg=f.querySelector(".form-msg"), btn=f.querySelector("[type=submit]"), label=btn?btn.innerHTML:"";
      if(btn){btn.disabled=true;btn.innerHTML="Sending…"}
      var fd=new FormData(f), data={};
      fd.forEach(function(v,k){ if(k==="_honey"||v instanceof File) return; data[k]= data[k]? data[k]+", "+v : v });
      data._subject="[ShameOnYou.com] "+f.getAttribute("data-form")+" submission";
      data._template="table"; data._captcha="false"; data["Form"]=f.getAttribute("data-form"); data["Page"]=location.pathname;
      if(data.email) data._replyto=data.email;
      fetch("https://formsubmit.co/ajax/"+route(),{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
        .then(function(r){return r.json()}).then(function(){
          if(msg){msg.className="form-msg ok";msg.textContent=f.getAttribute("data-success")||"Thank you! We received your submission and will be in touch shortly."}
          f.reset(); resetSteps(f); if(window.gtag) gtag("event","generate_lead",{form:f.getAttribute("data-form")});
        }).catch(function(){ if(msg){msg.className="form-msg err";msg.textContent="Something went wrong. Please try again in a moment."} })
        .then(function(){ if(btn){btn.disabled=false;btn.innerHTML=label} });
    });
  });

  /* Multi-step forms */
  function resetSteps(f){var s=$$(".step",f);if(!s.length)return;s.forEach(function(x,i){x.classList.toggle("on",i===0)});$$(".steps span",f).forEach(function(x,i){x.classList.toggle("on",i===0)})}
  $$("form").forEach(function(f){
    $$("[data-next],[data-prev]",f).forEach(function(b){b.addEventListener("click",function(){
      var steps=$$(".step",f), cur=steps.findIndex(function(s){return s.classList.contains("on")});
      if(b.hasAttribute("data-next")){ var bad=$$("input,select,textarea",steps[cur]).filter(function(i){return !i.checkValidity()}); if(bad.length){bad[0].reportValidity();return} cur++ } else cur--;
      steps.forEach(function(s,i){s.classList.toggle("on",i===cur)}); $$(".steps span",f).forEach(function(s,i){s.classList.toggle("on",i<=cur)});
      f.scrollIntoView({behavior:"smooth",block:"start"});
    })});
  });

  /* Donations */
  var don=$("#donate-widget");
  if(don){
    var amt=25, freq="once";
    $$(".amounts button",don).forEach(function(b){b.addEventListener("click",function(){$$(".amounts button",don).forEach(function(x){x.classList.remove("on")});b.classList.add("on");amt=+b.dataset.amt;$("#don-custom").value="";upd()})});
    $("#don-custom").addEventListener("input",function(){var v=+this.value;if(v>0){amt=v;$$(".amounts button",don).forEach(function(x){x.classList.remove("on")})}upd()});
    $$(".toggle button",don).forEach(function(b){b.addEventListener("click",function(){$$(".toggle button",don).forEach(function(x){x.classList.remove("on")});b.classList.add("on");freq=b.dataset.freq;upd()})});
    var purpose=$("#don-purpose");
    function upd(){ $("#don-total").textContent="$"+amt+(freq==="monthly"?"/month":"") }
    upd();
    $("#don-go").addEventListener("click",function(){
      var p=purpose?purpose.value:"General support", cur=C.currency||"USD", url;
      if(freq==="monthly") url="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick-subscriptions&business="+encodeURIComponent(route())+"&item_name="+encodeURIComponent("ShameOnYou.com monthly support – "+p)+"&a3="+amt+"&p3=1&t3=M&src=1&currency_code="+cur+"&no_shipping=1";
      else url="https://www.paypal.com/donate/?business="+encodeURIComponent(route())+"&amount="+amt+"&item_name="+encodeURIComponent("ShameOnYou.com – "+p)+"&currency_code="+cur+"&no_recurring=0";
      window.open(url,"_blank","noopener");
    });
    ["kofi","buymeacoffee","patreon","stripeLink"].forEach(function(k){var el=$("[data-alt='"+k+"']");if(!el)return;if(C[k]){el.href=C[k]}else el.classList.add("hidden")});
  }

  /* Counters */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){es.forEach(function(en){
    if(!en.isIntersecting) return; var el=en.target; io.unobserve(el);
    if(el.hasAttribute("data-count")){ var to=+el.dataset.count, pre=el.dataset.pre||"", suf=el.dataset.suf||"", dec=+(el.dataset.dec||0), t0=null;
      (function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/1400,1), v=to*(1-Math.pow(1-p,3)); el.textContent=pre+v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,",")+suf; if(p<1) requestAnimationFrame(step) })(performance.now()); }
    else el.classList.add("in");
  })},{threshold:.2}) : null;
  $$("[data-count],.reveal").forEach(function(el){ if(io) io.observe(el); else el.classList.add("in") });

  /* Hall of Shame renderer */
  function shameCard(s){
    var votes=store.get("soy-votes",{}), v=votes[s.id];
    return '<article class="card shame-card reveal in" data-cat="'+esc(s.cat)+'" data-text="'+esc((s.title+" "+s.desc+" "+s.cat).toLowerCase())+'">'+
      '<div class="ico">'+s.icon+'</div><span class="tag">'+esc(s.cat)+'</span><h3 style="margin-top:10px">'+esc(s.title)+'</h3><p>'+esc(s.desc)+'</p>'+
      '<div class="score"><strong>Shame score</strong><div class="bar"><i style="width:'+s.score+'%"></i></div><strong>'+s.score+'</strong></div>'+
      '<details><summary>How to fight back</summary><p>'+esc(s.fix)+'</p></details>'+
      '<div class="vote-row"><button class="vote'+(v==="up"?" voted":"")+'" data-vote="up" data-id="'+s.id+'">😠 Shameful</button><button class="vote'+(v==="meh"?" voted":"")+'" data-vote="meh" data-id="'+s.id+'">🤷 Seen worse</button><button class="vote" data-share="'+s.id+'">↗ Share</button></div></article>';
  }
  var hall=$("#shame-grid");
  if(hall && D.shames){
    var limit=+(hall.dataset.limit||99), list=D.shames.slice().sort(function(a,b){return b.score-a.score}).slice(0,limit);
    hall.innerHTML=list.map(shameCard).join("");
    var chips=$("#shame-filters"), q=$("#shame-search"), active="All";
    if(chips){ chips.innerHTML=D.categories.map(function(c){return '<button class="chip'+(c==="All"?" active":"")+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join("");
      chips.addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;$$(".chip",chips).forEach(function(x){x.classList.remove("active")});b.classList.add("active");active=b.dataset.c;filter()}); }
    function filter(){var t=q?q.value.toLowerCase().trim():"", n=0;$$(".shame-card",hall).forEach(function(c){var ok=(active==="All"||c.dataset.cat===active)&&(!t||c.dataset.text.indexOf(t)>-1);c.classList.toggle("hidden",!ok);if(ok)n++});var e=$("#shame-empty");if(e)e.classList.toggle("hidden",n>0)}
    if(q){ q.addEventListener("input",filter); var qs=new URLSearchParams(location.search).get("q"); if(qs){q.value=qs;filter()} }
    hall.addEventListener("click",function(e){
      var b=e.target.closest("[data-vote]"); if(b){var votes=store.get("soy-votes",{});votes[b.dataset.id]=b.dataset.vote;store.set("soy-votes",votes);$$('[data-id="'+b.dataset.id+'"]',hall).forEach(function(x){x.classList.toggle("voted",x===b)});toast("Vote recorded. Thanks for holding them accountable!");return}
      var s=e.target.closest("[data-share]"); if(s){var u=location.origin+location.pathname.replace(/[^/]*$/,"")+"hall-of-shame.html#"+s.dataset.share; if(navigator.share) navigator.share({title:"ShameOnYou.com – Hall of Shame",url:u}).catch(function(){}); else {navigator.clipboard&&navigator.clipboard.writeText(u);toast("Link copied!")}}
    });
  }

  /* Alerts renderer */
  var al=$("#alerts-list");
  if(al&&D.alerts){ var lim=+(al.dataset.limit||99); al.innerHTML=D.alerts.slice(0,lim).map(function(a){var cls=a.level==="High"?"":a.level==="Medium"?"amber":"green";
    return '<article class="card reveal in"><div class="pill-row"><span class="tag '+cls+'">'+a.level+' risk</span><span class="tag blue">'+esc(a.type)+'</span></div><h3 style="margin-top:12px">'+esc(a.title)+'</h3><p>'+esc(a.body)+'</p><p class="small muted mb0">Posted '+new Date(a.date+"T12:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})+'</p></article>'}).join("") }

  /* Guides renderer */
  var gl=$("#guides-list");
  if(gl&&D.guides){ gl.innerHTML=D.guides.map(function(g){return '<article class="card reveal in"><div class="ico">'+g.icon+'</div><span class="tag blue">'+esc(g.cat)+'</span><h3 style="margin-top:10px"><a href="learn.html#'+g.slug+'">'+esc(g.title)+'</a></h3><p class="small muted mb0">'+g.read+' read</p></article>'}).join("") }

  /* Videos (lite embeds) */
  var vg=$("#video-grid");
  if(vg&&C.videos){ var vl=+(vg.dataset.limit||99); vg.innerHTML=C.videos.slice(0,vl).map(function(v){
      if(v.id) return '<div><div class="video" data-yt="'+esc(v.id)+'"><img loading="lazy" src="https://i.ytimg.com/vi/'+esc(v.id)+'/hqdefault.jpg" alt=""><div class="play"><span>▶</span></div></div><h3 style="margin-top:12px;font-size:1.05rem">'+esc(v.title)+'</h3></div>';
      return '<div><a class="video video-ph" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query='+encodeURIComponent(v.q)+'">▶ '+esc(v.title)+'</a><h3 style="margin-top:12px;font-size:1.05rem">'+esc(v.title)+'</h3></div>';
    }).join("");
    vg.addEventListener("click",function(e){var v=e.target.closest("[data-yt]");if(!v)return;v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+v.dataset.yt+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>'});
  }

  /* Hero shame-o-meter demo */
  var hm=$("#hero-meter");
  if(hm){ var pts=[18,46,72,95,61,88], i=0, lbl=$("#hero-meter-label"), names=["Honest pricing","Tiny print","Drip fees","Fake store","Pre-ticked boxes","Roach-motel subscription"];
    setInterval(function(){i=(i+1)%pts.length;hm.style.left=pts[i]+"%";if(lbl)lbl.textContent=names[i]+" — "+pts[i]+"/100"},2200); }

  /* Shame-O-Meter calculator */
  var calc=$("#calc");
  if(calc){ function run(){var s=0;$$("input[type=checkbox]:checked",calc).forEach(function(c){s+=+c.value});s=Math.min(100,s);$("#calc-needle").style.left=s+"%";$("#calc-score").textContent=s;
      var v=s<25?["Looks reasonable","Normal caution applies."]:s<50?["Proceed carefully","Several red flags. Verify independently before paying."]:s<75?["Highly suspicious","Stop. Do not pay or share data until verified."]:["Shame on them!","This matches classic scam patterns. Walk away and report it."];
      $("#calc-verdict").textContent=v[0];$("#calc-advice").textContent=v[1]}
    calc.addEventListener("change",run); run(); }

  /* Link red-flag scanner (client-side heuristics only) */
  var lc=$("#linkcheck");
  if(lc){ lc.addEventListener("submit",function(e){e.preventDefault();var raw=$("#lc-url").value.trim(), out=$("#lc-out"), flags=[], score=0, u;
    try{u=new URL(/^https?:\/\//i.test(raw)?raw:"http://"+raw)}catch(x){out.innerHTML='<div class="form-msg err">That doesn’t look like a valid link.</div>';return}
    var h=u.hostname.toLowerCase();
    function f(c,t,p){if(c){flags.push(t);score+=p}}
    f(u.protocol!=="https:","Not using HTTPS (no padlock).",15);
    f(/^\d+\.\d+\.\d+\.\d+$/.test(h),"Uses a raw IP address instead of a domain.",30);
    f(h.indexOf("xn--")>-1,"Punycode domain — may imitate another brand with look-alike letters.",30);
    f((h.match(/-/g)||[]).length>=3,"Many hyphens in the domain — common in throwaway scam sites.",15);
    f(h.split(".").length>4,"Unusually deep subdomain chain.",15);
    f(/\.(zip|mov|top|xyz|click|shop|live|buzz|rest|cfd|sbs|icu|cyou|monster|lol|online|site)$/.test(h),"Uses a low-cost TLD frequently abused in scams (not proof, but a flag).",15);
    f(/(login|verify|secure|account|update|wallet|refund|claim|bonus|gift|free|toll|parcel|delivery)/.test(h),"Domain contains bait words (login, verify, refund, toll, delivery…).",20);
    f(/(paypal|apple|amazon|netflix|microsoft|google|bank|usps|fedex|dhl|irs|canada|post)/.test(h) && !/^(www\.)?(paypal|apple|amazon|netflix|microsoft|google)\.com$/.test(h),"Mentions a big brand but isn’t that brand’s official domain.",30);
    f(raw.length>120,"Very long link — often used to hide the real destination.",10);
    f(/@/.test(raw),"Contains ‘@’ — the real destination may be hidden after it.",25);
    score=Math.min(100,score);
    var lvl=score>=50?["High risk","err"]:score>=20?["Caution","err"]:["No obvious red flags","ok"];
    out.innerHTML='<div class="form-msg '+lvl[1]+'">'+lvl[0]+' — risk score '+score+'/100</div>'+(flags.length?'<ul class="mt">'+flags.map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+"</ul>":'<p class="mt">We found no pattern-based flags. Still check domain age, reviews and contact details — scams evolve.</p>')+'<p class="small muted">Heuristic check only. It does not visit the link and cannot guarantee safety.</p>';
  })}

  /* Scam IQ quiz */
  var qz=$("#quiz");
  if(qz){ var Q=[
    ["A text says your parcel is on hold and asks for a $1.99 redelivery fee via a link. What do you do?",["Pay — it’s only $1.99","Click to check the tracking","Ignore the link and check the courier’s official app","Reply STOP"],2],
    ["Which payment method gives you the MOST protection when shopping online?",["Gift card","Wire transfer","Credit card","Crypto"],2],
    ["A ‘bank’ caller asks you to move money to a ‘safe account’. This is…",["Standard fraud procedure","Always a scam","Fine if they know your name","Fine if caller ID shows the bank"],1],
    ["Shrinkflation means…",["Prices rising fast","Product size shrinking at the same price","Stores closing","A discount code"],1],
    ["The best way to check if a store is real?",["Look at its Instagram likes","Check domain age, address & independent reviews","Trust the SSL padlock","Check if it has a chat widget"],1],
    ["A job pays you to ‘rate products’ but asks you to deposit money to unlock tasks. It’s…",["A normal onboarding fee","A task scam","A pyramid bonus","Legal if paid by crypto"],1],
    ["‘No thanks, I like paying full price’ on a pop-up is an example of…",["Good UX","Confirmshaming (a dark pattern)","A legal requirement","A coupon"],1],
    ["Your ‘grandchild’ calls crying, needs bail money now. First step?",["Send money quickly","Hang up and call them back on a known number","Ask the caller for proof by text","Buy gift cards"],1],
    ["A product labeled ‘eco-friendly’ with no certification is possibly…",["Greenwashing","Carbon-neutral","Organic","Recycled"],0],
    ["You got scammed by card. The first thing to do?",["Post about it online","Call your card issuer to block and dispute","Wait a week","Email the scammer"],1]
  ], qi=0, sc=0;
    function show(){ if(qi>=Q.length){var pct=Math.round(sc/Q.length*100), t=pct>=90?"Scam-Proof Legend 🛡️":pct>=70?"Street-Smart Shopper 👀":pct>=50?"Getting There ⚠️":"Prime Target 🎯";
        qz.innerHTML='<div class="center"><div class="eyebrow">Your Scam IQ</div><h2 class="grad-text" style="font-size:3.5rem">'+sc+'/'+Q.length+'</h2><h3>'+t+'</h3><p>Share your score and challenge your friends — the more people who know, the fewer victims.</p><div class="hero-actions" style="justify-content:center"><button class="btn btn-primary" id="qz-share">Share my score</button><button class="btn btn-ghost" id="qz-again">Retake quiz</button></div></div>';
        $("#qz-again").onclick=function(){qi=0;sc=0;show()}; $("#qz-share").onclick=function(){var tx="I scored "+sc+"/"+Q.length+" on the ShameOnYou.com Scam IQ quiz. Can you beat me?";if(navigator.share)navigator.share({text:tx,url:location.href}).catch(function(){});else{navigator.clipboard&&navigator.clipboard.writeText(tx+" "+location.href);toast("Copied — paste it anywhere!")}}; return }
      var q=Q[qi]; qz.innerHTML='<div class="small muted">Question '+(qi+1)+' of '+Q.length+'</div><div class="progress" style="margin:8px 0 18px"><i style="width:'+(qi/Q.length*100)+'%"></i></div><div class="quiz-q">'+esc(q[0])+'</div><div class="quiz-opts">'+q[1].map(function(o,i){return'<button data-i="'+i+'">'+esc(o)+'</button>'}).join("")+'</div>';
      $$(".quiz-opts button",qz).forEach(function(b){b.onclick=function(){var i=+b.dataset.i;$$(".quiz-opts button",qz).forEach(function(x){x.disabled=true});$$(".quiz-opts button",qz)[q[2]].classList.add("right");if(i===q[2])sc++;else b.classList.add("wrong");setTimeout(function(){qi++;show()},1100)}}) }
    show(); }

  /* Contest countdown */
  var cd=$("#countdown");
  if(cd){ var end=new Date(C.contestEnds||"2026-12-31T23:59:59").getTime();
    function tick(){var d=Math.max(0,end-Date.now()), p=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];$$("b",cd).forEach(function(b,i){b.textContent=String(p[i]).padStart(2,"0")})}
    tick(); setInterval(tick,1000); }

  /* Newsletter quick forms reuse data-form. Sticky-report share handled above. */

  /* Cookie consent (required for AdSense in many regions) */
  var ck=$(".cookie"), consent=store.get("soy-consent",null);
  function loadAds(){
    if(!C.adsenseClient){return}
    var s=document.createElement("script");s.async=true;s.crossOrigin="anonymous";s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+C.adsenseClient;document.head.appendChild(s);
    $$(".ad-box").forEach(function(b){var slot=(C.adSlots||{})[b.dataset.slot]||"";var ins=document.createElement("ins");ins.className="adsbygoogle";ins.style.display="block";ins.setAttribute("data-ad-client",C.adsenseClient);if(slot)ins.setAttribute("data-ad-slot",slot);ins.setAttribute("data-ad-format","auto");ins.setAttribute("data-full-width-responsive","true");b.replaceWith(ins);try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});
  }
  function loadGA(){ if(!C.ga4) return; var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+C.ga4;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",C.ga4) }
  if(consent===null && ck){ ck.classList.add("show") } else if(consent) { loadAds(); loadGA() } else { loadAds() }
  $$("[data-consent]").forEach(function(b){b.addEventListener("click",function(){var ok=b.dataset.consent==="yes";store.set("soy-consent",ok);ck&&ck.classList.remove("show");loadAds();if(ok)loadGA()})});
})();
