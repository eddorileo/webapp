<?php
require_once("/app/universal.header.php");


$GLOBALS["content"]["canonical"] = '/partner';
$GLOBALS["content"]["title"] = "New User - Partners";

require_once(template_path()."/page-header.php");

?>

<div class="main">
    <div id="messagebar" role="alert"></div>
    
    <ul class="subhead">
        <li><a href="/partner/list?active=activeUsers">Users</a></li>
        <li>Packages</li>
        <li>App Settings</li>
    </ul>
    
</div>
<?php
require_once(template_path()."/page-footer.php");

?>


