(function () {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -23.113790,
            lng: -46.553230
        },
        zoom: 14
    })

    var points = new Array();
    google.maps.event.addListener(map, 'click', function (event) {
        var marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        })
        points.push({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });

        var polyline = new getConvexHull(points);

        if (window.poligons) {
            window.poligons.setPath(polyline.getHullPoints(true));
        } else {

            window.poligons = new google.maps.Polygon({
                paths: polyline.getHullPoints(true),
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            })

            poligons.setMap(map);
        }

    });
})(document, window);