</div>
    
    

<footer id="page-footer">
  <div class="main">
    <div class="table">
      <div class="cell">
        <a href="#"><img src="<?php echo template_path(true); ?>/images/infringementreport.png" alt="Infringement.Report" class="img-responsive" /></a>
      </div> <!-- cell -->

      <div class="cell">
        &copy; 2017 Infringement.Report. Data is provided as-is from public sources. We can not guarantee its accuracy.
      </div> <!-- cell -->      
    </div> <!-- table -->
  </div> <!-- main -->
</footer>




    
    

    


<!-- JAVASCRIPT -->

<script src="/js/polyfill.js?stamp=<?php echo $cache_version; ?>"></script>
<script src="/js/jquery-1.10.1.min.js?stamp=<?php echo $cache_version; ?>"></script>
<script src="/js/bootstrap.min.js?stamp=<?php echo $cache_version; ?>"></script>
<script src="/js/jquery-ui.min.js?stamp=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/js/navigation-menu.js?stamp=<?php echo $cache_version; ?>"></script>
<script src="/app/api.functions.js?stamp=<?php echo $cache_version; ?>"></script>
<script src="/app/account.functions.js?stamp=<?php echo $cache_version; ?>"></script>
<!-- END JAVASCRIPT -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-86895224-1', 'auto');

  ga('send', 'pageview');

if(!((localStorage.hasOwnProperty("is_partner") && Boolean(localStorage.is_partner) == true) || localStorage.hasOwnProperty("partner_initial_apikey")) ){
    window.intercomSettings = {
        app_id: 'rk27078b'
      };
    if(localStorage.email){
      window.intercomSettings.email = localStorage.email 
    }
    if(localStorage.user_id){
      window.intercomSettings.user_id = localStorage.user_id 
    }
    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/rk27078b';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
}
</script>
</body>
    
</html>
