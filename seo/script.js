  function openImage(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

function closeImage() {
  document.getElementById("lightbox").style.display = "none";
}


  function toggleFaq(el) {
    const wasOpen = el.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) el.classList.add('open');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('section, .spot-section, .why-box, .detail-card, .choose-card, .istat, .tip-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  //--WEATHER UPDATE
  
  (function(){
  var LAT=10.2381, LON=77.4892, TZ="Asia/Kolkata";

  function fmtTime(iso){
    return new Date(iso).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true,timeZone:TZ});
  }

  function mistLevel(humidity, visibilityM, code){
    if(code===45||code===48||visibilityM<1000) return "Dense Fog";
    if(humidity>=90||visibilityM<3000) return "Misty";
    if(humidity>=75) return "Light Haze";
    return "Clear";
  }

  function photographyConditions(cloud, rainProb, visibilityM){
    if(rainProb>60||visibilityM<1000) return "Poor";
    if(cloud<30&&visibilityM>8000) return "Excellent";
    if(cloud<70) return "Good";
    return "Fair";
  }

  function sunsetVisibility(cloud, visibilityM){
    if(visibilityM<2000) return "Obstructed";
    if(cloud<30) return "Excellent";
    if(cloud<60) return "Good";
    return "Limited";
  }

  function trekkingConditions(rainProb, windKmh, temp){
    if(rainProb>60) return "Not Recommended";
    if(windKmh>30) return "Caution (Windy)";
    if(rainProb>30) return "Fair";
    return "Good";
  }

  function clothingRecommendation(temp){
    if(temp<12) return "Heavy Jacket Advised";
    if(temp<18) return "Light Jacket Advised";
    if(temp<24) return "Light Layers Recommended";
    return "Light Clothing Suitable";
  }

  function render(d){
    var cur=d.current;
    var temp=Math.round(cur.temperature_2m);
    var humidity=cur.relative_humidity_2m;
    var cloud=cur.cloud_cover;
    var windKmh=cur.wind_speed_10m;
    var visibilityM=(d.hourly.visibility&&d.hourly.visibility[0]!=null)?d.hourly.visibility[0]:10000;
    var rainProb=Math.max.apply(null,d.hourly.precipitation_probability.slice(0,3));

    document.getElementById('kdk-temp').textContent=temp+"°C";
    document.getElementById('kdk-mist').textContent=mistLevel(humidity,visibilityM,cur.weather_code);
    document.getElementById('kdk-humidity').textContent=humidity+"%";
    document.getElementById('kdk-rain').textContent=rainProb+"%";
    document.getElementById('kdk-sunset').textContent=fmtTime(d.daily.sunset[0]);
    document.getElementById('kdk-sunrise').textContent=fmtTime(d.daily.sunrise[0]);
    document.getElementById('kdk-photo').textContent=photographyConditions(cloud,rainProb,visibilityM);
    document.getElementById('kdk-sunsetvis').textContent=sunsetVisibility(cloud,visibilityM);
    document.getElementById('kdk-trek').textContent=trekkingConditions(rainProb,windKmh,temp);
    document.getElementById('kdk-clothing').textContent=clothingRecommendation(temp);

    var now=new Date();
    document.getElementById('kdk-mins-ago').textContent="0";
    document.getElementById('kdk-updated-time').textContent=now.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true,timeZone:TZ});
    document.getElementById('kdk-updated-time').setAttribute('datetime',now.toISOString());
    window.kdkLastUpdate=now;
  }

  function tickMinutesAgo(){
    if(!window.kdkLastUpdate) return;
    var mins=Math.floor((Date.now()-window.kdkLastUpdate.getTime())/60000);
    var el=document.getElementById('kdk-mins-ago');
    if(el) el.textContent=mins;
  }

  function load(){
    var url="https://api.open-meteo.com/v1/forecast?latitude="+LAT+"&longitude="+LON+
      "&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,weather_code"+
      "&hourly=precipitation_probability,visibility"+
      "&daily=sunrise,sunset"+
      "&timezone="+encodeURIComponent(TZ)+"&forecast_days=1";

    return fetch(url).then(function(r){return r.json();}).then(render).catch(function(e){
      console.error("Kodaikanal weather widget error:",e);
    });
  }

  // Refresh button with spin animation + debounce while loading
  var refreshBtn=document.getElementById('kdk-refresh');
  var isLoading=false;
  refreshBtn.addEventListener('click', function(){
    if(isLoading) return;
    isLoading=true;
    refreshBtn.classList.add('kdk-spin');
    refreshBtn.disabled=true;
    load().finally(function(){
      isLoading=false;
      refreshBtn.classList.remove('kdk-spin');
      refreshBtn.disabled=false;
    });
  });

  load();
  setInterval(load, 5*60*1000);      // auto-refresh every 5 minutes
  setInterval(tickMinutesAgo, 60*1000);
})();