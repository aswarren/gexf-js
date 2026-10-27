/* Copyright (c) 2011 Raphaël Velt
 * Licensed under the MIT License
 * Translations by :
 *    Vicenzo Cosenza (Italian)
 *    Eduardo Ramos Ibáñez (Spanish)
 *    Jaakko Salonen (Finnish)
 *    Zeynep Akata (Turkish)
 *    Σωτήρης Φραγκίσκος (Greek)
 * */

// Namespace
var GexfJS = {
    lensRadius : 200,
    lensGamma : 0.5,
    graphZone : {
        width : 0,
        height : 0
    },
    oldGraphZone : {},
    params : {
        centreX : 400,
        centreY : 350,
        activeNode : -1,
        currentNode : -1,
        activeEdges: {},
        pinnedElements: {}, 
        zoomLevel: 0,
        nodeSizeFactor: 10,  // From 1. Let's make nodes 10x bigger.
        edgeWidthFactor: 5,   // From 1. Let's make edges 5x bigger.
        textDisplayThreshold: 12 // Add this: Don't draw labels unless nodes are big enough
    },
    oldParams : {},
    minZoom : -3,
    maxZoom : 18,
    overviewWidth : 200,
    overviewHeight : 175,
    baseWidth : 800,
    baseHeight : 700,
    overviewScale : .25,
    totalScroll : 0,
    autoCompletePosition : 0,
    i18n : {
        "el" : {
            "search" : "Αναζήτηση Κόμβων",
            "nodeAttr" : "Χαρακτηριστικά",
            "nodes" : "Κόμβοι",
            "inLinks" : "Εισερχόμενοι δεσμοί από",
            "outLinks" : "Εξερχόμενοι δεσμοί προς",
            "undirLinks" : "Ακατεύθυντοι δεσμοί με",
            "lensOn" : "Ενεργοποίηση φακού",
            "lensOff" : "Απενεργοποίηση φακού",
            "edgeOn" : "Εμφάνιση ακμών",
            "edgeOff" : "Απόκρυψη ακμών",
            "zoomIn" : "Μεγέθυνση",
            "zoomOut" : "Σμίκρυνση",
            "browserErr" : 'Ο περιηγητής σας δεν μπορεί να εμφανίσει σωστά αυτή τη σελίδα.<br />Σας προτείνουμε να χρησιμοποιήσετε την τελευταία έκδοση του <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ή του <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>'
        },
        "en" : {
            "search" : "Search nodes",
            "nodeAttr" : "Attributes",
            "nodes" : "Nodes",
            "inLinks" : "Inbound Links from :",
            "outLinks" : "Outbound Links to :",
            "undirLinks" : "Neighbors :",
            "lensOn" : "Activate lens mode",
            "lensOff" : "Deactivate lens mode",
            "edgeOn" : "Show edges",
            "edgeOff" : "Hide edges",
            "zoomIn" : "Zoom In",
            "zoomOut" : "Zoom Out",
            "browserErr" : 'Your browser cannot properly display this page.<br />We recommend you use the latest <a href="http://www.mozilla.com/" target="_blank">Firefox</a> or <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> version'
        },
        "es" : {
            "search" : "Buscar un nodo",
            "nodeAttr" : "Atributos",
            "nodes" : "Nodos",
            "inLinks" : "Aristas entrantes desde :",
            "outLinks" : "Aristas salientes hacia :",
            "undirLinks" : "Aristas no dirigidas con :",
            "lensOn" : "Activar el modo lupa",
            "lensOff" : "Desactivar el modo lupa",
            "edgeOn" : "Mostrar aristas",
            "edgeOff" : "Ocultar aristas",
            "zoomIn" : "Acercar",
            "zoomOut" : "Alejar",
            "browserErr" : 'Tu navegador no es capaz de mostrar esta p&aacute;gina correctamente.<br />Le recomendamos utilizar la &uacute;ltima versi&oacute;n de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> o <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
            "modularity_class" : "Clase de modularidad",
            "degree" : "Grado",
            "indegree" : "Grado de entrada",
            "outdegree" : "Grado de salida",
            "weighted degree" : "Grado ponderado",
            "weighted indegree" : "Grado de entrada ponderado",
            "weighted outdegree" : "Grado de salida ponderado",
            "closnesscentrality" : "Cercan&iacute;a",
            "betweenesscentrality" : "Intermediaci&oacute;n",
            "authority" : "Puntuaci&oacute;n de autoridad (HITS)",
            "hub" : "Puntuaci&oacute; de hub (HITS)",
            "pageranks" : "Puntuaci&oacute; de PageRank"
        },
        "fi" : {
            "search" : "Etsi solmuja",
            "nodeAttr" : "Attribuutit",
            "nodes" : "Solmut",
            "inLinks" : "Lähtevät yhteydet :",
            "outLinks" : "Tulevat yhteydet :",
            "undirLinks" : "Yhteydet :",
            "lensOn" : "Ota linssitila käyttöön",
            "lensOff" : "Poista linssitila käytöstä",
            "edgeOn" : "Näytä kaikki yhteydet",
            "edgeOff" : "Näytä vain valitun solmun yhteydet",
            "zoomIn" : "Suurenna",
            "zoomOut" : "Pienennä",
            "browserErr" : 'Selaimesi ei voi näyttää tätä sivua.<br />Suosittelemme käyttämään uusinta versiota <a href="http://www.mozilla.com/" target="_blank">Firefox</a>- tai <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>-selaimesta'
        },
        "fr" : {
            "search" : "Rechercher un n&oelig;ud",
            "nodeAttr" : "Attributs",
            "nodes" : "N&oelig;uds",
            "inLinks" : "Liens entrants depuis :",
            "outLinks" : "Liens sortants vers :",
            "undirLinks" : "Liens non-dirigés avec :",
            "lensOn" : "Activer le mode loupe",
            "lensOff" : "Désactiver le mode loupe",
            "edgeOn" : "Afficher les sommets",
            "edgeOff" : "Cacher les sommets",
            "zoomIn" : "S'approcher",
            "zoomOut" : "S'éloigner",
            "browserErr" : 'Votre navigateur n\'est malheureusement pas compatible avec les fonctionnalités de ce site<br />Nous vous suggérons d\'utiliser une version récente de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ou <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
            "modularity_class" : "Classe de modularité",
            "degree" : "Degr&eacute;",
            "indegree" : "&frac12; degr&eacute; int&eacute;rieur",
            "outdegree" : "&frac12; degr&eacute; ext&eacute;rieur",
            "weighted degree" : "Degr&eacute; pond&eacute;r&eacute;",
            "weighted indegree" : "&frac12; degr&eacute; int&eacute;rieur pond&eacute;r&eacute;",
            "weighted outdegree" : "&frac12; degr&eacute; ext&eacute;rieur pond&eacute;r&eacute;",
            "closnesscentrality" : "Centralit&eacute; de proximit&eacute;",
            "betweenesscentrality" : "Centralit&eacute; d'interm&eacute;diarit&eacute;",
            "authority" : "Score d'autorit&eacute; (HITS)",
            "hub" : "Score de hub (HITS)",
            "pageranks" : "Score de PageRank"
        },
        "it" : {
            "search" : "Cerca i nodi",
            "nodeAttr" : "Attributi",
            "nodes" : "Nodi",
            "inLinks" : "Link in entrata da :",
            "outLinks" : "Link in uscita verso :",
            "undirLinks" : "Link non direzionati con :",
            "lensOn" : "Attiva la lente d'ingrandimento",
            "lensOff" : "Disattiva la lente d'ingrandimento",
            "edgeOn" : "Mostra gli spigoli",
            "edgeOff" : "Nascondi gli spigoli",
            "zoomIn" : "Zoom in avanti",
            "zoomOut" : "Zoom indietro",
            "browserErr" : 'Il tuo browser non pu&ograve; visualizzare correttamente questa pagina.<br />Ti raccomandiamo l\'uso dell\'ultima versione di  <a href="http://www.mozilla.com/" target="_blank">Firefox</a> o <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>'
        },
        "tr" : {
            "search" : "Düğüm ara",
            "nodeAttr" : "Özellikler",
            "nodes" : "Düğümler",
            "inLinks" : "Gelen bağlantılar",
            "outLinks" : "Giden bağlantılar",
            "undirLinks" : "Yönsüz bağlantılar",
            "lensOn" : "Merceği etkinleştir",
            "lensOff" : "Merceği etkisizleştir",
            "edgeOn" : "Kenar çizgilerini göster",
            "edgeOff" : "Kenar çizgilerini gizle",
            "zoomIn" : "Yaklaştır",
            "zoomOut" : "Uzaklaştır",
            "browserErr" : "Tarayıcınız sayfayı doğru bir biçimde görüntüleyemiyor.<br />En son Firefox veya Chrome sürümünü kullanmanızı tavsiye ederiz."
        }
    },
    lang : "en"
}

function strLang(_str) {
    var _l = GexfJS.i18n[GexfJS.lang];
    return ( _l[_str] ? _l[_str] : ( GexfJS.i18n["en"][_str] ? GexfJS.i18n["en"][_str] : _str.replace("_"," ") ) );
}

function replaceURLWithHyperlinks(text) {
    if (GexfJS.params.replaceUrls) {
        var _urlExp = /(\b(https?:\/\/)?[-A-Z0-9]+\.[-A-Z0-9.:]+(\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)?)/ig,
            _protocolExp = /^https?:\/\//i;
        return text.replace(_urlExp, function(_found) {
            return '<a href="'
                + ( _protocolExp.test(_found) ? '' : 'http://' )
                + _found + '" target="_blank">'
                + _found.replace(_protocolExp,'')
                + "</a>";
        });
    }
    return text;
}

function makeTextDownload (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (GexfJS.textFileUrl !== null) {
      window.URL.revokeObjectURL(GexfJS.textFileUrl);
    }

    // returns a URL you can use as a href
    GexfJS.textFileUrl = window.URL.createObjectURL(data);

    return;
}



function Color(_r, _g, _b) {
    var r, g, b;
    var setColors = function(_r, _g, _b) {
        r = _r;
        g = _g;
        b = _b;
    };

    setColors(_r, _g, _b);
    this.getColors = function() {
        var colors = {
            r: r,
            g: g,
            b: b
        };
        return colors;
    };
}



function displayPath(_eid, _path_str, _path_attr){
	GexfJS.params.activeEdges={};
	GexfJS.params.activeNodes = {};
	if(typeof _eid !== "undefined"){
		var _e = GexfJS.graph.edgeLookup[_eid];
	}
	else{
		var _e = undefined;
	}
    if(typeof _path_attr == "undefined"){
        _path_attr = GexfJS.params.pathAttr;
    }
    var path_attr_id = GexfJS._edge_attr_value[_path_attr];
	//var _e = (typeof _eid !== undefined ? GexfJS.graph.edgeLookup[_eid] : undefined);
	var _pathList=undefined;
	if (typeof _e !== "undefined"){
		_pathList= _e.path;
	}
	else if (_path_str !== "undefined"){
		_pathList= _path_str.split(/[ ,]+/);
	}
	//var _pathList = (typeof _e !== "undefined" ? _e.path : (typeof _path_str !== "undefined" ? _path_str.split(/[ ,]+/) : undefined));
    for (var i in _pathList){
        var path_id = _pathList[i];
        if (!path_id) continue;
        
        var lookup_value = path_id.replace(/"/g, '');
        var _elist = GexfJS.path_highlights[_path_attr][lookup_value];
        
        for (var edge_id in _elist){
            // 1. Mark the Edge as active
            GexfJS.params.activeEdges[edge_id] = true;
            
            // 2. Mark the connected Nodes as active (CORRECTED LOGIC)
            var edgeObj = GexfJS.graph.edgeLookup[edge_id];
            if (edgeObj) {
                // edgeObj.source and target are array indices. 
                // We must look up the actual node object to get the real string ID.
                var sourceNode = GexfJS.graph.nodeList[edgeObj.source];
                var targetNode = GexfJS.graph.nodeList[edgeObj.target];
                
                if (sourceNode) GexfJS.params.activeNodes[sourceNode.id] = true;
                if (targetNode) GexfJS.params.activeNodes[targetNode.id] = true;
            }
        }
    }
    GexfJS.params.path_active = !jQuery.isEmptyObject(GexfJS.params.activeEdges);		
}

function displayNode(_nodeIndex, _recentre) {
    GexfJS.params.currentNode = _nodeIndex;
    if (_nodeIndex != -1) {
        var _d = GexfJS.graph.nodeList[_nodeIndex],
            _b = _d.coords.base,
            _str = '',
            _cG = $("#leftcolumn");
            _cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
        _str += '<h3><div class="largepill" style="background: ' + _d.color.base +'"></div>' + _d.label + '</h3>';
        _str += '<h4>' + strLang("nodeAttr") + '</h4>';
        _str += '<ul><li><b>node id</b> : ' + _d.id + '</li>';
        var sort_attr = Object.keys(GexfJS._node_attr_value).sort();
        for (var x in sort_attr) {
            var y = sort_attr[x];
            var i = GexfJS._node_attr_value[y];
            var attr_name=(GexfJS._node_attr[i] || strLang(i));
                _str += '<li><b><div style="display: initial" id="left_title_'+attr_name+'":>'+ attr_name +'</div>'+ '</b> ' + '<div class="attribute_box" id="left_'+attr_name+'">'+replaceURLWithHyperlinks( _d.attributes[i] ) +'</div>'+ '</li>';
        }
        _str += '</ul><h4>' + ( GexfJS.graph.directed ? strLang("inLinks") : strLang("undirLinks") ) + '</h4><ul>';
        for (var i in GexfJS.graph.edgeList) {
            var _e = GexfJS.graph.edgeList[i]
            if ( _e.target == _nodeIndex ) {
                var _n = GexfJS.graph.nodeList[_e.source];
                _str += '<li><div class="smallpill" style="background: ' + _n.color.base +'"></div><a href="#" onmouseover="GexfJS.params.activeNode = ' + _e.source + '" onclick="displayNode(' + _e.source + ', true); return false;">' + _n.label + '</a>' + ( GexfJS.params.showEdgeWeight && _e.weight ? '<a href="#" onclick="displayPath('+_e.id+',undefined,undefined); return false;">'+' [' + _e.weight + ']</a>' : '') + '</li>';
            }
        }
        if (GexfJS.graph.directed) _str += '</ul><h4>' + strLang("outLinks") + '</h4><ul>';
        for (var i in GexfJS.graph.edgeList) {
            var _e = GexfJS.graph.edgeList[i]
            if ( _e.source == _nodeIndex ) {
                var _n = GexfJS.graph.nodeList[_e.target];
                _str += '<li><div class="smallpill" style="background: ' + _n.color.base +'"></div><a href="#" onmouseover="GexfJS.params.activeNode = ' + _e.target + '" onclick="displayNode(' + _e.target + ', true); return false;">' + _n.label + '</a>' + ( GexfJS.params.showEdgeWeight && _e.weight ? '<a href="#" onclick="displayPath('+_e.id+',undefined,undefined); return false;">'+' [' + _e.weight + ']</a>' : '') + '</li>';
            }
        }
        _str += '</ul><p></p>';
        $("#leftcontent").html(_str);
        if (_recentre) {
            GexfJS.params.centreX = _b.x;
            GexfJS.params.centreY = _b.y;
        }
        $("#searchinput")
            .val(_d.label)
            .removeClass('grey');
    }
}

function updateWorkspaceBounds() {
    
    var _elZC = $("#zonecentre");
    var _top = {
        top : $("#titlebar").height() + "px"
    }
    _elZC.css(_top);
    
    $("#leftcolumn").css(_top);
    GexfJS.graphZone.width = _elZC.width();
    GexfJS.graphZone.height = _elZC.height();
    GexfJS.areParamsIdentical = true;
    
    for (var i in GexfJS.graphZone) {
        GexfJS.areParamsIdentical = GexfJS.areParamsIdentical && ( GexfJS.graphZone[i] == GexfJS.oldGraphZone[i] );
    }
    if (!GexfJS.areParamsIdentical) {
    
    $("#carte")
        .attr({
            width : GexfJS.graphZone.width,
            height : GexfJS.graphZone.height
        })
        .css({
            width : GexfJS.graphZone.width + "px",
            height : GexfJS.graphZone.height + "px"
        });
        for (var i in GexfJS.graphZone) {
            GexfJS.oldGraphZone[i] = GexfJS.graphZone[i];
        }
    }
}

function startMove(evt) {
    evt.preventDefault();
    GexfJS.dragOn = true;
    GexfJS.lastMouse = {
        x : evt.pageX,
        y : evt.pageY
    }
    GexfJS.mouseHasMoved = false;
}

function endMove(evt) {
    document.body.style.cursor = "default";
    GexfJS.dragOn = false;
    GexfJS.mouseHasMoved = false;
}

function onGraphClick(evt) {
    if (!GexfJS.mouseHasMoved) {
        displayNode(GexfJS.params.activeNode);
        
        // ALWAYS clear these states on any click to reset the view.
        // If a node was clicked, displayNode handles its own focus.
        // If background was clicked (-1), this safely returns to default.
        GexfJS.params.activeEdges = {};
        GexfJS.params.path_active = false;
        GexfJS.params.activeNodes = {};
        GexfJS.params.anchorNodes = {};
        GexfJS.params.dashedEdges = {};
        GexfJS.params.referenceEdges = {};
        GexfJS.params.locusContigFilter = {};
        GexfJS.params.focusLocusActive = false;
    }
    endMove();
}

function changeGraphPosition(evt, echelle) {
    document.body.style.cursor = "move";
    var _coord = {
        x : evt.pageX,
        y : evt.pageY
    };
    GexfJS.params.centreX += ( GexfJS.lastMouse.x - _coord.x ) / echelle;
    GexfJS.params.centreY += ( GexfJS.lastMouse.y - _coord.y ) / echelle;
    GexfJS.lastMouse = _coord;
}

function onGraphMove(evt) {
    evt.preventDefault();
    if (!GexfJS.graph) {
        return;
    }
    GexfJS.mousePosition = {
        x : evt.pageX - $(this).offset().left,
        y : evt.pageY - $(this).offset().top
    }
    if (GexfJS.dragOn) {
        changeGraphPosition(evt,GexfJS.echelleGenerale);
        GexfJS.mouseHasMoved = true;
    } else {
        GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
        document.body.style.cursor = ( GexfJS.params.activeNode != -1 ? "pointer" : "default" );
    }
}

function onOverviewMove(evt) {
    if (GexfJS.dragOn) {
        changeGraphPosition(evt,-GexfJS.overviewScale);
    }
}

//divide color value into steps
function Interpolate(start, end, steps, count) {
    var s = start,
        e = end,
        final = s + (((e - s) / steps) * count);
    return Math.floor(final);
}


function onGraphScroll(evt, delta) {
    GexfJS.totalScroll += delta;
    if (Math.abs(GexfJS.totalScroll) >= 1) {
        if (GexfJS.totalScroll < 0) {
            if (GexfJS.params.zoomLevel > GexfJS.minZoom) {
                GexfJS.params.zoomLevel--;
                var _el = $(this),
                    _off = $(this).offset(),
                    _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                    _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                GexfJS.params.centreX -= ( Math.SQRT2 - 1 ) * _deltaX / GexfJS.echelleGenerale;
                GexfJS.params.centreY -= ( Math.SQRT2 - 1 ) * _deltaY / GexfJS.echelleGenerale;
                $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
            }
        } else {
            if (GexfJS.params.zoomLevel < GexfJS.maxZoom) {
                GexfJS.params.zoomLevel++;
                GexfJS.echelleGenerale = Math.pow( Math.SQRT2, GexfJS.params.zoomLevel );
                var _el = $(this),
                    _off = $(this).offset(),
                    _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                    _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                GexfJS.params.centreX += ( Math.SQRT2 - 1 ) * _deltaX / GexfJS.echelleGenerale;
                GexfJS.params.centreY += ( Math.SQRT2 - 1 ) * _deltaY / GexfJS.echelleGenerale;
                $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
            }
        }
        GexfJS.totalScroll = 0;
    }
}

function initializeMap(data) {
    clearInterval(GexfJS.timeRefresh);
    GexfJS.oldParams = {};
    GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
    $("#zoomSlider").slider({
        orientation: "vertical",
        value: GexfJS.params.zoomLevel,
        min: GexfJS.minZoom,
        max: GexfJS.maxZoom,
        range: "min",
        step: 1,
        slide: function( event, ui ) {
            GexfJS.params.zoomLevel = ui.value;
        }
    });
    $("#overviewzone").css({
        width : GexfJS.overviewWidth + "px",
        height : GexfJS.overviewHeight + "px"
    });
    $("#overview").attr({
        width : GexfJS.overviewWidth,
        height : GexfJS.overviewHeight
    });
    GexfJS.timeRefresh = setInterval(traceMap,60);
    GexfJS.graph = null;
    if (typeof data === "undefined"){
        loadGraph();
    }
    else {
        createGraph(data);
    }
}

//given xml data structure
function createGraph(data){

        var _s = new Date();
        var _m = $(data).find("meta");
        if (_m.length > 0){
            var _org_map_xml =  _m.children().filter("org_map");
            if (_org_map_xml.length > 0){
                _org_map= $.parseJSON(_org_map_xml.contents()[0].data.replace("<![CDATA[", "").replace("]]>", ""));
            }
            var _contig_map_xml =  _m.children().filter("contig_map");
            if (_contig_map_xml.length > 0){
                _contig_map= $.parseJSON(_contig_map_xml.contents()[0].data.replace("<![CDATA[", "").replace("]]>", ""));
            }
            var _edge_map_xml =  _m.children().filter("edge_map");
            if (_edge_map_xml.length > 0){
                _edge_map= $.parseJSON(_edge_map_xml.contents()[0].data.replace("<![CDATA[", "").replace("]]>", ""));
            }
        }
        var _g = $(data).find("graph"),
            _nodes = _g.children().filter("nodes").children(),
            _edges = _g.children().filter("edges").children();
        _node_attr=_g.children().filter("attributes").filter(".node").children();
        _edge_attr=_g.children().filter("attributes").filter(".edge").children();
        GexfJS._node_attr={};
        GexfJS._edge_attr={};
        GexfJS._node_attr_value={};
        GexfJS._edge_attr_value={};
        $(_node_attr).each(function() {
            var n_attr =$(this);
            _id=n_attr.attr("id");
            _value=n_attr.attr("title");
            GexfJS._node_attr[_id]=_value;
            GexfJS._node_attr_value[_value]=_id;
        });
        GexfJS.path_highlights={};
        $(_edge_attr).each(function() {
            var n_attr =$(this);
            _id=n_attr.attr("id");
            _value=n_attr.attr("title");
            GexfJS._edge_attr[_id]=_value;
            GexfJS._edge_attr_value[_value]=_id;
            GexfJS.path_highlights[_id]={};
        });
        GexfJS._start_color = new Color(229, 227, 0);//yellow
        GexfJS._end_color = new Color(255, 0, 40); //red
        if (GexfJS.params.colorNodeAttr in GexfJS._node_attr_value){
            GexfJS.params.colorNodeAttr = GexfJS._node_attr_value[GexfJS.params.colorNodeAttr];
        }
        else if ("weight" in GexfJS._node_attr_value){
            GexfJS.params.colorNodeAttr = GexfJS._node_attr_value["weight"];
        }
        else if ("diversity" in GexfJS._node_attr_value){
            GexfJS.params.colorNodeAttr = GexfJS._node_attr_value["diversity"];
        }
        else{
            GexfJS.params.colorNodeAttr = null;
        } 
        if (GexfJS.params.pathAttr in GexfJS._edge_attr_value){
            GexfJS.params.pathAttr = GexfJS._edge_attr_value[GexfJS.params.pathAttr];
        }
        else if("replicons" in GexfJS._edge_attr_value){
            GexfJS.params.pathAttr = GexfJS._edge_attr_value["replicons"];
        }
        else if("sequences" in GexfJS._edge_attr_value){
            GexfJS.params.pathAttr = GexfJS._edge_attr_value["sequences"];
        }
        GexfJS.graph = {
            directed : ( _g.attr("defaultedgetype") == "directed" ),
            source : data,
            nodeList : [],
            nodeIndexById : [],
            nodeIndexByLabel : [],
            edgeList : [],
    edgeLookup : {}
        }
        var _xmin = 1e9, _xmax = -1e9, _ymin = 1e9, _ymax = -1e9; _marge = 30;
        $(_nodes).each(function() {
            var _n = $(this),
            _pos = _n.find("viz\\:position,position"),
            _x = _pos.attr("x"),
            _y = _pos.attr("y");
            _xmin = Math.min(_x, _xmin);
            _xmax = Math.max(_x, _xmax);
            _ymin = Math.min(_y, _ymin);
            _ymax = Math.max(_y, _ymax);
        });
        
        var _echelle = Math.min( ( GexfJS.baseWidth - _marge ) / ( _xmax - _xmin ) , ( GexfJS.baseHeight - _marge ) / ( _ymax - _ymin ) );
        var _deltax = ( GexfJS.baseWidth - _echelle * ( _xmin + _xmax ) ) / 2;
        var _deltay = ( GexfJS.baseHeight - _echelle * ( _ymin + _ymax ) ) / 2;
        
        GexfJS.ctxMini.clearRect(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
        
        $(_nodes).each( function() {
            var _n = $(this),
                _id = _n.attr("id"),
                _label = _n.attr("label") || _id,
                _d = {
                    id: _id,
                    label: _label
                },
                _pos = _n.find("viz\\:position,position"),
                _x = _pos.attr("x"),
                _y = _pos.attr("y"),
                _size = _n.find("viz\\:size,size").attr("value"),
                _col = _n.find("viz\\:color,color"),
                _r = _col.attr("r"),
                _g = _col.attr("g"),
                _b = _col.attr("b"),
                _attr = _n.find("attvalue");
                _self=this;
                if(GexfJS.params.colorNodeAttr != null){
                    $(_attr).each( function(i,_f) {
                        if(_f.getAttribute("for")==GexfJS.params.colorNodeAttr){
                            var weight = parseFloat(_f.getAttribute("value"));
                            var weight2 = weight *100;
                            _r = String(Interpolate(GexfJS._start_color.getColors().r, GexfJS._end_color.getColors().r, 100, weight2));
                            _g = String(Interpolate(GexfJS._start_color.getColors().g, GexfJS._end_color.getColors().g, 100, weight2));
                            _b = String(Interpolate(GexfJS._start_color.getColors().b, GexfJS._end_color.getColors().b, 100, weight2));
                        }
                    });
                }
                
            _d.coords = {
                base : {
                    x : _deltax + _echelle * _x,
                    y : _deltay - _echelle * _y,
                    r : _echelle * _size
                }
            }
            _d.color = {
                rgb : {
                    r : _r,
                    g : _g,
                    b : _b
                },
                base : "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                gris : "rgba(" + Math.floor(84 + .33 * _r) + "," + Math.floor(84 + .33 * _g) + "," + Math.floor(84 + .33 * _b) + ",.5)"
            }
            _d.attributes = [];
            $(_attr).each(function() {
                var _a = $(this),
                    _for = _a.attr("for");
                _d.attributes[ _for ? _for : 'attribute_' + _a.attr("id") ] = _a.attr("value");
            });
            _d.genomes = {};
            _d.sequences = {};
            _d.featureMap = null;
            var featAttrId = GexfJS._node_attr_value["features"];
            if (typeof featAttrId !== "undefined" && _d.attributes[featAttrId]) {
                try {
                    var rawFeatJson = String(_d.attributes[featAttrId]).replace(/""/g, '"');
                    var fMap = JSON.parse(rawFeatJson);
                    _d.featureMap = fMap;
                    for (var gid in fMap) {
                        if (gid === "info") continue;
                        _d.genomes[gid] = true;
                        var cMap = fMap[gid];
                        if (cMap && typeof cMap === "object") {
                            for (var sid in cMap) {
                                _d.sequences[sid] = true;
                            }
                        }
                    }
                } catch (e) {}
            }
            GexfJS.graph.nodeIndexById.push(_id);
            GexfJS.graph.nodeIndexByLabel.push(_label.toLowerCase());
            GexfJS.graph.nodeList.push(_d);
            GexfJS.ctxMini.fillStyle = _d.color.base;
            GexfJS.ctxMini.beginPath();
            GexfJS.ctxMini.arc( _d.coords.base.x * GexfJS.overviewScale , _d.coords.base.y * GexfJS.overviewScale , _d.coords.base.r * GexfJS.overviewScale + 1 , 0 , Math.PI*2 , true );
            GexfJS.ctxMini.closePath();
            GexfJS.ctxMini.fill();
        });
        //used in combination with pathAttr, path_highlights links the replicon id to edges
        var counter =0;
        $(_edges).each(function() {
            var pathList=[];
            var _edgeGenomes = {};
            var _edgeSequences = {};
            var _e = $(this),
                _sid = _e.attr("source"),
                _six = GexfJS.graph.nodeIndexById.indexOf(_sid);
                _tid = _e.attr("target"),
                _tix = GexfJS.graph.nodeIndexById.indexOf(_tid);
                _w = _e.find('attvalue[for="weight"]').attr('value') || _e.attr('weight');
                _col = _e.find("viz\\:color,color");
                _eid = _e.attr("id");
                //for some reason layout sometimes leaves off edge id
                //if(typeof _eid === "undefined"){
                    _eid = String(counter);
                    _e.attr("id", String(counter));
                //}
                counter+=1;

            $.each( GexfJS._edge_attr_value, function(k, cur_attr){
                _pattr=_e.find('attvalue[for="'+cur_attr+'"]').attr('value');
                _p = ( _pattr ? _pattr.split(/[ ,]+/) : _e.attr("path"));
                
                var clean_p = []; // Create a new array for the cleaned path IDs

                if (_p) { // Ensure _p is not null or undefined
                    $(_p).each(function(i, _path) {
                        var clean_path = _path.replace(/"/g, '');
                        clean_p.push(clean_path); // Add the cleaned ID to our new array

                        if (!(clean_path in GexfJS.path_highlights[cur_attr])){
                            GexfJS.path_highlights[cur_attr][clean_path]={}
                        }
                        GexfJS.path_highlights[cur_attr][clean_path][_eid] = true;
                        if (k === "genomes") {
                            _edgeGenomes[clean_path] = true;
                        } else if (k === "sequences") {
                            _edgeSequences[clean_path] = true;
                        }
                    });
                }

                // If this is the main path attribute, store the CLEAN array.
                if(cur_attr == GexfJS.params.pathAttr){
                    pathList = clean_p;
                }
            });

            if (_col.length) {
                var _r = _col.attr("r"),
                    _g = _col.attr("g"),
                    _b = _col.attr("b");
            } else {
                var _scol = GexfJS.graph.nodeList[_six].color.rgb;
                if (GexfJS.graph.directed) {
                    var _r = _scol.r,
                        _g = _scol.g,
                        _b = _scol.b;
                } else {
                    var _tcol = GexfJS.graph.nodeList[_tix].color.rgb,
                        _r = Math.floor( .5 * _scol.r + .5 * _tcol.r ),
                        _g = Math.floor( .5 * _scol.g + .5 * _tcol.g ),
                        _b = Math.floor( .5 * _scol.b + .5 * _tcol.b );
                }
            }
            GexfJS.graph.edgeList.push({
                source : _six,
                target : _tix,
                width : Math.max( GexfJS.params.minEdgeWidth, Math.min( GexfJS.params.maxEdgeWidth, ( _w || 1 ) ) ) * _echelle,
                weight : parseFloat(_w || 0),
                color : "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                path : pathList,
                genomes : _edgeGenomes,
                sequences : _edgeSequences,
                id : _eid
            });
            GexfJS.graph.edgeLookup[_eid]=GexfJS.graph.edgeList[GexfJS.graph.edgeList.length-1];
        });
        
        GexfJS.imageMini = GexfJS.ctxMini.getImageData(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
        var xmlString = (new XMLSerializer()).serializeToString(data);
        GexfJS.textFileUrl = null;
        makeTextDownload(xmlString);
        var downloadLink='<a href='+GexfJS.textFileUrl+' download="pg_graph.gexf">Save Gexf</a>';
        $("#maintitle").html("<h1>"+downloadLink+"</h1>");
    
    //changeNiveau(0);
    }

function loadGraph() {
    
    $.ajax({
        url: ( document.location.hash.length > 1 ? document.location.hash.substr(1) : GexfJS.params.graphFile ),
        dataType: "xml",
	accepts: "application/xml",
        success: function(data) {
            createGraph(data);
        }
    });
}

function getNodeFromPos( _coords ) {
    for (var i = GexfJS.graph.nodeList.length - 1; i >= 0; i--) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.withinFrame) {
            var _c = _d.coords.actual;
                _r = Math.sqrt( Math.pow( _c.x - _coords.x , 2) + Math.pow( _c.y - _coords.y , 2 ) );
            if ( _r < _c.r ) {
                return i;
            }
        }
    }
    return -1;
}

function calcCoord(x, y, coord) {
    var _r = Math.sqrt( Math.pow( coord.x - x , 2 ) + Math.pow( coord.y - y , 2 ) );
    if ( _r < GexfJS.lensRadius ) {
        var _cos = ( coord.x - x ) / _r;
        var _sin = ( coord.y - y ) / _r;
        var _newr = GexfJS.lensRadius * Math.pow( _r / GexfJS.lensRadius, GexfJS.lensGamma );
        var _coeff = ( GexfJS.lensGamma * Math.pow( ( _r + 1 ) / GexfJS.lensRadius, GexfJS.lensGamma - 1 ) );
        return {
            "x" : x + _newr * _cos,
            "y" : y + _newr * _sin,
            "r" : _coeff * coord.r
        }
    }
    else {
        return coord;
    }
}

function traceArc(contexte, source, target) {
    contexte.beginPath();
    contexte.moveTo(source.x, source.y);
    if (GexfJS.params.curvedEdges) {
        if ( ( source.x == target.x ) && ( source.y == target.y ) ) {
            var x3 = source.x + 2.8 * source.r;
            var y3 = source.y - source.r;
            var x4 = source.x;
            var y4 = source.y + 2.8 * source.r;
            contexte.bezierCurveTo(x3,y3,x4,y4,source.x + 1,source.y);
        } else {
            var x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
            var y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
            var x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
            var y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
            contexte.bezierCurveTo(x3,y3,x4,y4,target.x,target.y);
        }
    } else {
        contexte.lineTo(target.x,target.y);
    }
    contexte.stroke();
}

function traceMap() {
    updateWorkspaceBounds();
    if (!GexfJS.graph) {
        return;
    }
    var _identical = GexfJS.areParamsIdentical;
    GexfJS.params.mousePosition = ( GexfJS.params.useLens ? ( GexfJS.mousePosition ? ( GexfJS.mousePosition.x + "," + GexfJS.mousePosition.y ) : "out" ) : null );
    for (var i in GexfJS.params) {
        _identical = _identical && ( GexfJS.params[i] == GexfJS.oldParams[i] );
    }
    if (_identical) {
        return;
    } else {
        for (var i in GexfJS.params) {
            GexfJS.oldParams[i] = GexfJS.params[i];
        }
    }
    
    GexfJS.echelleGenerale = Math.pow( Math.SQRT2, GexfJS.params.zoomLevel );
    GexfJS.decalageX = ( GexfJS.graphZone.width / 2 ) - ( GexfJS.params.centreX * GexfJS.echelleGenerale );
    GexfJS.decalageY = ( GexfJS.graphZone.height / 2 ) - ( GexfJS.params.centreY * GexfJS.echelleGenerale );
    
    var _sizeFactor = GexfJS.echelleGenerale * Math.pow(GexfJS.echelleGenerale, -.15),
        _edgeSizeFactor = _sizeFactor * GexfJS.params.edgeWidthFactor,
        _nodeSizeFactor = _sizeFactor * GexfJS.params.nodeSizeFactor,
        _textSizeFactor = 1;
    
    GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
    
    if (GexfJS.params.useLens && GexfJS.mousePosition) {
        GexfJS.ctxGraphe.fillStyle = "rgba(220,220,250,0.4)";
        GexfJS.ctxGraphe.beginPath();
        GexfJS.ctxGraphe.arc( GexfJS.mousePosition.x , GexfJS.mousePosition.y , GexfJS.lensRadius , 0 , Math.PI*2 , true );
        GexfJS.ctxGraphe.closePath();
        GexfJS.ctxGraphe.fill();
    }
    
    var _centralNode = ( ( GexfJS.params.activeNode != -1 ) ? GexfJS.params.activeNode : GexfJS.params.currentNode );
    var _hasGenomeFilter = GexfJS.params.activeGenomeFilter && !jQuery.isEmptyObject(GexfJS.params.activeGenomeFilter);
    var _hasContigFilter = GexfJS.params.activeContigFilter && !jQuery.isEmptyObject(GexfJS.params.activeContigFilter);
    var _isSubgraphLocusFilter = Boolean(GexfJS.params.focusLocusActive && GexfJS.params.locusFilterMode === 'subgraph');
    var _hasLocusFilter = Boolean(GexfJS.params.focusLocusActive && (_isSubgraphLocusFilter || (GexfJS.params.locusContigFilter && !jQuery.isEmptyObject(GexfJS.params.locusContigFilter))));
    var _filterActive = Boolean(_hasGenomeFilter || _hasContigFilter || _hasLocusFilter);
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        _d.coords.actual = {
            x : GexfJS.echelleGenerale * _d.coords.base.x + GexfJS.decalageX,
            y : GexfJS.echelleGenerale * _d.coords.base.y + GexfJS.decalageY,
            r : _nodeSizeFactor * _d.coords.base.r 
        }
        _d.withinFrame = ( ( _d.coords.actual.x + _d.coords.actual.r > 0 ) && ( _d.coords.actual.x - _d.coords.actual.r < GexfJS.graphZone.width ) && ( _d.coords.actual.y + _d.coords.actual.r > 0) && (_d.coords.actual.y - _d.coords.actual.r < GexfJS.graphZone.height) );
        var _passesManual = true;
        if (_hasGenomeFilter || _hasContigFilter) {
            _passesManual = false;
            if (_hasGenomeFilter && _d.genomes) {
                for (var _fg in GexfJS.params.activeGenomeFilter) {
                    if (_d.genomes[_fg]) { _passesManual = true; break; }
                }
            }
            if (!_passesManual && _hasContigFilter && _d.sequences) {
                for (var _fc in GexfJS.params.activeContigFilter) {
                    if (_d.sequences[_fc]) { _passesManual = true; break; }
                }
            }
        }
        var _passesLocus = true;
        if (_hasLocusFilter) {
            if ((GexfJS.params.activeNodes && GexfJS.params.activeNodes[_d.id]) ||
                (GexfJS.params.anchorNodes && GexfJS.params.anchorNodes[_d.id])) {
                _passesLocus = true;
            } else if (_isSubgraphLocusFilter) {
                _passesLocus = false;
            } else {
                _passesLocus = false;
                if (_d.sequences) {
                    for (var _lc in GexfJS.params.locusContigFilter) {
                        if (_d.sequences[_lc]) { _passesLocus = true; break; }
                    }
                }
            }
        }
        var _passesFilter = _passesManual && _passesLocus;
        _d.filteredOut = !_passesFilter;
        _d.visible = _passesFilter && ( GexfJS.params.currentNode == -1 || i == _centralNode || GexfJS.params.showEdges );
    }
    if (_centralNode != -1 && GexfJS.graph.nodeList[_centralNode] && GexfJS.graph.nodeList[_centralNode].filteredOut) {
        _centralNode = -1;
    }
    
    var _tagsMisEnValeur = [];
    
    if ( _centralNode != -1 ) {
        _tagsMisEnValeur = [ _centralNode ];
    }
    
    var _displayEdges = ( GexfJS.params.showEdges && GexfJS.params.currentNode == -1 );
    var _deferredActiveEdges = [];
    
    for (var i in GexfJS.graph.edgeList) {
        var _d = GexfJS.graph.edgeList[i],
            _six = _d.source,
            _tix = _d.target,
            _ds = GexfJS.graph.nodeList[_six],
            _dt = GexfJS.graph.nodeList[_tix];
        var _eid = _d.id;
        var active_edge = (_eid in GexfJS.params.activeEdges);
        var ref_edge = Boolean(GexfJS.params.referenceEdges && GexfJS.params.referenceEdges[_eid]);

        if (_filterActive) {
            if (_ds.filteredOut || _dt.filteredOut) continue;
            if (_hasGenomeFilter || _hasContigFilter) {
                var _edgePassesManual = false;
                if (_hasGenomeFilter && _d.genomes) {
                    for (var _efg in GexfJS.params.activeGenomeFilter) {
                        if (_d.genomes[_efg]) { _edgePassesManual = true; break; }
                    }
                }
                if (!_edgePassesManual && _hasContigFilter && _d.sequences) {
                    for (var _efc in GexfJS.params.activeContigFilter) {
                        if (_d.sequences[_efc]) { _edgePassesManual = true; break; }
                    }
                }
                if (!_edgePassesManual) continue;
            }
            if (_hasLocusFilter && !active_edge && !ref_edge) {
                if (_isSubgraphLocusFilter) continue;
                var _edgePassesLocus = false;
                if (_d.sequences) {
                    for (var _elc in GexfJS.params.locusContigFilter) {
                        if (_d.sequences[_elc]) { _edgePassesLocus = true; break; }
                    }
                }
                if (!_edgePassesLocus) continue;
            }
        }

        var _isLinked = false;
        if (_centralNode != -1) {
            if (_six == _centralNode) {
                _tagsMisEnValeur.push(_tix);
                _coulTag = _dt.color.base;
                _isLinked = true;
                _dt.visible = true;
            }
            if (_tix == _centralNode) {
                _tagsMisEnValeur.push(_six);
                _coulTag = _ds.color.base;
                _isLinked = true;
                _ds.visible = true;
            }
        }

        var _spotEdge = (GexfJS.params.locusSpotlightActive && GexfJS.params.locusEdgeSpotlight) ? GexfJS.params.locusEdgeSpotlight[_eid] : null;

        if (  (( _isLinked || _displayEdges ) && ( _ds.withinFrame || _dt.withinFrame ) &&  _ds.visible && _dt.visible) || active_edge || ref_edge || _spotEdge) {
            var _coords = ( ( GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _ds.coords.actual ) : _ds.coords.actual );
            _coordt = ( (GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dt.coords.actual ) : _dt.coords.actual );
            var _color;
            var _lineW = _edgeSizeFactor * _d.width;
            var _isDashed = Boolean(GexfJS.params.dashedEdges && GexfJS.params.dashedEdges[_eid]);

            if (GexfJS.params.locusSpotlightActive) {
                if (_spotEdge && (_spotEdge.hasEvent || _spotEdge.hasRef)) {
                    _deferredActiveEdges.push({
                        coords: _coords,
                        coordt: _coordt,
                        lineWidth: Math.max(2.8, _lineW * 1.4),
                        dashed: _isDashed,
                        spotEdge: _spotEdge
                    });
                } else {
                    // Non-spotlighted edges go to soft neutral grey
                    GexfJS.ctxGraphe.lineWidth = (active_edge || ref_edge) ? Math.max(1.6, _lineW) : _lineW;
                    GexfJS.ctxGraphe.strokeStyle = (active_edge || ref_edge) ? "rgba(155,168,180,0.42)" : "rgba(180,190,200,0.18)";
                    traceArc(GexfJS.ctxGraphe, _coords, _coordt);
                }
            } else {
                if (ref_edge && !active_edge) {
                    _color = "#0288d1";
                    _lineW = Math.max(2.2, _lineW * 1.2);
                }
                else if (GexfJS.params.pinnedElements && GexfJS.params.pinnedElements['e_' + _d.id]) {
                    // 1. Pinned Colors always win
                    _color = GexfJS.params.pinnedElements['e_' + _d.id];
                    if (active_edge) {
                        _lineW = Math.max(2.6, _lineW * 1.35);
                    }
                }
                else if (GexfJS.params.path_active && active_edge) {
                    // 2. It's a highlighted edge! Make it visible with a minimum readable stroke width.
                    _lineW = Math.max(2.6, _lineW * 1.35);
                    if (GexfJS.params.highlightColorOverride) {
                        _color = GexfJS.params.highlightColorOverride; // User override
                    } else {
                        _color = GexfJS.params.muteDefaultColors ? "#d500f9" : "#d500f9"; 
                    }
                }
                else {
                    // 3. Not highlighted (either neighbor hover or faded background)
                    var baseEdgeColor = GexfJS.params.muteDefaultColors ? "rgba(180,180,180,0.5)" : _d.color;
                    _color = ( (_isLinked && !GexfJS.params.path_active) ? baseEdgeColor : "rgba(100,100,100,0.18)" );
                }

                if (active_edge || ref_edge) {
                    _deferredActiveEdges.push({
                        coords: _coords,
                        coordt: _coordt,
                        color: _color,
                        lineWidth: _lineW,
                        dashed: _isDashed,
                        spotEdge: null
                    });
                } else {
                    GexfJS.ctxGraphe.lineWidth = _lineW;
                    GexfJS.ctxGraphe.strokeStyle = _color;
                    traceArc(GexfJS.ctxGraphe, _coords, _coordt);
                }
            }
        }
    }

    // Helper to draw a spotlighted edge track with optional perpendicular offset and directional arrowhead
    var drawSpotlightTrack = function(ctx, c1, c2, color, lw, dashed, dir, offsetPx) {
        var dx = c2.x - c1.x;
        var dy = c2.y - c1.y;
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1e-3) return;
        var nx = -dy / len;
        var ny = dx / len;
        var ox = nx * (offsetPx || 0);
        var oy = ny * (offsetPx || 0);
        var sc = { x: c1.x + ox, y: c1.y + oy };
        var tc = { x: c2.x + ox, y: c2.y + oy };

        ctx.save();
        ctx.lineWidth = lw;
        ctx.strokeStyle = color;
        if (dashed && ctx.setLineDash) {
            ctx.setLineDash([7, 4]);
        }
        traceArc(ctx, sc, tc);
        if (dashed && ctx.setLineDash) {
            ctx.setLineDash([]);
        }

        // Draw directional chevron/arrowhead along the straight chord if orientation direction (1 or -1) is known
        if ((dir === 1 || dir === -1) && len > 18) {
            var ux = (dx / len) * dir;
            var uy = (dy / len) * dir;
            var mx = (sc.x + tc.x) * 0.5;
            var my = (sc.y + tc.y) * 0.5;
            var headLen = Math.min(9, Math.max(6, lw * 2.3));
            var headW = headLen * 0.62;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(mx + ux * (headLen * 0.55), my + uy * (headLen * 0.55));
            ctx.lineTo(mx - ux * (headLen * 0.45) - uy * headW, my - uy * (headLen * 0.45) + ux * headW);
            ctx.lineTo(mx - ux * (headLen * 0.45) + uy * headW, my - uy * (headLen * 0.45) - ux * headW);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    };

    // Pass 2: Draw active / spotlighted edges on top of faded background edges
    for (var aeIdx = 0; aeIdx < _deferredActiveEdges.length; aeIdx++) {
        var _ae = _deferredActiveEdges[aeIdx];
        if (_ae.spotEdge) {
            var se = _ae.spotEdge;
            if (se.hasEvent && se.hasRef) {
                drawSpotlightTrack(GexfJS.ctxGraphe, _ae.coords, _ae.coordt, "#d500f9", _ae.lineWidth, _ae.dashed, se.eventDir, 2.4);
                drawSpotlightTrack(GexfJS.ctxGraphe, _ae.coords, _ae.coordt, "#0288d1", _ae.lineWidth, false, se.refDir, -2.4);
            } else if (se.hasEvent) {
                drawSpotlightTrack(GexfJS.ctxGraphe, _ae.coords, _ae.coordt, "#d500f9", _ae.lineWidth, _ae.dashed, se.eventDir, 0);
            } else if (se.hasRef) {
                drawSpotlightTrack(GexfJS.ctxGraphe, _ae.coords, _ae.coordt, "#0288d1", _ae.lineWidth, false, se.refDir, 0);
            }
        } else {
            GexfJS.ctxGraphe.lineWidth = _ae.lineWidth;
            GexfJS.ctxGraphe.strokeStyle = _ae.color;
            if (_ae.dashed && GexfJS.ctxGraphe.setLineDash) {
                GexfJS.ctxGraphe.setLineDash([7, 4]);
            }
            traceArc(GexfJS.ctxGraphe, _ae.coords, _ae.coordt);
            if (_ae.dashed && GexfJS.ctxGraphe.setLineDash) {
                GexfJS.ctxGraphe.setLineDash([]);
            }
        }
    }

    GexfJS.ctxGraphe.lineWidth = 4;
    GexfJS.ctxGraphe.strokeStyle = "rgba(0,100,0,0.8)";
    
    if (_centralNode != -1) {
        var _dnc = GexfJS.graph.nodeList[_centralNode];
        _dnc.coords.real = ( (GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dnc.coords.actual ) : _dnc.coords.actual );
    }
    
    var hasActiveNodes = (GexfJS.params.activeNodes && !jQuery.isEmptyObject(GexfJS.params.activeNodes)) ||
                         (GexfJS.params.anchorNodes && !jQuery.isEmptyObject(GexfJS.params.anchorNodes));
    var isFadeMode = (_tagsMisEnValeur.length > 0 || hasActiveNodes);

    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.withinFrame) {
            if (i != _centralNode) {
                _d.coords.real = ( ( GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _d.coords.actual ) : _d.coords.actual );
                
                // 1. Is this node connected to an active edge?
                _d.isTag = ( _tagsMisEnValeur.indexOf(parseInt(i)) != -1 );

                // 2. Is this node a focal active node or a flanking conserved anchor node?
                var isFocalNode = Boolean(GexfJS.params.activeNodes && GexfJS.params.activeNodes[_d.id]);
                var isAnchorNode = Boolean(GexfJS.params.anchorNodes && GexfJS.params.anchorNodes[_d.id]);
                var isNodeActive = isFocalNode || isAnchorNode;
                var spotNode = (GexfJS.params.locusSpotlightActive && GexfJS.params.locusNodeSpotlight) ? GexfJS.params.locusNodeSpotlight[_d.id] : null;
                var isNodeSpotlighted = Boolean(spotNode && (spotNode.hasEvent || spotNode.hasRef));

                // 3. Should it be grey? 
                var shouldBeGrey = GexfJS.params.locusSpotlightActive
                    ? !isNodeSpotlighted
                    : ( isFadeMode && !_d.isTag && !isNodeActive );

                // 4. Set the Color
                var _color;
                if (GexfJS.params.locusSpotlightActive) {
                    if (isNodeSpotlighted) {
                        if (spotNode.hasEvent && !spotNode.hasRef) {
                            _color = "#d500f9";
                        } else if (spotNode.hasRef && !spotNode.hasEvent) {
                            _color = "#0288d1";
                        } else {
                            // Shared by both spotlighted Event and Reference contigs: fill Blue, draw Magenta half-disc below
                            _color = "#0288d1";
                        }
                    } else if (isNodeActive) {
                        // Unvisited locus node: visible muted slate grey
                        _color = "#cfd8dc";
                    } else {
                        _color = "rgba(195,203,210,0.25)";
                    }
                }
                else if (isAnchorNode && !isFocalNode) {
                    // Flanking conserved anchor node: keep native conservation fill (or soft emerald tint if muted)
                    _color = GexfJS.params.muteDefaultColors ? "#81c784" : _d.color.base;
                }
                else if (GexfJS.params.pinnedElements && GexfJS.params.pinnedElements['n_' + _d.id]) {
                    // 1. Pinned color always wins
                    _color = GexfJS.params.pinnedElements['n_' + _d.id];
                }
                else if (isFadeMode && !shouldBeGrey) {
                    // 2. Node is actively highlighted (e.g. focal phenomenon node)
                    if (GexfJS.params.highlightColorOverride) {
                        _color = GexfJS.params.highlightColorOverride;
                    } else {
                        _color = GexfJS.params.muteDefaultColors ? "#d500f9" : _d.color.base;
                    }
                }
                else {
                    // 3. Background / Default State (It is not highlighted)
                    var baseNodeColor = GexfJS.params.muteDefaultColors ? "rgba(180,180,180,0.8)" : _d.color.base;
                    var grisNodeColor = GexfJS.params.muteDefaultColors ? "rgba(100,100,100,0.22)" : _d.color.gris;
                    _color = ( shouldBeGrey ? grisNodeColor : baseNodeColor );
                }
                
                GexfJS.ctxGraphe.fillStyle = _color;
                GexfJS.ctxGraphe.beginPath();
                GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r , 0 , Math.PI*2 , true );
                GexfJS.ctxGraphe.closePath();
                GexfJS.ctxGraphe.fill();

                // If shared by both Event and Reference spotlighted contigs, fill left half in Magenta (#d500f9) and right half in Ocean Blue (#0288d1)
                if (GexfJS.params.locusSpotlightActive && spotNode && spotNode.hasEvent && spotNode.hasRef) {
                    GexfJS.ctxGraphe.save();
                    GexfJS.ctxGraphe.fillStyle = "#d500f9";
                    GexfJS.ctxGraphe.beginPath();
                    GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r , Math.PI * 0.5 , Math.PI * 1.5 , false );
                    GexfJS.ctxGraphe.closePath();
                    GexfJS.ctxGraphe.fill();
                    GexfJS.ctxGraphe.restore();
                }

                // 5. Draw role halo ring for focal vs. flanking anchor nodes when highlighting phenomena
                if (isAnchorNode && !isFocalNode) {
                    GexfJS.ctxGraphe.save();
                    GexfJS.ctxGraphe.lineWidth = Math.max(2.4, _d.coords.real.r * 0.30);
                    GexfJS.ctxGraphe.strokeStyle = (GexfJS.params.locusSpotlightActive && !isNodeSpotlighted) ? "#90a4ae" : "#2e7d32";
                    GexfJS.ctxGraphe.beginPath();
                    GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r + 1.6 , 0 , Math.PI*2 , true );
                    GexfJS.ctxGraphe.closePath();
                    GexfJS.ctxGraphe.stroke();
                    GexfJS.ctxGraphe.restore();
                } else if (isFocalNode && GexfJS.params.activePhenomenon) {
                    GexfJS.ctxGraphe.save();
                    GexfJS.ctxGraphe.lineWidth = Math.max(1.8, _d.coords.real.r * 0.22);
                    var ringCol = "#6a1b9a";
                    if (GexfJS.params.locusSpotlightActive) {
                        if (!isNodeSpotlighted) ringCol = "#90a4ae";
                        else if (spotNode.hasRef && !spotNode.hasEvent) ringCol = "#01579b";
                    }
                    GexfJS.ctxGraphe.strokeStyle = ringCol;
                    GexfJS.ctxGraphe.beginPath();
                    GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r + 1.0 , 0 , Math.PI*2 , true );
                    GexfJS.ctxGraphe.closePath();
                    GexfJS.ctxGraphe.stroke();
                    GexfJS.ctxGraphe.restore();
                }
            }
        }
    }
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.withinFrame) {
            if (i != _centralNode) {
                var isFocalLbl = Boolean(GexfJS.params.activeNodes && GexfJS.params.activeNodes[_d.id]);
                var isAnchorLbl = Boolean(GexfJS.params.anchorNodes && GexfJS.params.anchorNodes[_d.id]);
                var isActiveLbl = isFocalLbl || isAnchorLbl;
                var spotNodeLbl = (GexfJS.params.locusSpotlightActive && GexfJS.params.locusNodeSpotlight) ? GexfJS.params.locusNodeSpotlight[_d.id] : null;
                var isSpotLbl = Boolean(spotNodeLbl && (spotNodeLbl.hasEvent || spotNodeLbl.hasRef));
                var shouldBeGreyLbl = GexfJS.params.locusSpotlightActive
                    ? !isSpotLbl
                    : ( isFadeMode && !_d.isTag && !isActiveLbl );

                // Suppress background node labels when focused on a single locus to avoid clutter
                if (GexfJS.params.focusLocusActive && !isActiveLbl) {
                    continue;
                }

                var _fs = _d.coords.real.r * _textSizeFactor;
                if (_d.isTag) {
                    if (_centralNode != -1) {
                        var _dist = Math.sqrt( Math.pow( _d.coords.real.x - _dnc.coords.real.x, 2 ) + Math.pow( _d.coords.real.y - _dnc.coords.real.y, 2 ) );
                        if (_dist > 80) {
                            _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _fs);
                        }
                    } else {
                        _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _fs);
                    }
                } else if (GexfJS.params.focusLocusActive && isActiveLbl) {
                    _fs = Math.max(GexfJS.params.textDisplayThreshold + 4, _fs);
                }

                if (_fs > GexfJS.params.textDisplayThreshold) {
                    if (GexfJS.params.showNodeLabels !== false) {
                        var finalFs = Math.max(9, Math.floor(_fs * (GexfJS.params.labelSizeFactor || 1.0)));
                        GexfJS.ctxGraphe.font = ((isActiveLbl && !shouldBeGreyLbl) ? "bold " : "") + finalFs + "px Arial";
                        GexfJS.ctxGraphe.textAlign = "center";
                        GexfJS.ctxGraphe.textBaseline = "middle";

                        var lblText = _d.label;
                        if (isSpotLbl && spotNodeLbl.featTag) {
                            lblText = _d.label + " [" + spotNodeLbl.featTag + "]";
                        }

                        if (isActiveLbl && isFadeMode && !shouldBeGreyLbl) {
                            GexfJS.ctxGraphe.fillStyle = "rgba(255,255,255,0.88)";
                            GexfJS.ctxGraphe.fillText(lblText, _d.coords.real.x - 1, _d.coords.real.y);
                            GexfJS.ctxGraphe.fillText(lblText, _d.coords.real.x + 1, _d.coords.real.y);
                            GexfJS.ctxGraphe.fillText(lblText, _d.coords.real.x, _d.coords.real.y - 1);
                            GexfJS.ctxGraphe.fillText(lblText, _d.coords.real.x, _d.coords.real.y + 1);
                            if (GexfJS.params.locusSpotlightActive && spotNodeLbl) {
                                GexfJS.ctxGraphe.fillStyle = (spotNodeLbl.hasRef && !spotNodeLbl.hasEvent) ? "#01579b" : "#38006b";
                            } else {
                                GexfJS.ctxGraphe.fillStyle = (isAnchorLbl && !isFocalLbl) ? "#1b5e20" : "#38006b";
                            }
                        } else if (shouldBeGreyLbl) {
                            GexfJS.ctxGraphe.fillStyle = isActiveLbl ? "rgba(110,120,130,0.65)" : "rgba(130,130,130,0.32)";
                        } else {
                            GexfJS.ctxGraphe.fillStyle = ( ( i != GexfJS.params.activeNode ) && _tagsMisEnValeur.length && ( ( !_d.isTag ) || ( _centralNode != -1 ) ) ? "rgba(60,60,60,0.7)" : "rgb(0,0,0)" );
                        }
                        GexfJS.ctxGraphe.fillText(lblText, _d.coords.real.x, _d.coords.real.y);
                    }
                }
            }
        }
    }
    
    if (_centralNode != -1) {
        var defaultDncBase = GexfJS.params.muteDefaultColors ? "rgba(180,180,180,0.8)" : _dnc.color.base;
        GexfJS.ctxGraphe.fillStyle = defaultDncBase;
        GexfJS.ctxGraphe.beginPath();
        GexfJS.ctxGraphe.arc( _dnc.coords.real.x , _dnc.coords.real.y , _dnc.coords.real.r , 0 , Math.PI*2 , true );
        GexfJS.ctxGraphe.closePath();
        GexfJS.ctxGraphe.fill();
        GexfJS.ctxGraphe.stroke();
        
        // --- NEW: Check if labels are globally enabled before drawing text ---
        if (GexfJS.params.showNodeLabels !== false) {
            var _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _dnc.coords.real.r * _textSizeFactor) + 2;
            
            // --- NEW: Apply the size multiplier ---
            var finalFs = _fs * (GexfJS.params.labelSizeFactor || 1.0);
            GexfJS.ctxGraphe.font = "bold " + Math.floor( finalFs )+"px Arial";
            
            GexfJS.ctxGraphe.textAlign = "center";
            GexfJS.ctxGraphe.textBaseline = "middle";
            GexfJS.ctxGraphe.fillStyle = "rgba(255,255,250,0.8)";
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x - 2, _dnc.coords.real.y);
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x + 2, _dnc.coords.real.y);
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y - 2);
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y + 2);
            GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y);
        }
    }
    
    GexfJS.ctxMini.putImageData(GexfJS.imageMini, 0, 0);
    var _r = GexfJS.overviewScale / GexfJS.echelleGenerale,
        _x = - _r * GexfJS.decalageX,
        _y = - _r * GexfJS.decalageY,
        _w = _r * GexfJS.graphZone.width,
        _h = _r * GexfJS.graphZone.height;
    
    GexfJS.ctxMini.strokeStyle = "rgb(220,0,0)";
    GexfJS.ctxMini.lineWidth = 3;
    GexfJS.ctxMini.fillStyle = "rgba(120,120,120,0.2)";
    GexfJS.ctxMini.beginPath();
    GexfJS.ctxMini.fillRect( _x, _y, _w, _h );
    GexfJS.ctxMini.strokeRect( _x, _y, _w, _h );
}

function hoverAC() {
    $("#autocomplete li").removeClass("hover");
    $("#liac_"+GexfJS.autoCompletePosition).addClass("hover");
    GexfJS.params.activeNode = GexfJS.graph.nodeIndexByLabel.indexOf( $("#liac_"+GexfJS.autoCompletePosition).text().toLowerCase() );
}

function changePosAC(_n) {
    GexfJS.autoCompletePosition = _n;
    hoverAC();
}

function updateAutoComplete(_sender) {
    var _val = $(_sender).val().toLowerCase();
    var _ac = $("#autocomplete");
    if (_val != GexfJS.dernierAC || _ac.html() == "") {
        GexfJS.dernierAC = _val;
        var _strAC = "<div><h4>" + strLang("nodes") + "</h4><ul>";
        var _n = 0;
        for (var i in GexfJS.graph.nodeIndexByLabel) {
            var _l = GexfJS.graph.nodeIndexByLabel[i];
            if (_l.search(_val) != -1) {
                _strAC += '<li id="liac_' + _n + '" onmouseover="changePosAC(' + _n + ')"><a href="#" onclick="displayNode(\'' + i + '\', true); return false;"><span>' + GexfJS.graph.nodeList[i].label + '</span></a>';
                _n++;
            }
            if (_n >= 20) {
                break;
            }
        }
        GexfJS.autoCompletePosition = 0;
        _ac.html(_strAC + "</ul></div>");
    }
    hoverAC();
    _ac.show();
}

function updateButtonStates() {
    $("#lensButton").attr("class",GexfJS.params.useLens?"":"off")
        .attr("title", strLang( GexfJS.params.showEdges ? "lensOff" : "lensOn" ) );

    $("#edgesButton").attr("class",GexfJS.params.showEdges?"":"off")
        .attr("title", strLang( GexfJS.params.showEdges ? "edgeOff" : "edgeOn" ) );
}

function setParams(paramlist) {
    for (var i in paramlist) {
        GexfJS.params[i] = paramlist[i];
    }
    GexfJS.params.patric_on= true;
}

function startGraphViewer(data){
    
    var lang = (
        typeof GexfJS.params.language != "undefined" && GexfJS.params.language
        ? GexfJS.params.language
        : (
            navigator.language
            ? navigator.language.substr(0,2).toLowerCase()
            : (
                navigator.userLanguage
                ? navigator.userLanguage.substr(0,2).toLowerCase()
                : "en"
            )
        )
    );
    GexfJS.lang = (GexfJS.i18n[lang] ? lang : "en");
    
    if ( !document.createElement('canvas').getContext ) {
        $("#bulle").html('<p><b>' + strLang("browserErr") + '</b></p>');
        return;
    }
    
    updateButtonStates();
    
    GexfJS.ctxGraphe = document.getElementById('carte').getContext('2d');
    GexfJS.ctxMini = document.getElementById('overview').getContext('2d');
    updateWorkspaceBounds();
    
    initializeMap(data);
    
    window.onhashchange = initializeMap;
    
    $("#searchinput")
        .focus(function() {
            if ( $(this).is('.grey') ) {
                $(this).val('').removeClass('grey');
            }
        })
        .keyup(function(evt) {
            updateAutoComplete(this);
        }).keydown(function(evt){
            var _l = $("#autocomplete li").length;
            switch (evt.keyCode) {
                case 40 :
                    if (GexfJS.autoCompletePosition < _l - 1) {
                        GexfJS.autoCompletePosition++;
                    } else {
                        GexfJS.autoCompletePosition = 0;
                    }
                break;
                case 38 :
                    if (GexfJS.autoCompletePosition > 0) {
                        GexfJS.autoCompletePosition--;
                    } else {
                        GexfJS.autoCompletePosition = _l - 1;
                    }
                break;
                case 27 :
                    $("#autocomplete").slideUp();
                break;
                case 13 :
                    if ($("#autocomplete").is(":visible")) {
                        var _liac = $("#liac_"+GexfJS.autoCompletePosition);
                        if (_liac.length) {
                            $(this).val(_liac.find("span").text());
                        }
                    }
                break;
                default :
                    GexfJS.autoCompletePosition = 0;
                break;
            }
            updateAutoComplete(this);
            if (evt.keyCode == 38 || evt.keyCode == 40) {
                return false;
            }
        });
    $("#recherche").submit(function() {
        if (GexfJS.graph) {
            displayNode( GexfJS.graph.nodeIndexByLabel.indexOf($("#searchinput").val().toLowerCase()), true);
        }
        return false;
    });
    $("#carte")
        .mousemove(onGraphMove)
        .click(onGraphClick)
        .mousedown(startMove)
        .mouseout(function() {
            GexfJS.mousePosition = null;
            endMove();
        })
        .mousewheel(onGraphScroll);
    $("#overview")
        .mousemove(onOverviewMove)
        .mousedown(startMove)
        .mouseup(endMove)
        .mouseout(endMove)
        .mousewheel(onGraphScroll);
    $("#zoomMinusButton").click(function() {
        GexfJS.params.zoomLevel = Math.max( GexfJS.minZoom, GexfJS.params.zoomLevel - 1);
        $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
        return false;
    })
        .attr("title", strLang("zoomOut"));
    $("#zoomPlusButton").click(function() {
        GexfJS.params.zoomLevel = Math.min( GexfJS.maxZoom, GexfJS.params.zoomLevel + 1);
        $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
        return false;
    })
        .attr("title", strLang("zoomIn"));
    $(document).click(function(evt) {
        $("#autocomplete").slideUp();
    });
    $("#autocomplete").css({
        top: ( $("#searchinput").offset().top + $("#searchinput").outerHeight() ) + "px",
        left: $("#searchinput").offset().left + "px"
    });
    $("#lensButton").click(function () {
        GexfJS.params.useLens = !GexfJS.params.useLens;
        updateButtonStates();
        return false;
    });
    $("#edgesButton").click(function () {
        GexfJS.params.showEdges = !GexfJS.params.showEdges;
        updateButtonStates();
        return false;
    });
	$("#aUnfold").click(function() {
		// Determine if we are opening or closing based on current class
		var isGraphSmall = $(this).hasClass("rightarrow");
		
		// We animate the 'right' property because the panel is anchored to the right.
		var _params = {
			right: isGraphSmall ? "-250px" : "0px" // Hide off-screen right (-250px) or show (0px)
		};

		$("#leftcolumn").animate(_params, 500, function() {
			// Toggle the arrow icon class
			$("#aUnfold").toggleClass("rightarrow").toggleClass("leftarrow");
			
			// Trigger a resize so the canvas fills the new space
			if (window.updateWorkspaceBounds) { 
				// In Dojo we rely on the widget resize, but here we can just update global vars
				// or trigger a window resize event to let GEXFView.js handle it.
				window.dispatchEvent(new Event('resize'));
			}
		});
		return false;
	});
}
