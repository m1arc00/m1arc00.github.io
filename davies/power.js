var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function() {

var hull3d = d3.geom.nhull(3);

d3.geom.power = function(points, weight) {
  var triangles = regularTriangulation(points, weight),
      edgeByStart = [];

  triangles.forEach(function(t) {
    edgeByStart[t.a.p.i] = t.a;
    edgeByStart[t.b.p.i] = t.b;
  });

  return points.map(function(_, i) {
    var cell = [],
        neighbors = cell.neighbors = [],
        e00 = edgeByStart[i],
        e0 = e00,
        e = e0;
    if (!e) return null;
    do {
      var centre = e.triangle.centre, neighbor = e.neighbor;
      if (!centre.negative) cell.push(centre);
      if (!neighbor.triangle.centre.negative) neighbors.push(neighbor.p.i);
      if (e === e00 && e0 !== e00) break;
      e = (e0 = e).next.next.neighbor;
    } while (1);
    return cell;
  });
};

function regularTriangulation(points, weight) {
  weight = weight || function() { return 0; };

  return hull3d(points.map(function(p, i) {
    var x = p[0], y = p[1];
    return [x, y, x * x + y * y - weight(p, i)];
  })).filter(function(t) {
    t.coordinates = [points[t.a.p.i], points[t.b.p.i], points[t.c.p.i]];
    var p1 = t.a.p,
        p2 = t.b.p,
        p3 = t.c.p,
        a = p1[1] * (p2[2]-p3[2]) + p2[1] * (p3[2]-p1[2]) + p3[1] * (p1[2]-p2[2]),
        b = p1[2] * (p2[0]-p3[0]) + p2[2] * (p3[0]-p1[0]) + p3[2] * (p1[0]-p2[0]),
        c = p1[0] * (p2[1]-p3[1]) + p2[0] * (p3[1]-p1[1]) + p3[0] * (p1[1]-p2[1]);
    t.centre = [-.5 * a / c, -.5 * b / c];
    return !(t.centre.negative = t.n[2] >= 0);
  });
};

})();


}
/*
     FILE ARCHIVED ON 13:22:25 Jul 28, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:53:15 Apr 19, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1289.438
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.081
  RedisCDXSource: 101.171
  esindex: 0.006
  LoadShardBlock: 1173.933 (3)
  PetaboxLoader3.datanode: 89.956 (4)
  CDXLines.iter: 12.587 (3)
  PetaboxLoader3.resolve: 1183.118 (3)
  load_resource: 171.169
*/