import json, glob, os, math, sys

OUT = 'viewer'
os.makedirs(OUT, exist_ok=True)
sys.setrecursionlimit(200000)

# ---------- 1. simplify boundaries (Douglas-Peucker) ----------
def perp(p, a, b):
    (x, y), (x1, y1), (x2, y2) = p, a, b
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(x - x1, y - y1)
    t = max(0.0, min(1.0, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
    return math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))

def dp(pts, eps):
    # iterative Douglas-Peucker to avoid recursion limits on long rings
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        dmax, idx = 0.0, i
        for k in range(i + 1, j):
            d = perp(pts[k], pts[i], pts[j])
            if d > dmax:
                dmax, idx = d, k
        if dmax > eps:
            keep[idx] = True
            stack.append((i, idx))
            stack.append((idx, j))
    return [p for p, k in zip(pts, keep) if k]

src = json.load(open('data/geography/delegation-boundaries.geojson', encoding='utf-8'))
EPS = 0.0022          # ~220 m, ample for a country-level view
feats, before, after = [], 0, 0
for f in src['features']:
    g = f['geometry']
    polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    newp = []
    for poly in polys:
        rings = []
        for ring in poly:
            before += len(ring)
            s = dp([tuple(c) for c in ring], EPS)
            if len(s) >= 4:
                if s[0] != s[-1]:
                    s.append(s[0])
                after += len(s)
                rings.append([[round(x, 4), round(y, 4)] for x, y in s])
        if rings:
            newp.append(rings)
    if not newp:
        continue
    geom = ({'type': 'Polygon', 'coordinates': newp[0]} if len(newp) == 1
            else {'type': 'MultiPolygon', 'coordinates': newp})
    p = f['properties']
    feats.append({'type': 'Feature',
                  'properties': {'n': p['name_fr'], 'na': p.get('name_ar'),
                                 'g': p['governorate_code'], 'gn': p['governorate'],
                                 'c': p.get('code_geo')},
                  'geometry': geom})
bd = {'type': 'FeatureCollection', 'features': feats}
json.dump(bd, open(OUT + '/boundaries.json', 'w', encoding='utf-8'),
          ensure_ascii=False, separators=(',', ':'))
print('boundaries: %d features, %d -> %d vertices (%.2f MB)'
      % (len(feats), before, after, os.path.getsize(OUT + '/boundaries.json') / 1e6))

# ---------- 2. points, compact ----------
LAYERS = {
 'healthcare':       ('services/healthcare.json',                     'Healthcare', 'osm', 'health'),
 'health_official':  ('services/health-facilities-official.json',     'Health facilities (official)', 'gov', 'health'),
 'doctors':          ('services/private-specialist-doctors.json',     'Specialist doctors', 'gov', 'health'),
 'education':        ('services/education.json',                      'Education', 'osm', 'education'),
 'schools_official': ('services/schools-official.json',               'Schools (official)', 'gov', 'education'),
 'libraries':        ('services/public-libraries.json',               'Public libraries', 'gov', 'education'),
 'public_services':  ('services/public-services.json',                'Public services', 'osm', 'public'),
 'social':           ('services/social-and-training-facilities.json', 'Social & training', 'gov', 'public'),
 'finance':          ('services/finance.json',                        'Banks & ATMs', 'osm', 'public'),
 'fuel':             ('services/fuel-stations.json',                  'Fuel stations', 'osm', 'public'),
 'vehicle':          ('services/vehicle-services.json',               'Vehicle services', 'osm', 'public'),
 'other_fac':        ('services/other-facilities.json',               'Other facilities', 'osm', 'public'),
 'shops':            ('businesses/shops.json',                        'Shops', 'osm', 'business'),
 'food':             ('businesses/food-and-drink.json',               'Restaurants & cafes', 'osm', 'business'),
 'tourism':          ('businesses/tourism-and-lodging.json',          'Hotels & lodging', 'osm', 'business'),
 'offices':          ('businesses/offices-and-crafts.json',           'Offices & crafts', 'osm', 'business'),
 'olive':            ('businesses/olive-oil-mills.json',              'Olive oil mills', 'gov', 'business'),
 'transport':        ('places/transport.json',                        'Transport', 'osm', 'places'),
 'worship':          ('places/places-of-worship.json',                'Places of worship', 'osm', 'places'),
 'heritage':         ('places/heritage-sites.json',                   'Heritage sites', 'osm', 'culture'),
 'cultural_sites':   ('places/cultural-sites.json',                   'Museums & festivals', 'gov', 'culture'),
 'culture_svc':      ('services/community-and-culture.json',          'Theatres & cinemas', 'osm', 'culture'),
 'populated':        ('places/populated-places.json',                 'Cities & towns', 'osm', 'places'),
 'leisure':          ('places/leisure-and-sport.json',                'Parks & sport', 'osm', 'places'),
 'nature':           ('places/natural-features.json',                 'Natural features', 'osm', 'places'),
 'agri_infra':       ('places/agricultural-infrastructure.json',      'Agricultural infrastructure', 'gov', 'agri'),
 'water_groups':     ('services/water-and-agricultural-groups.json',  'Water associations (GDA)', 'gov', 'agri'),
 'branded':          ('places/unnamed-branded-facilities.json',       'Branded (unnamed)', 'osm', 'places'),
}

layers, meta, total = {}, {}, 0
for key, (path, label, src_kind, group) in LAYERS.items():
    recs = json.load(open('data/' + path, encoding='utf-8'))
    pts, miss = [], 0
    for r in recs:
        if 'lat' not in r:
            miss += 1
            continue
        nm = r.get('name') or r.get('name_fr') or r.get('name_ar') or r.get('label') or ''
        # index 8 is a subtype the icon layer can specialise on — religion for a
        # place of worship, cuisine for a restaurant. Empty when not applicable.
        sub = r.get('religion') or r.get('cuisine') or r.get('sport') or ''
        pts.append([round(r['lat'], 5), round(r['lon'], 5), nm,
                    r.get('type') or r.get('category') or r.get('facility_type') or '',
                    r.get('delegation') or '', r.get('governorate_code') or '',
                    r.get('phone') or r.get('mobile') or '',
                    r.get('website') or '', sub])
    layers[key] = pts
    meta[key] = {'label': label, 'src': src_kind, 'group': group,
                 'n': len(pts), 'total': len(recs), 'nocoord': miss, 'file': path}
    total += len(pts)

json.dump({'meta': meta, 'layers': layers},
          open(OUT + '/points.json', 'w', encoding='utf-8'),
          ensure_ascii=False, separators=(',', ':'))
print('points: %d mapped across %d layers (%.2f MB)'
      % (total, len(layers), os.path.getsize(OUT + '/points.json') / 1e6))
unmapped = dict((k, v['nocoord']) for k, v in meta.items() if v['nocoord'])
print('layers with unmapped records:', unmapped)

# ---------- 3. stats ----------
gov = json.load(open('data/geography/governorates.json', encoding='utf-8'))
allrecs = sum(len(json.load(open(f, encoding='utf-8'))) for f in glob.glob('data/*/*.json'))
stats = {'governorates': [{'code': g['code'], 'name': g['name_en'], 'ar': g['name_ar'],
                           'fr': g['name_fr'], 'lat': g['lat'], 'lon': g['lon'],
                           'pop': g.get('population'), 'popyear': g.get('population_year')}
                          for g in gov],
         'totals': {'records': allrecs, 'mapped': total,
                    'delegations': 266, 'imadas': 2084, 'layers': len(layers)}}
json.dump(stats, open(OUT + '/stats.json', 'w', encoding='utf-8'),
          ensure_ascii=False, separators=(',', ':'))
print('stats: %d total records, %d mapped' % (allrecs, total))
