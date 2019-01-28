<?php
require_once("/app/universal.header.php");


$GLOBALS["color"] = "orange";
$GLOBALS["content"]["shownav"] = false;
$GLOBALS["content"]["title"] = "Login";
$GLOBALS["content"]["heading"] = "Access Your Account";
$GLOBALS["content"]["canonical"] = "/login";

require(template_path()."/page-header.php");
?>
<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>
<?php

require(template_path()."/page-footer.php");

?>
<script src="<?php echo template_path(true); ?>/app/authentication/login/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script src="/app/authentication/login/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/account.functions.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script>
    initPage()
</script>
