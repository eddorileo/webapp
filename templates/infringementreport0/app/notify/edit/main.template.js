function notifyEditPageTemplate(result){
    
    const page = `
    <p class="subhead sm left">
    <strong>Lists:</strong><br>
    Which lists should we notify you about?<br> 
    <select class="form-control" name="list_sel" id="list_sel" style="width:100%">

    <option value='all' ${($.inArray("all",result.notify.list_id)  !== -1 ) ? "selected" : ""}>All lists</option>
    <option value='custom' ${($.inArray("all",result.notify.list_id)  !== -1 ) ? "" : "selected"}>Only Specific Lists or Using Report Filter...</option>
    </select> 
    <div id="list_span">
        <div class="subhead sm left" style="display:block;overflow:auto ;height: 250px;border: 2px #f2cd13 solid;">
            <label style="display: inline"><input type=checkbox class='form-control list_id' id="all_list_checkbox" data-list_id="all" ${($.inArray("all",result.notify.list_id)  !== -1 ) ? "checked" : ""} > All Lists</label><BR>
            ${result.all_lists.map(function(l,i){

                return `<label style="display: inline"><input type=checkbox class='form-control list_id' data-list_id="${l.list_id}" ${($.inArray(l.list_id,result.notify.list_id)  !== -1 ) ? "checked" : ""}> ${l.list_label}</label><BR>`
            }).join("")}
        </div>
    </div>
    <p class="subhead sm left">

    <strong>How often would you like notifications?</strong><br>

        <label class="btn "> 
            <input type="radio" name="schedule" autocomplete="off" value="1" ${(result.notify.schedule == 1) ? "checked" : ""}> Daily
        </label>
        <label class="btn "> 
            <input type="radio" name="schedule" autocomplete="off" value="7" ${(result.notify.schedule == 7) ? "checked" : ""}> Weekly
        </label>
        <label class="btn ">  
            <input type="radio" name="schedule" autocomplete="off" value="14"  ${(result.notify.schedule == 14) ? "checked" : ""}> Every 14 Days
        </label>
        <label class="btn  "> 
            <input type="radio" name="schedule" autocomplete="off" value="30"  ${(result.notify.schedule == 30) ? "checked" : ""}> Every 30 Days
        </label>

    <br><br>
    <strong id="email_url_label">Email Address:</strong><br><input placeholder="email@domain.com" type=text class='form-control' style="width:100%" name="endpoint" value="${(result.notify.endpoint.length == 0) ? "" : result.notify.endpoint}"><br><br>
    <a href="#" id="advancedNotifyLink" class="link">Change the email format or switch to API callback</a><br>
    <div id="advancedNotify" class="subhead sm left">
        <strong>Notification Type:</strong><br>
        We can do standard email notifications, or pipe them into your favourite tools via IFTTT or Zapier<br>
        <select class="form-control" name="type" style="width:100%">
            <option value='email' ${(result.notify.type == "email") ? "selected" : ""}>Email</option>
            <option value='postback' ${(result.notify.type == "postback") ? "selected" : ""}>API Postback (For Slack/JIRA/Custom notification via Zapier/IFTTT)</option>
        </select><br><br>
        
        <strong>Notification Content:</strong><br>
        <select class="form-control" name="format" style="width:100%">
            <option value='htmlsummary' ${(result.notify.format == "htmlsummary") ? "selected" : ""}>Rich HTML Summary (Perfect for email alerts) - '&lt;html&gt;&lt;h1&gt;52 New Domains:...'</option>
            <option value='textsummary' ${(result.notify.format == "textsummary") ? "selected" : ""}>Plain Text Summary (Great for simple Slack/JIRA notification) - '52 New Domains:...'</option>
            <option value='jsontextsummary' ${(result.notify.format == "jsontextsummary") ? "selected" : ""}>Plain Text Summary inside a JSON Object (Perfect for simple Slack/JIRA notification) - '{"message":"52 New Domains:..."}'</option>
            <option value='jsonsummary' ${(result.notify.format == "jsonsummary") ? "selected" : ""}>Summary Data JSON Object (For custom postback handling) - '{"new_domains":52,...}'</option>
            <option value='jsonfull' ${(result.notify.format == "jsonfull") ? "selected" : ""}>Full Data JSON Object (Great for importing data into a database) - '{"image_1":{"domains_found":[]},...}'</option>
        </select>
        <br>
    </div>
    <br>
    </p><center><a href='#' id='saveNotify' class="btn btn-normal">Save Changes</a> <a href="/notify" class="btn btn-normal">Cancel</a></center></form>
    `

    return page
}

