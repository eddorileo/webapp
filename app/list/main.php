<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/list';
$GLOBALS["content"]["title"] = "Image Search Lists";

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
<script src="/app/date.functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/list/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/app/list/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    var urlParams = new URLSearchParams(window.location.search);
    renderListPage({
        start: (urlParams.has('start') ? urlParams.get('start') : 0),
        rows: (urlParams.has('rows') ? urlParams.get('rows') : 100)
    })
</script>

