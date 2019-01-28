<?php
require_once("/app/universal.header.php");


$GLOBALS["color"] = "orange";
$GLOBALS["content"]["shownav"] = false;
$GLOBALS["content"]["title"] = "Register - infringement.report";
$GLOBALS["content"]["heading"] = "Create New Account";

require(template_path()."/page-header.php");
?>

<link href="/app/list/edit/fine-uploader-new.css" rel="stylesheet">
<link href="/app/list/edit/fine-uploader-gallery.css" rel="stylesheet">

<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>

<?php
require(template_path()."/page-footer.php");
?>	
<script src="/app/list/edit/jquery.fine-uploader.js"></script>
<script src="/app/api.functions.js"></script>
<script src="/app/authentication/register/functions.js"></script>
<script src="<?php echo template_path(true); ?>/app/authentication/register/stage1.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/app/authentication/register/stage2.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="<?php echo template_path(true); ?>/app/authentication/register/stage3.template.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>