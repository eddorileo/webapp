<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/tag';
$GLOBALS["content"]["title"] = "Account Tags";

require_once(template_path()."/page-header.php");

?>

<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container"></span>
    
    <span id="pagination_container"><center><img src="/images/loading.gif"></center></span>
</div>
<?php
require_once(template_path()."/page-footer.php");

?>


<script src="<?php echo template_path(true); ?>/app/tag/list/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/tag/list/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    getListTags()
</script>

