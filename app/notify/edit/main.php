<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/notify';
$GLOBALS["content"]["title"] = "Edit Notifications";

require_once(template_path()."/page-header.php");

?>
<script>
    var  notify_id = <?php echo (($_GET["notify_id"] == "new") ? ('"new"') : ($_GET["notify_id"])); ?>;
</script>
<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>
<?php
require_once(template_path()."/page-footer.php");

?>

<script src="<?php echo template_path(true); ?>/app/notify/edit/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script src="/app/notify/edit/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>