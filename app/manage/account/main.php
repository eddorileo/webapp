<?php
require_once("/app/universal.header.php");

require(template_path()."/page-header.php");

?>

<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container">
        <center><img src="/images/loading.gif"></center>
    </span>
</div>
<div class="main">
        
       <!-- END ACCOUNT INFO -->
</span>
    </div> <!-- END MAIN -->


<?php
require(template_path()."/page-footer.php");
?>

<script src="/app/manage/account/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/app/manage/account/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script>
    initPage()
</script>
