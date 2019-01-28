<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/edit/new';
$GLOBALS["content"]["title"] = "New List | Infringement.Report";
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
<script src="<?php echo template_path(true); ?>/app/list/new/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/list/new/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>