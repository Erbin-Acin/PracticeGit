var Deal = {
    getAllDeals: function (){
        return $.ajax({
            url: 'dealsController/getAllDeals',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function (data) {
                return data;
            },
            error: function (error) {
                return error;
            }
        });
    }
};