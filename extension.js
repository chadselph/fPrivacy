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
        sessionStorage.setItem(id, permissions);
      }
    }
    
    function restore_all_perms() {
      var id = url_params.app_id;
      permissions = sessionStorage.getItem(id).split(",");
      reload_page(permissions);
    }
    
     function restore_perm() {
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
            deleted_perm,
            saved_perms,
            body = document.body,
            frag = document.createDocumentFragment();
            
        permissions.forEach(function (perm) {
          html += '<input type=checkbox value='+perm+' checked />'+perm;
        });
        
        settings_link = '<div><a target="_new" href="https://www.facebook.com/settings?tab=applications">Application Settings</a></div>';
        
        function appendLink(elem) {
          elem.setAttribute("href", "javascript:");
          frag.appendChild(document.createElement("br"))
          frag.appendChild(elem);
        }

        deleted_perm = sessionStorage.getItem("deleted_facebook_perm");
        if (deleted_perm) {
          var del_a = document.createElement("a");
          
          del_a.addEventListener("click", restore_perm);
          del_a.textContent = "Restore Last Change";
          appendLink(del_a);
        }
        
        saved_perms = sessionStorage.getItem(url_params.app_id);
        if (saved_perms) {
          var saved_a = document.createElement("a");
          
          saved_a.addEventListener("click", restore_all_perms);
          saved_a.innerHTML = "<b>Restore All Changes </b>";
          appendLink(saved_a);
        }
                
        // put it in the pizza!
        body.insertAdjacentHTML("afterBegin", settings_link);
        body.insertAdjacentHTML("afterBegin", html);
        body.getElementsByTagName("div")[0].appendChild(frag);
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
