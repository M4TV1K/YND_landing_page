
// we can also compress and secure code with webpack.js
// which even prevents the reverse engineering of it!
// Would be nice especially for the API key)))

function changeContent(from, to) {
    $('#' + from).fadeOut();
    setTimeout(() => {
        $('#' + to).css('display', 'block').fadeIn();
    }, 500);
}

function displayError(input, text) {
    $("#" + input).addClass("error").text(text);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
}

window.onload = () => {
    fetch("https://api.anyjsoncms.com/entries", {
        headers: {
            ApiKey: "f2b98ed8b13372194bf3c0e2ac0fb6da9e95c045"
        },
    })
        .then((response) => {
            if (response.status === 200) return response.json()
            alert("Cannot fetch data from the server, contact ROMAN ASAP");
        })
        .then((data) => {
            for (let paragraph of data) {
                $('#' + paragraph['identificator']).text(paragraph["value"]);
            }
        });

    $('#applyButton, #applyRightNowButton').click(() => {
        changeContent("contentHolder", "formHolder");
    });

    $('#shareButton').click(() => {
        window.open("https://twitter.com/intent/tweet?text=Hello%20YND");
        // I should create twitter account for this one!
    });

    $('.blue-button').hover((evt) => {
        const elem_id = evt.target.id;
        $('#' + elem_id + ' > .blue-button-text').css("color", "#1A1B1F");
        $('#' + elem_id).animate({
            "width": "+=1vw"
        }, 100);
    }, (evt) => {
        const elem_id = evt.target.id;
        $('#' + elem_id + ' > .blue-button-text').css("color", "#33D2D2");
        $('#' + elem_id).animate({
            "width": "-=1vw"
        }, 100);
    });

    $('#applyRightNowButton').off("mouseenter mouseleave").hover((evt) => {
        $('#' + evt.target.id + ' > .blue-button-text').css("color", "#F3F3F3");
    }, (evt) => {
        $('#' + evt.target.id + ' > .blue-button-text').css("color", "#33D2D2");
    });

    $('.cross-img, #returnButton').click(() => {
        changeContent("formHolder, #thanksHolder", "contentHolder");
    });

    $('input').focusin((evt) => {
        $('#' + evt.target.id + 'Label').addClass("highlighted-label");
    }).focusout((evt) => {
        $('#' + evt.target.id + 'Label').removeClass("highlighted-label");
    });

    $('#submitButton').click(() => {
        let error = false;
        if ($("#firstName").val() === "") {
            displayError("firstNameLabel", "Would you enter name, please!?");
            error = true
        }
        const $email = $("#email");
        if ($email.val() === "" || validateEmail($email.val())) {
            displayError("emailLabel", "Would you enter valid email, please!?");
            error = true;
        }
        if ($("#question").val().length > 100) {
            displayError("questionLabel", "Be more brief, please!");
            error = true;
        }

        if (!error) {
            // sending data probably using fetch API with POST method to the backend!
            // also I prefer the backend validation
            changeContent("formHolder", "thanksHolder");
        }
    });
};
