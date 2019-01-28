<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/notify';
$GLOBALS["content"]["title"] = "Edit Notifications";

require_once(template_path()."/page-header.php");

?>

<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>
<?php
require_once(template_path()."/page-footer.php");

?>

<script src="<?php echo template_path(true); ?>/app/notify/list/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/date.functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/notify/list/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>
