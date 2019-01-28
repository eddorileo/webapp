<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/ignore';
$GLOBALS["content"]["title"] = "Edit Ignored Domains";

require_once(template_path()."/page-header.php");

?>
<script>
    var  list_id = <?php echo $_GET["list_id"]; ?>;
</script>
<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>
<?php
require_once(template_path()."/page-footer.php");

?>

<script src="<?php echo template_path(true); ?>/app/ignore/edit/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/ignore/edit/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>
