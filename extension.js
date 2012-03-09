(function() {

    var PERMS_URL_PARAMS = ["perms","scope"],
        PERMS_FORM_PARAM = "perms",
        FORM_ID = "uiserver_form";

    function split_url_parts() {
        var query_parts = window.location.search.substring(1).split("&");
        var dict = {};
        for(var part_i in query_parts) {
            var part = query_parts[part_i];
            var key = decodeURIComponent(part.split("=")[0]);
            var value = decodeURIComponent(part.split("=")[1]);
            dict[key] = value;
        }
        return dict;
    };
    function get_active_permissions() {
        var parts = split_url_parts();
		var ret = {};
		for(var i in PERMS_URL_PARAMS)
		{
			var param = PERMS_URL_PARAMS[i];
			if(param in parts && parts[param] !== "")
			{
				var perms = parts[param].split(",");
				for(var j in perms)
					ret[perms[j]] = true;
			}
				
		}
		console.debug("Facebook Parameters: ",ret);
        return ret;
    };
    function set_perms_in_form(choosen) {
        /*
        * Modify the form live instead of reloading the page.
        * Could be used in the future.
        */
        var perms = choosen.join(",");
        document.getElementById(FORM_ID)[PERMS_FORM_PARAM].value = perms;
    };

    function reload_page(choosen) {
        var url = window.location.origin + window.location.pathname;
        var parts = split_url_parts();
		for(var i in PERMS_URL_PARAMS)
		{
			var param = PERMS_URL_PARAMS[i];
			parts[param] = choosen.join(",");
		}
		console.log(parts);
        var new_params = [];
        var enc = encodeURIComponent;
        for(key in parts) {
            new_params.push((enc(key) + "=" + enc(parts[key])));
        }
		console.log(url + "?" + new_params.join("&"));
        window.location.replace(url + "?" + new_params.join("&"));
    };

    function generate_header() {
	
        /*
        * FIXME: some kind of proper templating or something here.
        * Maybe find a lightweight js lib for DOM manipulation.
        * Or just use jQuery.
        */
		
		var permissions = get_active_permissions();
		
		if(Object.keys(permissions).length == 0)
			return;
        
        var holder = document.createElement('div');
        holder.role = "toolbar";
        holder.className = "fPrivacyHeader";
        
        
        holder.innerHTML += '<a target="_new" href="https://www.facebook.com/settings?tab=applications">Application Settings</a>';
        
        for(var perm in permissions) {
            holder.innerHTML += '<div><input type="checkbox" id="'+perm+'" value="'+perm+'" checked=checked name="newperms" /><label for="'+perm+'">'+perm+'</label></div>';
        }

        var btn = document.createElement("button");
        btn.appendChild(document.createTextNode("Update"));
        btn.onclick = function() {
            // "Update" is clicked: figure out what's checked and reload the window.
            var elements = document.getElementsByName("newperms");
            var permissions = Array.prototype.slice.call(elements);
            permissions = permissions.filter(function(me){ return me.checked });
            permissions = permissions.map(function(me){ return me.value;});
            reload_page(permissions);
        }
        
		var div = document.createElement("div");
		div.appendChild(btn);
        holder.appendChild(div);
        
        // put it in the pizza!
        document.body.insertBefore(holder, document.body.firstChild);
        
    }

    generate_header();

})();
