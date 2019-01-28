<?php
require_once("/app/universal.header.php");

$GLOBALS["color"] = "orange";
$GLOBALS["content"]["shownav"] = false;
$GLOBALS["content"]["title"] = "Reset Your Password - Infringement.Report";
$GLOBALS["content"]["heading"] = "Create New Account";

require(template_path()."/page-header.php");

?>
<div class="main">
    <div id="messagebar" role="alert"></div>
    <span id="page_container"><center><img src="/images/loading.gif"></center></span>
    
</div>
<?php

require(template_path()."/page-footer.php");

?>
<script src="<?php echo template_path(true); ?>/app/authentication/forgot-password/main.template.js?cachebuster=<?php echo $cache_version; ?>"></script>
<script src="/app/authentication/forgot-password/functions.js?cachebuster=<?php echo $cache_version; ?>"></script>

<script>
    initPage()
</script>
