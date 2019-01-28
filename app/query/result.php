<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/list/list_id/query';
$GLOBALS["content"]["title"] = "Infringement Results";

require_once(template_path()."/page-header.php");

?>
<link rel="stylesheet" type="text/css" href="/app/query/styles.css" />
<link rel="stylesheet" type="text/css" href="/app/query/filters/styles.css" />
<link rel="stylesheet" type="text/css" href="/app/query/filters/daterangepicker.css" />
<link rel="stylesheet" type="text/css" href="/app/query/filters/multiselect.css" />
<style>
    .result-description {position: relative;overflow: auto; }
    .result-content {

    }
    .tag-overlay {   
        position: absolute;
        width:100%;
        height:100%;
        top: 0;
        right: 0;
        display:none;
        background-color:#ffffff;
        z-index: 9000 
    }
    

    .result-description:hover .tag-overlay, .result-content:hover .tag-overlay { display:block }

</style>
<script>
    var list_id= <?php echo $_GET["list_id"]; ?>;
</script>
<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container">
        <center><img src="/images/loading.gif">
    </span>
</div>
<?php
require_once(template_path()."/page-footer.php");

?>



<script src="/app/lazyload.functions.js?cachebuster=<?php echo $cache_version; ?>" ></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="/app/date.functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/chart/chart.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/export/export.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/ignore/ignore.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/result/additional_rows.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/pagination/pagination.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/select/select.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/tags/appendStyles.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/tags/resolveTags.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/tags/selectTag.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/tags/setTag.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/constants.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/input.metric.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/input.operator.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/input.value.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/multiselect.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/filters/transform_data.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/query/state.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/app/query/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script>

initPage()
</script>

