$(document).ready(function(){

    var PERMS_URL_PARAM = "perms",
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
        var parts = split_url_parts()
        var perms = parts[PERMS_URL_PARAM]
        if(perms) return perms.split(",");
        else return [];
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
        parts[PERMS_URL_PARAM] = choosen.join(",");
        var new_params = [];
        var enc = encodeURIComponent;
        for(key in parts) {
            new_params.push((enc(key) + "=" + enc(parts[key])));
        }
        window.location.replace(url + "?" + new_params.join("&"));
    }

    $("body").prepend('<div class="fPrivacyHeader"></div>');

    var permissions = get_active_permissions();

    for(var p in permissions) {
        var perm = permissions[p];
        $(".fPrivacyHeader").append('<input type="checkbox" id="'+perm+'" value="'+perm+'" checked=checked name="newperms" /><label for="'+perm+'">'+perm+'</label>');
    }
    
    $(".fPrivacyHeader").append('<a target="_new" href="https://www.facebook.com/settings?tab=applications">Application Settings</a>');
    $(".platform_dialog_buttons").prepend('<button class="fPrivacy uiButton uiButtonLarge">Update</button>');

    $('button.fPrivacy').click(function(e) {
        // "Update" is clicked: figure out what's checked and reload the window.
        var elements = document.getElementsByName("newperms");
        var permissions = Array.prototype.slice.call(elements);
        permissions = permissions.filter(function(me){ return me.checked });
        permissions = permissions.map(function(me){ return me.value;});
        reload_page(permissions);

        e.preventDefault();
    });

});
