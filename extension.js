(function() {

    var PERMS_URL_PARAM = "perms",
        PERMS_FORM_PARAM = "perms",
        FORM_ID = "uiserver_form",
        document = window.document,
        permissions = {},
        url_params = {};

    function split_url_parts() {
        var query_parts = window.location.search.substring(1).split("&");
        url_params = {};
        for(var part_i in query_parts) {
            var part = query_parts[part_i];
            var key = decodeURIComponent(part.split("=")[0]);
            var value = decodeURIComponent(part.split("=")[1]);
            url_params[key] = value;
        }
        return url_params;
    }

    function get_active_permissions() {
        var parts = split_url_parts()
        var perms = parts[PERMS_URL_PARAM]
        if(perms) return perms.split(",");
        else return [];
    }
    
    function reload_page(choosen) {
        var url = window.location.origin + window.location.pathname;
        var parts = split_url_parts();
        parts[PERMS_URL_PARAM] = choosen.join(",");
        var new_params = [];
        var enc = encodeURIComponent;
        for(key in parts) {
            new_params.push((enc(key) + "=" + enc(parts[key])));
        }
        window.location.replace(url + "?" + new_params.join("&"));
    }
    
    function save_perms(permissions) {
      var id = url_params.app_id,
          prev = sessionStorage.getItem(id);
      if (prev === null) {
        sessionStorage.setItem(id, permissions).join(",");
      }
    }
    
    function restore_all_perms() {
      var id = url_params.app_id;
      permissions = sessionStorage.getItem(id).split(",");
      reload_page(permissions);
    }
    
    function restore_last_perm() {
      var deleted_perm = sessionStorage.getItem("deleted_facebook_perm");
      sessionStorage.removeItem("deleted_facebook_perm")
      
      permissions.push(deleted_perm);
      reload_page(permissions);      
    }

    function generate_header(permissions) {
        /*
        * FIXME: some kind of proper templating or something here.
        * Maybe find a lightweight js lib for DOM manipulation.
        * Or just use jQuery.
        */
        var html = "",
            restore_last,
            restore_all,
            buttons = document.createElement('div'),
            holder = document.createElement('div');

        holder.className = "social_auth_disconnect";
        buttons.className = "social_auth_disconnect_buttons"
        
        permissions.forEach(function (perm) {
          holder.insertAdjacentHTML('beforeEnd', '<label for='+perm+'><input type=checkbox value='+perm+' id='+perm+' checked />'+perm+'</label>');
        });
        
        function buttonFactory(content, callback) {
          var button = document.createElement("button");
          button.addEventListener("click", callback);
          button.innerHTML = content;
          return button;
        }
        
        // Add restore last removed perm link, if it exists
        restore_last = sessionStorage.getItem("deleted_facebook_perm");
        if (restore_last) {
          var restore_last_elem = buttonFactory("Restore Last Permission", restore_last_perm)
          buttons.appendChild(restore_last_elem);
        }
        
        // Add restore all original perms, if they exist
        restore_all = sessionStorage.getItem(url_params.app_id);
        if (restore_all) {
          var restore_all_elem = buttonFactory("<b>Restore All Permissions</b>", restore_all_perms)
          buttons.appendChild(restore_all_elem);
        }
        
        var clear_all_perms = buttonFactory("Clear All Permissions", function () { reload_page([]); });
        buttons.appendChild(clear_all_perms);

        buttons.insertAdjacentHTML('beforeEnd', '<a target=_new href="https://www.facebook.com/settings?tab=applications">Application Settings</a>');

        holder.appendChild(buttons);
        
        // put it in the pizza!
        document.body.insertBefore(holder, document.body.firstChild);
    }
    
    (function init_header() {
        permissions = get_active_permissions();
        generate_header(permissions);
        save_perms(permissions);
        
        function update_perms(event) {
          var input = event.target;
          if (input.type === "checkbox") {
            if (input.checked && !(permissions.indexOf(input.value) < 0)) {
              permissions.push(input.value);
            } else if (permissions.indexOf(input.value) >= 0) {
              sessionStorage.setItem("deleted_facebook_perm", input.value);
              permissions.splice(permissions.indexOf(input.value), 1);
            }
            reload_page(permissions);
          }
        }
        
        // Listen for input change events
        document.addEventListener("change", update_perms);
    }());

    console.log(permissions);

})();
