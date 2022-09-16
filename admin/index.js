$(document).ready(() => {
    console.warn("/!\\ Do not try to use admin system without permission, we save each request log.");
    handleClicks();
    let adminpanel = new AdminPanel();
    // adminpanel.showAdmin();
    // Test
    $('#username-field').val("admin");
    $('#password-field').val("admin");
    // // // // 
    $('#login-button').click(() => {
        let username = $('#username-field').val();
        let password = $('#password-field').val();
        adminpanel.login(username, password);
        $('#username-field').val("");
        $('#password-field').val("");
    })
});

function adminOverlayOpen() {
    $('body').css('overflow', 'hidden');
    $('#admin-login-overlay').css('visibility', 'visible');
}
function adminOverlayClose() {
    $('body').css('overflow', 'auto');
    $('#admin-login-overlay').css('visibility', 'hidden');
    $('#admin-login-error').css('visibility', 'hidden');
}

function handleClicks() 
{
    $('#admin-panel-link').click(() => {
        adminOverlayOpen()
    });

    $('#close-admin-overlay').click(() => {
        adminOverlayClose();
    })

    $('#admin-login-overlay').click(function(e) {
        if(e.target.classList.contains('overlay-admin-login-black')) {
            adminOverlayClose()
        }
    })
}


class AdminPanel {
    constructor()
    {
        this.token = null;
    }

    showAdmin()
    {
        alert("Session active");
        adminOverlayClose();
        $('#admin-tool-button').show();
        
    }

    login(username, password) {
        if (this.token != null) 
        {
            return false;
        }
        $('#login-button').html(`<div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>`)

        setTimeout(() => {
            $.ajax({
                url: "http://localhost:5500/auth",
                dataType: "json",
                type: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                data: `username=${username}&password=${password}`,
                success: data => {
                    this.token = data.token;
                    $('#login-button').text("Connexion")
                    this.showAdmin();
                },
                error: error => {
                    console.error(error);
                    $('#login-button').text("Connexion")
                    $('#admin-login-error').text(error.responseJSON.message)
                    $('#admin-login-error').css('visibility', 'visible');
                }
            })
        }, 500)
    }
}