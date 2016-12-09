var API_BASE_URL = "http://localhost:3005/api";


function getDietsList() {
    var url = API_BASE_URL + '/diets';
    cl = [{
        id: "",
        title: "",
        description: ""
    }];
    clAux = {
        id: "",
        title: "",
        description: ""
    };
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json'
    }).done(function (data) {
        var repos = data.diets;
        n = 0;
        $.each(repos, function (i, v) {
            var repo = v;

            clAux.id = repo.id;
            clAux.title = repo.title;
            clAux.description = repo.description;
            cl.push(JSON.parse(JSON.stringify(clAux)));
            n++;
        });
        cl.shift();
        DisplayHtmlDietsList(cl);

    }).fail(function () {
    });
}