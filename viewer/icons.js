/* OpenTunisia — map marker icons.
 *
 * Solid-filled glyphs on a teardrop pin, the way real map markers are drawn:
 * a filled silhouette reads at 24px where a thin outline turns to mush.
 * All inline SVG — nothing to download, no icon font, no sprite sheet.
 */
(function (global) {
  "use strict";

  /* 24x24 filled paths. Designed as silhouettes, not line art. */
  var P = {
    hospital:   'M12 2 3 7v13h6v-5h6v5h6V7L12 2Zm1 5h2v2h2v2h-2v2h-2v-2h-2V9h2V7Z',
    pharmacy:   'M12 2a2 2 0 0 0-2 2v1H7a1 1 0 0 0 0 2h1l1 12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2l1-12h1a1 1 0 0 0 0-2h-3V4a2 2 0 0 0-2-2Zm-1.5 7h3v2h2v2h-2v2h-3v-2h-2v-2h2V9Z',
    doctor:     'M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-7 20a7 7 0 0 1 14 0v1H5v-1Zm11-6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z',
    school:     'M12 3 1 9l11 6 9-4.9V17h2V9L12 3ZM5 13.2V17c0 2.2 3.1 4 7 4s7-1.8 7-4v-3.8l-7 3.8-7-3.8Z',
    university: 'M12 3 1 9l11 6 11-6-11-6ZM5 13.2V17c0 2.2 3.1 4 7 4s7-1.8 7-4v-3.8l-7 3.8-7-3.8ZM22 10v6h1.5v-6H22Z',
    library:    'M4 3h7v18H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm9 0h7a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-7V3Zm2 3v2h5V6h-5Z',
    bank:       'M12 2 1 8v2h22V8L12 2ZM4 11v8H2v3h20v-3h-2v-8h-3v8h-2v-8h-2v8h-2v-8H9v8H7v-8H4Z',
    post:       'M2 5h20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.7 2L12 13l8.3-6H3.7Z',
    police:     'M12 1 3 5v7c0 5.2 3.8 9.6 9 11 5.2-1.4 9-5.8 9-11V5l-9-4Zm0 5.2 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6L6.8 10l3.6-.5L12 6.2Z',
    townhall:   'M12 2 2 8v2h20V8L12 2Zm-7 9v8H3v3h18v-3h-2v-8h-3v8h-2v-8h-2v8H9v-8H5Z',
    fuel:       'M3 3h10a2 2 0 0 1 2 2v16H1V5a2 2 0 0 1 2-2Zm1 3v4h8V6H4Zm13 3h2.5l-1.8-3.2 1.7-1L22 9.4V18a2.5 2.5 0 0 1-5 0v-4h-2V9h2Z',
    restaurant: 'M6 2v7a3 3 0 0 0 2 2.8V22h2V11.8A3 3 0 0 0 12 9V2h-1.6v6H9.3V2H7.7v6H6.6V2H6Zm11.5 0C15.6 4.3 15 6.6 15 9c0 1.7.8 2.8 2 3.1V22h2V2h-1.5Z',
    cafe:       'M4 7h13v6a5.5 5.5 0 0 1-11 0V7Zm14 1h1.5a3 3 0 0 1 0 6H18V8Zm.2 2v2h1.3a1 1 0 0 0 0-2h-1.3ZM3 20h16v2H3v-2Z',
    fastfood:   'M12 3c5 0 9 3 9.6 7H2.4C3 6 7 3 12 3ZM2 12h20v2H2v-2Zm2 4h16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z',
    shop:       'M5 2h14l2 5H3l2-5Zm-2 7h18v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9Z',
    supermarket:'M2 3h3l1 3h16l-2.4 8.5a2 2 0 0 1-2 1.4H8.2a2 2 0 0 1-1.9-1.5L3.6 5H2V3Zm6 15a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm9 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
    bakery:     'M12 5c4.4 0 8 3.4 8 7.5V17H4v-4.5C4 8.4 7.6 5 12 5ZM3 18h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2Zm6-9v6h2V9H9Zm4 0v6h2V9h-2Z',
    hairdresser:'M6.6 2.2 12 9.4l5.4-7.2 1.6 1.2L13.2 11l5.8 7.6-1.6 1.2L12 12.6 6.6 19.8 5 18.6 10.8 11 5 3.4l1.6-1.2ZM5 17.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm14 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
    hotel:      'M2 5h3v9h6a4 4 0 0 1 4 4v1h7v3h-3v-2H2V5Zm6 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm5 0h7a2 2 0 0 1 2 2v5h-9V7Z',
    museum:     'M12 2 1 8v2h22V8L12 2Zm-8 9v8H2v3h20v-3h-2v-8h-2.5v8h-2v-8h-3v8h-2v-8H4Z',
    heritage:   'M8 2h3l-.6 3H8.6L8 2Zm5 0h3l-.6 3h-1.8L13 2ZM8.6 6h2.8l.4 13H8.2l.4-13Zm5 0h2.8l.4 13h-3.6l.4-13ZM5 20h14v2H5v-2Z',
    /* mosque: dome, two minarets and an arched doorway. Tunisia's places of
       worship are overwhelmingly mosques, so this is the sensible default. */
    mosque:     'M12 1.5 10.6 4c.3.4.4.8.4 1.2 0 .5-.2.9-.5 1.3C7.6 8 6 10.3 6 13.2V14h12v-.8c0-2.9-1.6-5.2-4.5-6.7-.3-.4-.5-.8-.5-1.3 0-.4.1-.8.4-1.2L12 1.5ZM2.6 7.4 1.4 9.6h2.4L2.6 7.4ZM1.6 11h2v11h-2V11Zm19.8-3.6-1.2 2.2h2.4l-1.2-2.2ZM20.4 11h2v11h-2V11ZM5 15.6V22h4.2v-3.1a2.8 2.8 0 0 1 5.6 0V22H19v-6.4H5Z',
    church:     'M11 2h2v3h3v2h-3v2.3l6 3.4V22h-5v-4a2 2 0 0 0-4 0v4H5v-9.3l6-3.4V7H8V5h3V2Z',
    worship:    'M12 2c-.6 1.3-1.6 2.2-1.6 3.4 0 .5.2 1 .5 1.4C8.4 8.2 7 10.4 7 13v1h10v-1c0-2.6-1.4-4.8-3.9-6.2.3-.4.5-.9.5-1.4C13.6 4.2 12.6 3.3 12 2Zm-6 13v7h4v-3.6a2 2 0 0 1 4 0V22h4v-7H6Z',
    synagogue:  'M12 2l2.6 4.5h-5.2L12 2ZM7.3 8h9.4l2.6 4.5-2.6 4.5H7.3l-2.6-4.5L7.3 8Zm4.7 2.2-2.2 3.8h4.4L12 10.2ZM4 20h16v2H4v-2Z',
    transport:  'M6 2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v5h12V5H6Zm1.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM6 18l-2 4h3l1-4H6Zm12 0h-2l1 4h3l-2-4Z',
    bus:        'M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 3v4h14V6H5Zm1.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5 18l-1.5 4h3L8 18H5Zm14 0h-3l1.5 4h3L19 18Z',
    train:      'M7 2h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm-.5 3v4h11V5h-11ZM8 11.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM6 18l-2.5 4h3L9 18H6Zm12 0h-3l2.5 4h3L18 18Z',
    airport:    'M21 15.5 13.5 11V5a1.5 1.5 0 0 0-3 0v6L3 15.5V17l7.5-2v4L8 20.5V22l4-1 4 1v-1.5L13.5 19v-4l7.5 2v-1.5Z',
    park:       'M12 2 5 14h4.2l-2.4 4H11v4h2v-4h4.2l-2.4-4H19L12 2Z',
    sport:      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2.2c1.6 0 3.1.5 4.3 1.3l-1.6 2.8-2.7-.8V4.2Zm-2 .3v3.3l-2.7.8-1.6-2.8A7.8 7.8 0 0 1 10 4.5ZM4.6 8.2l1.6 2.8-1.7 2.6-1.7-.8a7.8 7.8 0 0 1 1.8-4.6Zm14.8 0a7.8 7.8 0 0 1 1.8 4.6l-1.7.8-1.7-2.6 1.6-2.8ZM12 9.4l2.8 2-1.1 3.3h-3.4L9.2 11.4l2.8-2Zm-6.4 6.7 1.8.9.3 3a7.9 7.9 0 0 1-2.1-3.9Zm12.8 0a7.9 7.9 0 0 1-2.1 3.9l.3-3 1.8-.9ZM9.6 17h4.8l1 2.7a7.8 7.8 0 0 1-6.8 0l1-2.7Z',
    nature:     'M12 2 4 13h4l-4 6h6v3h4v-3h6l-4-6h4L12 2Z',
    beach:      'M13 21v-9.6l1.6-.5A9 9 0 0 0 3.6 13l9.4-2.6V21h-2ZM12 3a9 9 0 0 1 8.6 6.4L12 12V3Zm-9.4 15.5 1.6 1a3 3 0 0 0 3.6 0l.6-.4.6.4a3 3 0 0 0 3.6 0l.6-.4.6.4a3 3 0 0 0 3.6 0l1.6-1 1 1.6-1.6 1a5 5 0 0 1-5.2.2 5 5 0 0 1-5.2 0 5 5 0 0 1-5.2-.2l-1.6-1 1-1.6Z',
    city:       'M3 22V8l6-4 6 4v3h6v11H3Zm3-9v3h2v-3H6Zm4 0v3h2v-3h-2Zm7 0v3h2v-3h-2Zm-11 5v3h2v-3H6Zm4 0v3h2v-3h-2Zm7 0v3h2v-3h-2Z',
    water:      'M12 2S4 10.4 4 15a8 8 0 0 0 16 0c0-4.6-8-13-8-13Z',
    factory:    'M2 22V9l6 3.6V9l6 3.6V9l6 3.6V22H2Zm4-6v3h2.5v-3H6Zm5.7 0v3h2.5v-3h-2.5Zm5.8 0v3H20v-3h-2.5ZM2 7h5l-.6-5h-3.8L2 7Z',
    office:     'M4 2h16v20h-6v-5h-4v5H4V2Zm3 3v3h3V5H7Zm7 0v3h3V5h-3ZM7 10v3h3v-3H7Zm7 0v3h3v-3h-3Z',
    parking:    'M4 2h9a6.5 6.5 0 0 1 0 13H9v7H4V2Zm5 4v5h3.6a2.5 2.5 0 0 0 0-5H9Z',
    pin:        'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z',
    dot:        'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z'
  };

  /* exact type -> [glyph, colour] */
  var BY_TYPE = {
    'amenity=hospital':['hospital','#e03131'], 'amenity=clinic':['hospital','#e03131'],
    'amenity=doctors':['doctor','#e03131'],    'amenity=dentist':['doctor','#e03131'],
    'amenity=pharmacy':['pharmacy','#2f9e44'], 'healthcare=yes':['hospital','#e03131'],
    'amenity=school':['school','#1971c2'],     'amenity=kindergarten':['school','#1971c2'],
    'amenity=college':['university','#1971c2'],'amenity=university':['university','#1971c2'],
    'amenity=library':['library','#1971c2'],
    'amenity=bank':['bank','#0c8599'],         'amenity=atm':['bank','#0c8599'],
    'amenity=bureau_de_change':['bank','#0c8599'],
    'amenity=post_office':['post','#6741d9'],
    'amenity=police':['police','#364fc7'],     'amenity=fire_station':['police','#c92a2a'],
    'amenity=townhall':['townhall','#6741d9'], 'amenity=courthouse':['townhall','#6741d9'],
    'office=government':['townhall','#6741d9'],
    'amenity=marketplace':['supermarket','#e8590c'],
    'amenity=fuel':['fuel','#495057'],
    'amenity=restaurant':['restaurant','#e8590c'],
    'amenity=cafe':['cafe','#9c6644'],         'amenity=fast_food':['fastfood','#e8590c'],
    'amenity=bar':['cafe','#9c6644'],          'amenity=pub':['cafe','#9c6644'],
    'amenity=ice_cream':['cafe','#9c6644'],
    'amenity=place_of_worship':['mosque','#0b7a3b'],
    'amenity=bus_station':['bus','#1c7ed6'],   'amenity=taxi':['transport','#1c7ed6'],
    'amenity=ferry_terminal':['transport','#1c7ed6'],
    'amenity=parking':['parking','#5c7080'],   'amenity=car_rental':['parking','#5c7080'],
    'amenity=driving_school':['parking','#5c7080'],
    'amenity=theatre':['museum','#c2255c'],    'amenity=cinema':['museum','#c2255c'],
    'amenity=arts_centre':['museum','#c2255c'],
    'amenity=community_centre':['townhall','#6741d9'],
    'shop=supermarket':['supermarket','#e8590c'],
    'shop=convenience':['supermarket','#e8590c'],
    'shop=bakery':['bakery','#e8590c'],        'shop=pastry':['bakery','#e8590c'],
    'shop=butcher':['shop','#e8590c'],         'shop=clothes':['shop','#e8590c'],
    'shop=hairdresser':['hairdresser','#c2255c'], 'shop=beauty':['hairdresser','#c2255c'],
    'tourism=hotel':['hotel','#0b7285'],       'tourism=motel':['hotel','#0b7285'],
    'tourism=guest_house':['hotel','#0b7285'], 'tourism=hostel':['hotel','#0b7285'],
    'tourism=apartment':['hotel','#0b7285'],   'tourism=museum':['museum','#c2255c'],
    'tourism=attraction':['heritage','#9c36b5'],
    'historic=ruins':['heritage','#9c36b5'],
    'historic=archaeological_site':['heritage','#9c36b5'],
    'historic=castle':['heritage','#9c36b5'],  'historic=monument':['heritage','#9c36b5'],
    'historic=memorial':['heritage','#9c36b5'],'historic=building':['heritage','#9c36b5'],
    'public_transport=station':['train','#1c7ed6'],
    'public_transport=stop_position':['bus','#1c7ed6'],
    'public_transport=platform':['bus','#1c7ed6'],
    'public_transport=stop_area':['bus','#1c7ed6'],
    'public_transport=halt':['train','#1c7ed6'],
    'railway=station':['train','#1c7ed6'],     'railway=halt':['train','#1c7ed6'],
    'highway=bus_stop':['bus','#1c7ed6'],
    'aeroway=aerodrome':['airport','#1c7ed6'], 'aeroway=terminal':['airport','#1c7ed6'],
    'leisure=park':['park','#2f9e44'],         'leisure=garden':['park','#2f9e44'],
    'leisure=stadium':['sport','#2f9e44'],     'leisure=sports_centre':['sport','#2f9e44'],
    'leisure=pitch':['sport','#2f9e44'],       'leisure=fitness_centre':['sport','#2f9e44'],
    'leisure=swimming_pool':['water','#1098ad'],'leisure=marina':['water','#1098ad'],
    'natural=beach':['beach','#f08c00'],       'natural=peak':['nature','#5c940d'],
    'natural=spring':['water','#1098ad'],      'natural=cave_entrance':['nature','#5c940d'],
    'natural=oasis':['nature','#5c940d'],
    'place=city':['city','#343a40'],           'place=town':['city','#343a40'],
    'place=village':['city','#343a40'],        'place=suburb':['city','#343a40'],
    'place=neighbourhood':['city','#343a40'],
    'office=company':['office','#495057'],     'office=ngo':['office','#495057'],
    'man_made=lighthouse':['nature','#5c940d'],
    'man_made=water_tower':['water','#1098ad'],'man_made=water_works':['water','#1098ad'],
    'cultural_institution':['library','#c2255c'], 'culture_house':['museum','#c2255c'],
    'museum_or_site':['museum','#c2255c'],     'festival':['museum','#c2255c'],
    'archaeological_site':['heritage','#9c36b5'],
    'hill_lake':['water','#1098ad'],           'hill_dam':['water','#1098ad'],
    'dam':['water','#1098ad'],                 'rural_water_supply':['water','#1098ad'],
    'milk_collection_centre':['factory','#7f5539'],
    'grain_collection_centre':['factory','#7f5539'],
    'irrigation_gda':['water','#1098ad'],      'drinking_water_gda':['water','#1098ad'],
    'mixed_gda':['water','#1098ad'],           'organic_operator':['nature','#5c940d'],
    'dairy_processor':['factory','#7f5539'],   'extension_unit':['office','#495057'],
    'social_promotion_unit':['townhall','#6741d9'],
    'vocational_training_centre':['school','#1971c2'],
    'public_library':['library','#1971c2'],    'mobile_library':['library','#1971c2'],
    'individual_mill':['factory','#7f5539'],   'delegation_summary':['factory','#7f5539']
  };

  /* per-layer fallback — the data holds 430 distinct type values */
  var BY_LAYER = {
    healthcare:['hospital','#e03131'], health_official:['hospital','#e03131'],
    doctors:['doctor','#e03131'],
    education:['school','#1971c2'], schools_official:['school','#1971c2'],
    libraries:['library','#1971c2'],
    public_services:['townhall','#6741d9'], social:['townhall','#6741d9'],
    finance:['bank','#0c8599'], fuel:['fuel','#495057'],
    vehicle:['parking','#5c7080'], other_fac:['office','#495057'],
    shops:['shop','#e8590c'], food:['restaurant','#e8590c'],
    tourism:['hotel','#0b7285'], offices:['office','#495057'],
    olive:['factory','#7f5539'],
    transport:['transport','#1c7ed6'], worship:['worship','#7f5539'],
    heritage:['heritage','#9c36b5'], cultural_sites:['museum','#c2255c'],
    culture_svc:['museum','#c2255c'],
    populated:['city','#343a40'], leisure:['park','#2f9e44'],
    nature:['nature','#5c940d'], agri_infra:['water','#1098ad'],
    water_groups:['water','#1098ad'], branded:['dot','#868e96']
  };

  /* A place of worship should look like the faith it belongs to. OSM tags this in
     `religion`, carried through as the record's subtype. */
  var BY_RELIGION = {
    muslim:    ['mosque',    '#0b7a3b'],
    christian: ['church',    '#7f5539'],
    jewish:    ['synagogue', '#1971c2'],
    buddhist:  ['worship',   '#e8590c']
  };

  function resolve(type, layerKey, subtype) {
    if (type === 'amenity=place_of_worship' && subtype && BY_RELIGION[subtype]) {
      return BY_RELIGION[subtype];
    }
    return BY_TYPE[type] || BY_LAYER[layerKey] || ['pin', '#868e96'];
  }

  /* Teardrop pin, glyph knocked out in white, anchored at the tip. */
  function pinSvg(glyph, colour, size) {
    var w = size, h = Math.round(size * 1.3);
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 30 39" '
      + 'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<path d="M15 38.5C15 38.5 28 24 28 14.5A13 13 0 1 0 2 14.5C2 24 15 38.5 15 38.5Z" '
      +   'fill="' + colour + '" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/>'
      + '<g transform="translate(7.5,7) scale(0.625)" fill="#fff">'
      +   '<path d="' + (P[glyph] || P.pin) + '"/></g></svg>';
  }

  /* Flat glyph, no pin — for legends, popups and the layer list. */
  function glyphSvg(glyph, colour, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" '
      + 'fill="' + colour + '" aria-hidden="true"><path d="'
      + (P[glyph] || P.pin) + '"/></svg>';
  }

  /* Rounded-square chip holding a white glyph — used in the sidebar. */
  function chipSvg(glyph, colour, size) {
    var r = Math.round(size * 0.28);
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" '
      + 'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<rect width="24" height="24" rx="' + r + '" fill="' + colour + '"/>'
      + '<g transform="translate(3.6,3.6) scale(0.7)" fill="#fff">'
      + '<path d="' + (P[glyph] || P.pin) + '"/></g></svg>';
  }

  global.OTIcons = {
    paths: P,
    resolve: resolve,
    pinSvg: pinSvg,
    glyphSvg: glyphSvg,
    chipSvg: chipSvg,
    colourFor: function (t, k) { return resolve(t, k)[1]; },
    glyphFor: function (t, k) { return resolve(t, k)[0]; }
  };
})(window);
