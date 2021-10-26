let map: google.maps.Map;
let shape: google.maps.Polygon;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 10,
    center: { lat: 40.44141378436048, lng: 49.96445482310628 },
    mapTypeId: "terrain",
  });

  const bakuRect: google.maps.LatLngLiteral[] = [
    { lat: 40.57288963123094, lng: 49.6772641103385 },
    { lat: 40.58123409658384, lng: 50.23070038963537 },
    { lat: 40.317883714650165, lng:50.232073680651 },
    { lat: 40.27493944820222, lng: 49.682757274401}
  ];

  shape = new google.maps.Polygon({
    paths: bakuRect,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    editable: true,
  });

  shape.setMap(map);
  map.addListener("click", addNode);
}


function dis(p1, p2){
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
}

function addNode(event: any){
  const x = event.latLng;
  let ind = 0, m = 1000000000;
  let p = shape.getPath();
  console.log(x.lat() + " " + x.lng());
  
  for ( let i = 0; i < p.getLength(); i++ ){
    console.log(p.getAt(i).lat() + " " + p.getAt(i).lng());
    
    let d: number;
    if ( i == p.getLength()-1 ){
      d = dis(x, p.getAt(i))+dis(x, p.getAt(0));
    }
    else
      d = dis(x, p.getAt(i))+dis(x, p.getAt(i+1));
    if ( d < m ){
      m = d;
      ind = i;
    }
    console.log(d);
    
  }
  p.insertAt(ind+1, x);
}

export {initMap};
