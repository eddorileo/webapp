<?php
require_once("/app/universal.header.php");

require(template_path()."/page-header.php");

?>

<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="top_naviation"></span>
    <span id="page_container">
        <center><img src="/images/loading.gif">
    </span>
</div>

<?php
require(template_path()."/page-footer.php");
?>
<script src="https://checkout.stripe.com/checkout.js"></script>
<script src="/app/manage/subscription/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/app/manage/subscription/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script>
    initPage()
</script>