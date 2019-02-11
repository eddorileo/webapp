<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/case';
$GLOBALS["content"]["title"] = "Cases";

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

<script src="<?php echo template_path(true); ?>/app/case/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/case/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>
