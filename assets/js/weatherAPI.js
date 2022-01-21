var weatherAPIKEY = 'e7d0b0ea841ab2f5a9e7262d8b73ff8c';

function currentWeather(city) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'http://api.openweathermap.org/data/2.5/weather?',
            data: {
                'q': city,
                'appid': this.weatherAPIKEY,
                'units': 'metric',
                'temp': 'Celsius'
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}

var Weather = {
    weatherAPIKEY: weatherAPIKEY,
    // using promise var
    // current: function (city){
    //     var promise = $.Deferred();
    //     $.ajax({
    //         type: 'GET',
    //         dataType: 'json',
    //         url:'http://api.openweathermap.org/data/2.5/weather?',
    //         data:{
    //             'q': city,
    //             'appid': this.weatherAPIKEY,
    //             'units': 'metric',
    //             'temp': 'Celsius'
    //         },
    //         success: function (data){
    //             promise.resolve(data);
    //         },
    //         error: function (error){
    //             promise.reject(error);
    //         }
    //     });
    //     return promise;
    // }

    // normal ajax refears async promise byself
    // this is best practice
    current: function (city) {
        return $.ajax({
            url: 'WeatherController/currentWeather',
            type: 'GET',
            dataType: 'json',
            data: {
                'q': city,
                'units': 'metric',
                'temp': 'Celsius'
            },
            success: function (data) {
                return data;
            },
            error: function (error) {
                return error;
            }
        });
    }
}
