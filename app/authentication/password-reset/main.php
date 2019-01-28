<?php
require_once("/app/universal.header.php");


$GLOBALS["color"] = "orange";
$GLOBALS["content"]["shownav"] = false;
$GLOBALS["content"]["title"] = "Reset Password - infringement.report";

require(template_path()."/page-header.php");
?>
<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>
<?php

require(template_path()."/page-footer.php");

?>
 
<script src="<?php echo template_path(true); ?>/app/authentication/password-reset/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/authentication/password-reset/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>
