$(document).ready(() => {
    Deal.getAllDeals()
        .done((data) => {
            data.forEach((deal, dealIndex) => {
                $("#dealsDiv").append(`
                    <div class="col-sm-8 col-md-4 col-lg-3 vacation-card-parent position-relative">
                        <div class="card vacation ${deal.status} border border-2">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center">
                                    <h3 class="card-title text-center">${deal.statusTitle}<br><i class="fas ${deal.statusIcon} card-icon"></i></h3>
                                    <p class="card-text text-center">${deal.title}&nbsp;<i class="fas ${deal.icon}"></i></p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-center align-items-center vacation p-3" data-price="${deal.price}">
                                <button type="button" class="btn btn-outline-primary">Show Price!</button>
                                <div class="flex-item align-self-center">
                                </div>
                            </div>
                            <div class="d-inline-block bg-primary">
                                <div class="badge bg-primary more-info" data-offer="${dealIndex}">
                                    <p class="p-0 m-0 flex-fill">Interested? See more <i class="fas fa-arrow-down"></i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                $("#dealsDescriptionDiv").append(`
                    <div class="col-sm-12 offer-info offer-info-${dealIndex}">
                        <h2>About ${deal.city}</h2>
                        <p class="text-justify">${deal.description}</p>
                        <a class="extended-info" href="#" data-city='${deal.city}'>More...</a>
                        <p class="extended-info-text" style="display: none;"></p>
                    </div>
                `);
            })
        })
        .fail((error) => {
            console.log(error)
            console.log(error.responseJSON.message)
        })
        .always(() => {
            console.log("AJAX end.");
        });

    // Sale price consult
    $(document).on('click', '.vacation button', function () {
        var vacation = $(this).closest('.vacation');
        var amount = vacation.data('price');
        var price = $('<p class="badge bg-success p-3 m-0"> Only $' + amount + '</p>');
        vacation.find('div').append(price);
        vacation.parent().addClass('border-bottom-0');
        vacation.parent().parent().find('.badge').slideDown();
        $(this).remove();
    });


    $(document).on('mouseenter', 'div.card.vacation', function () {
        if ($(window).width() > 767) {
            $(this).parent().animate({ 'top': '-5px' });
            // $(this).css({ 'box-shadow': '-2px 3px 4px 2px grey' });
            $(this).addClass("shadow", 1000);
        } else {
            // $(this).css({ 'box-shadow': '-2px 3px 4px 2px grey' });
            $(this).addClass("shadow", 1000);
        }

    });

    $(document).on('mouseleave', 'div.card.vacation', function () {
        if ($(window).width() > 767) {
            $(this).parent().animate({ 'top': '0px' });
            // $(this).css({ 'box-shadow': '0px 0px 0px 0px' });
            $(this).removeClass("shadow", 500);
        } else {
            // $(this).css({ 'box-shadow': '0px 0px 0px 0px' });
            $(this).removeClass("shadow", 500);
        }
    });

    var classes = "border-primary";
    $(document).on('click', '#filters .onsale-filter', function () {
        console.log("hola");
        $('.vacation').filter('.expiring').removeClass(classes)
        $('.vacation').filter('.sale').toggleClass(classes)
    });

    $(document).on('click', '#filters .expiring-filter', function () {
        $('.vacation').filter('.sale').removeClass(classes)
        $('.vacation').filter('.expiring').toggleClass(classes)
    });

    $(document).on('click', '.more-info', function () {
        var offerNumber = $(this).data('offer');
        $('.extended-info').text("More...")
        $('.extended-info-text').hide();
        $('.offer-info').hide();
        $('.offers').fadeIn();
        $('.offer-info-' + offerNumber).fadeIn();
    });

    $(document).on('click', '.extended-info', function (e) {
        var moreLink = $(this);
        e.preventDefault();
        if (moreLink.parent().find('p.extended-info-text').is(":visible")) {
            moreLink.text("More...");
            moreLink.parent().find('p.extended-info-text').fadeOut();
        } else {
            moreLink.text("Less...");
            var city = moreLink.data('city');
            var pTag = moreLink.parent().find('p.extended-info-text');
            // Promifyzing the ajax way
            // currentWeather(city)
            //     .then( (data) => {
            //         var main = data.main;
            //         var htmlText = '<b>Actual Temperature: </b>' + main.temp + ' but feels like ' + main.feels_like + '<br>' +
            //         '<b>Max Temperature: </b>' + main.temp_max + '.<br>' +
            //         '<b>Min Temperature: </b>' + main.temp_min + '.<br>' +
            //         '<b>Humidity: </b>' + main.humidity + '.<br>' +
            //         '<b>Preassure: </b>' + main.pressure + '.<br>';
            //         pTag.html(htmlText);
            //         pTag.fadeIn();
            //     })
            //     .catch( (error) => {
            //         moreLink.text("More...");
            //         alert('Oops! Looks like houston is in troubles.\nSee console for more.');
            //         console.error(error)
            //         console.error(error.responseJSON.message)
            //     });

            // Creating a promise and returning by function way 
            // var currentWeatherPromise = Weather.current(city);
            $(".alert").removeClass("alert-success alert-danger");
            Weather.current(city).done((data) => {
                console.log(data);
                var main = data.main;
                var htmlText = '<br><b>Weather at ' + city + '</b><br>' +
                    '<b>Actual Temperature (ºC): </b>' + main.temp + ' but feels like ' + main.feels_like + '<br>' +
                    '<b>Max Temperature (ºC): </b>' + main.temp_max + '.<br>' +
                    '<b>Min Temperature (ºC): </b>' + main.temp_min + '.<br>' +
                    '<b>Humidity: </b>' + main.humidity + '%.<br>' +
                    '<b>Preassure: </b>' + main.pressure + '.<br>';
                pTag.html(htmlText);
                pTag.fadeIn();
                $(".alert").addClass("alert-success");
                $(".alert").children("span").text("Weather updated!");
                $(".alert").addClass("show");
                $(".alert").fadeTo(2000, 500).slideUp(1000, function () {
                    $(".alert").slideUp(500);
                });
            })
                .fail((error) => {
                    moreLink.text("More...");
                    $(".alert").addClass("alert-danger");
                    $(".alert").children("span").text("Oops! Looks like houston is in troubles.\nSee console for more.");
                    $(".alert").addClass("show");
                    $(".alert").fadeTo(2000, 500).slideUp(1000, function () {
                        $(".alert").slideUp(500);
                    });
                    console.error(error)
                    console.error(error.responseJSON.message)
                })
                .always(() => {
                    console.log("AJAX end.");
                });
        }
    });

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
            $(".reach-top-button").show();
        } else {
            $(".reach-top-button").hide();
        }
    }

    $(".reach-top-button").on('click', function topFunction() {
        $("html, body").animate({ scrollTop: 0 });
    });

    $("input[required]").after("&nbsp;*");
    $("form").each(function () {
        if ($(this).children("input[required]").length > 0) {
            $(this).after("<small>*required</small>")
        }
    });

});