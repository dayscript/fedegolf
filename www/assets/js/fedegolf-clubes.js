/**
* @author Manuel Ramirez
* @version 0.1
* @since 07/01/2015
* @see Archivo complementario con las funciones integradas a los servicios expuestos para mejor orden del desarrollo
*/


/**
* Metodo que retorna los clubes
*/
function getClubes(){
  $(".list_clubes").html(""); 
  $(".alts-cmbClub").html("")
  $(".alts-cmbClub").append('<option value="0">Todos los Clubes</option>')
  $.ajax({
     url: url + services["clubes"],
     type: 'POST',
     data: "{}",
     headers: {"key":key},
     contentType: "application/json",
     dataType: 'json',
     success: function (data) {
        response = $.parseJSON(data.d);
        console.log(response);
        var image = "assets/images/icons/notfound.png";
        //console.log(response);
        var htmlClubes = "";
        var minHeight = parseInt((response.length / 3)*138);
        $(".list_clubes").parent('.bg_perfil').css("min-height", minHeight);
        for(i=0; i<response.length; i++){
          imageUrl = urlImg+'club/'+response[i].codFotografiaLogotipo+'/logo.jpg';
          htmlClubes = '<div class="small-4 medium-4 large-4 columns item_club"> ' 
                                + ' <a href="#clubes_detalle-club" data-transition="slide" class="alts-clubHref" id="alts-cpdClub-'+response[i].codClub+'">'+
                                ' <h3>'+response[i].nombre.replace("Country","Ctry").replace("Corporacion", "Corp.").replace("Independiente ","Indte. ").replace("Independientes", "Indtes.")+'</h3>' +
                                ' <img src="'+imageUrl+'" alt="">' +
                                ' </a>' +
                                '</div>'+
                                '';  
          $(".list_clubes").append(htmlClubes); 
          $(".alts-cmbClub").append('<option value="'+response[i].codClub+'">'+response[i].nombre+'</option>')
        }
        //console.log(htmlClubes);
        $(".alts-clubHref").on("click",function(){
            cargueInfo($(this));
            console.log($(this).attr("id"));
        })

     }
    });
}

/**
* Metodo para obtener los clubes por la zona en la que se encuentran
*/
function getClubByZona(codZona){
    $(".list_clubes").html(""); 
    $.ajax({
     url: url + services["clubByZonaRanking"],
     type: 'POST',
     data: "{codZona:'"+codZona+"'}",
     headers: {"key":key},
     contentType: "application/json",
     dataType: 'json',
     success: function (data) {
        response = $.parseJSON(data.d);
        var image = "assets/images/icons/notfound.png";
        var ok = true;
        //console.log(response);
        var htmlClubes = "";
        if(response.length<=3){
            var minHeight = 138;    
        }else {
            var minHeight = parseInt((response.length / 3)*165);    
        }
        
        $(".list_clubes").parent('.bg_perfil').css("min-height", minHeight);
        for(i=0; i<response.length; i++){
          imageUrl = urlImg+'club/'+response[i].codFotografiaLogotipo+'/logo.jpg';
          htmlClubes = '<div class="small-4 medium-4 large-4 columns item_club"> ' 
                                + ' <a href="#clubes_detalle-club" data-transition="slide" class="alts-clubHref" id="alts-cpdClub-'+response[i].codClub+'">'+
                                ' <h3>'+response[i].nombre.replace("Country","Ctry").replace("Corporacion", "Corp.").replace("Independiente ","Indte. ").replace("Independientes", "Indtes.")+'</h3>' +
                                ' <img src="'+imageUrl+'" alt="">' +
                                ' </a>' +
                                '</div>'+
                                '';  
          $(".list_clubes").append(htmlClubes); 
        }
        $(".alts-clubHref").on("click",function(){
            cargueInfo($(this));
            console.log($(this).attr("id"));
        })
        //console.log(htmlClubes);
     }
    });
}

/**
* Metodo para retornar loc clubes por su codigo
*/
function getClubByClub(codClub){
    $(".list_clubes").html("");
    var minHeight = 138;
    $(".list_clubes").parent('.bg_perfil').css("min-height", minHeight);
    $(".list_clubes").parent('.bg_perfil').css("height", minHeight);
    $.ajax({
     url: url + services["clubByCodClub"],
     type: 'POST',
     data: "{codClub: '"+codClub+"'}",
     headers: {"key":key},
     contentType: "application/json",
     dataType: 'json',
     success: function (data) {
        response = $.parseJSON(data.d);
        var image = "assets/images/icons/notfound.png";
        var ok = true;
        //console.log(response);
        var htmlClubes = "";

        for(i=0; i<response.length; i++){
          imageUrl = urlImg+'club/'+response[i].codFotografiaLogotipo+'/logo.jpg';
          htmlClubes = '<div class="small-4 medium-4 large-4 columns item_club"> ' 
                                + ' <a href="#clubes_detalle-club" data-transition="slide" class="alts-clubHref" id="alts-cpdClub-'+response[i].codClub+'">'+
                                ' <h3>'+response[i].nombre.replace("Country","Ctry").replace("Corporacion", "Corp.").replace("Independiente ","Indte. ").replace("Independientes", "Indtes.")+'</h3>' +
                                ' <img src="'+imageUrl+'" alt="">' +
                                ' </a>' +
                                '</div>'+
                                '';  
          $(".list_clubes").append(htmlClubes); 

        }
        $(".alts-clubHref").on("click",function(){
            cargueInfo($(this));
            console.log($(this).attr("id"));
        })
        //console.log(htmlClubes);
     }
    });
}
function eventsInputsClubes(){
    /**
    * Permite que al momento de cambiar la zona se busquen los clubes por zona
    */
    $("#club-cmbZonas").change(function(){
       console.log($(this).val());
       if($(this).val()==0){
            getClubes();
       }else {
            getClubByZona($(this).val()); 
       }
    });

    /**
    * Permite que al momento de cambiar el club se muestren el o los clubes dependiendo de la opcion seleccionada
    */
    $("#club-cmbClub").change(function(){
       console.log($(this).val());
       if($(this).val()==0){
            getClubes();
       }else {
            getClubByClub($(this).val()); 
       }
       
    });
}
/**
* Metodo que carga la información del club 
*/
function cargueInfo(linkFrom){
    console.log(linkFrom.children("h3").html());
    var arrayLink = linkFrom.attr("id").split("-");
    console.log(arrayLink);
    $(".alts-clubListCanchas").html("");
    $(".alts-clubListCanchas").append("<h1>Canchas</h1>");
    var codClub = arrayLink[2];
    $.ajax({
        url: url + services["clubByCodClub"],
        type: 'POST',
        data: "{codClub: '"+codClub+"'}",
        headers: {"key":key},
        contentType: "application/json",
        dataType: 'json',
            success: function (data) {
                response = $.parseJSON(data.d);
                console.log(response);
                $(".alts-titlePpal").html(response[0].nombre);
                $(".img_club img").attr("src",linkFrom.children("img").attr("src"));
                $(".alts-nameClub").html(linkFrom.children("h3").html());
                $.ajax({
                     url: url + services["deptoByCodDepto"],
                     type: 'POST',
                     data: "{'codDepartamento' : '"+response[0].codDepartamento+"'}",
                     headers: {"key":key},
                     contentType: "application/json",
                     dataType: 'json',
                     success: function (data) {
                        response = $.parseJSON(data.d);
                        $(".alts-ubicacionClub").html(response[0].nombreDepartamento);
                     }
                });
                $(".alts-direccionClub").html(response[0].direccion);
                $(".alts-telfClub").html(response[0].telefono1);
                $(".alts-emailClub").html(response[0].email);
                $(".alts-webClub").html(response[0].paginaWeb);

                $.ajax({
                     url: url + services["canchasWMarcasXClub"],
                     type: 'POST',
                     data: "{'codClub' : '"+codClub+"'}",
                     headers: {"key":key},
                     contentType: "application/json",
                     dataType: 'json',
                     success: function (data) {
                        response = $.parseJSON(data.d);                        
                        for(var i = 0 ; i<response.length; i++){
                            var section = '<section class="info_clubes wow fadeIn"> '+
                                              '<a href="#clubes_detalle-cancha" class="alts-linkCancha" id="'+response[i].codCancha+'-'+response[i].codClub+'-'+response[i].codMarca+'" data-transition="slide">'+
                                                '<article class="small-12 medium-12 large-12 columns">'+
                                                  '<div class="small-4 medium-4 large-4 columns">'+
                                                    '<p><strong>Nombre:</strong></p>'+
                                                  '</div>'+
                                                  '<div class="small-8 medium-8 large-8 columns">'+
                                                    '<p><span>'+response[i].nombreCancha+'</span></p>'+
                                                  '</div>'+
                                                    '</article>'+
                                                    '<article class="small-12 medium-12 large-12 columns">'+
                                                      '<div class="small-4 medium-4 large-4 columns">'+
                                                        '<p><strong>Marca:</strong></p>'+
                                                      '</div>'+
                                                      '<div class="small-8 medium-8 large-8 columns">'+
                                                        '<p><span>'+response[i].nombreMarca+'</span></p>'+
                                                      '</div>'+
                                                    '</article>'+
                                                    '<article class="small-12 medium-12 large-12 columns">'+
                                                      '<div class="small-4 medium-4 large-4 columns">'+
                                                        '<p><strong>Categoria:</strong></p>'+
                                                      '</div>'+
                                                      '<div class="small-8 medium-8 large-8 columns">'+
                                                        '<p>'+response[i].categoriaMarca+'</p>'+
                                                      '</div>'+
                                                    '</article>'+
                                                    '<article class="small-12 medium-12 large-12 columns">'+
                                                      '<div class="small-4 medium-4 large-4 columns">'+
                                                        '<p><strong>Tamaño:</strong></p>'+
                                                      '</div>'+
                                                      '<div class="small-8 medium-8 large-8 columns">'+
                                                        '<p>'+response[i].tamanoMarca+'</p>'+
                                                      '</div>'+
                                                    '</article>'+
                                                    '<article class="small-12 medium-12 large-12 columns">'+
                                                      '<div class="small-4 medium-4 large-4 columns">'+
                                                        '<p><strong>Patron campo:</strong></p>'+
                                                      '</div>'+
                                                      '<div class="small-8 medium-8 large-8 columns">'+
                                                        '<p>'+response[i].patronCampo+'</p>'+
                                                      '</div>'+
                                                    '</article>'+
                                                    '<article class="small-12 medium-12 large-12 columns">'+
                                                      '<div class="small-4 medium-4 large-4 columns">'+
                                                        '<p><strong>Patron curva:</strong></p>'+
                                                      '</div>'+
                                                      '<div class="small-8 medium-8 large-8 columns">'+
                                                        '<p>'+response[i].patronCurva+'<i></i></p>'+
                                                      '</div>'+
                                                    '</article>'+
                                              '</a>'+

                                               '<div class="clear"></div>'+
                                            '</section>';
                                $(".alts-clubListCanchas").append(section);
                        }
                        $(".alts-linkCancha").on("click",function(){
                            $(".alts-canchaNombreClub").html(linkFrom.children("h3").html());
                            $(".alts-canchaUbicacion").html($(".alts-ubicacionClub").html());
                            $(".alts-canchaDireccion").html($(".alts-direccionClub").html());
                            $(".alts-canchaTelefono").html($(".alts-telfClub").html());
                            $(".alts-canchaEmail").html($(".alts-emailClub").html());
                            $(".alts-canchaWeb").html($(".alts-webClub").html());
                            cargarDatosDetalleCancha($(this).attr("id"));
                        })
                     }
                });


             }
    });
    
}
/*
* Funcion que carga los detalles de la cancha con sus marcas
*/
function cargarDatosDetalleCancha(idHref){
    //response[i].codCancha+'-'+response[i].codClub+'-'+response[i].codMarca
    $(".alts-cmbHoyos").html("");
    $("#alts-DescHoyos").html("");
    $(".oyo").html("");
    $(".alts-tableMarcas").html("");
    $(".alts-imgRecorridoHoyos").html("");
    $(".imgRecHoyo").html("");
    var arrayIdRef = idHref.split("-");
    var codCancha = arrayIdRef[0];
    var codClub = arrayIdRef[1];

    console.log(idHref);
    $.ajax({
     url: url + services["infoCanchaXCanchaYClub"],
     type: 'POST',
     data: "{codClub: '"+codClub+"' , 'codCancha' : '"+codCancha+"'}",
     headers: {"key":key},
     contentType: "application/json",
     dataType: 'json',
     success: function (data) {
        response = $.parseJSON(data.d);
        console.log(response);
        if(response[0].es9hoyos==true || response[0].es9hoyos!=null || response[0].es9hoyos==1){
            for(var i = 1 ; i<10; i++){
               $(".alts-cmbHoyos").append('<option value="'+i+'">Hoyo '+i+'</option>'); 
            }
            $("#alts-DescHoyos").append('<div id="hoyo1">'+response[0].info1.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo2">'+response[0].info2.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo3">'+response[0].info3.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo4">'+response[0].info4.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo5">'+response[0].info5.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo6">'+response[0].info6.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo7">'+response[0].info7.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo8">'+response[0].info8.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo9">'+response[0].info9.replace("<br>","")+'</div>');
        }else {
            for(var i = 1 ; i<19; i++){
               $(".alts-cmbHoyos").append('<option value="'+i+'">Hoyo '+i+'</option>'); 
            }
            $("#alts-DescHoyos").append('<div id="hoyo1">'+response[0].info1.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo2">'+response[0].info2.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo3">'+response[0].info3.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo4">'+response[0].info4.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo5">'+response[0].info5.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo6">'+response[0].info6.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo7">'+response[0].info7.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo8">'+response[0].info8.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo9">'+response[0].info9.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo9">'+response[0].info10.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo9">'+response[0].info11.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo2">'+response[0].info12.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo3">'+response[0].info13.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo4">'+response[0].info14.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo5">'+response[0].info15.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo6">'+response[0].info16.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo7">'+response[0].info17.replace("<br>","")+'</div>');
            $("#alts-DescHoyos").append('<div style="display : none" id="hoyo8">'+response[0].info18.replace("<br>","")+'</div>');
        }
     }
    });

    $.ajax({
     url: url + services["infoMarcaXClubYCancha"],
     type: 'POST',
     data: "{codClub: '"+codClub+"' , 'codCancha' : '"+codCancha+"'}",
     headers: {"key":key},
     contentType: "application/json",
     dataType: 'json',
     success: function (data) {
        response = $.parseJSON(data.d);
        console.log(response);
        for(var j = 1; j<19;j++){
            if(j==1){
                 var tableMarcas = '<table id="hoyoMarca'+j+'">'+
                                        '<thead>'+
                                          '<tr>'+              
                                            '<th width="30">Par</th>'+
                                            '<th>Ventaja</th>'+
                                            '<th>Yardas</th>'+
                                            '<th>Patron Campo</th>'+
                                            '<th>Patron Curva</th>'+
                                            '<th width="60">Marcas</th>'+
                                          '</tr>'+
                                        '</thead>'+
                                        '<tbody>'+
                                        '</tbody>'+
                                      '</table> '; 
                        $(".oyo").append('<img id="alts-imgHoyo'+j+'" src="'+urlImg+'club/'+codClub+'/cancha'+codCancha+'/hoyo'+j+'/foto.jpg" alt="">'); 
                        $(".oyo").append('<img id="alts-imgCancha'+j+'" src="'+urlImg+'club/'+codClub+'/cancha'+codCancha+'/foto.jpg" alt="">'); 
                }else{
                    var tableMarcas = '<table id="hoyoMarca'+j+'" style="display : none">'+
                                        '<thead>'+
                                          '<tr>'+              
                                            '<th width="30">Par</th>'+
                                            '<th>Ventaja</th>'+
                                            '<th>Yardas</th>'+
                                            '<th>Patron Campo</th>'+
                                            '<th>Patron Curva</th>'+
                                            '<th width="60">Marcas</th>'+
                                          '</tr>'+
                                        '</thead>'+
                                        '<tbody>'+
                                        '</tbody>'+
                                      '</table> ';  
                         $(".oyo").append('<img id="alts-imgHoyo'+j+'" src="'+urlImg+'club/'+codClub+'/cancha'+codCancha+'/hoyo'+j+'/foto.jpg" alt="" style="display:none">'); 
                         $(".oyo").append('<img id="alts-imgCancha'+j+'" src="'+urlImg+'club/'+codClub+'/cancha'+codCancha+'/foto.jpg" alt="" style="display:none">'); 
                }
                $(".alts-tableMarcas").append(tableMarcas);
                
        }
        for(var j=0; j<response.length;j++){
                    var bandera;
                    switch(response[j].nombreMarca.trim().toUpperCase()){
                        case "AMARILAS":                            
                            bandera = "assets/images/icons/ban_ama.jpg"
                        break;
                        case "AZUL":
                            bandera = "assets/images/icons/ban_az.jpg"
                        break;
                        case "BLANCAS":
                            bandera = "assets/images/icons/ban_gr.jpg"
                        break;
                        case "NEGRAS":
                            bandera = "assets/images/icons/ban_ng.jpg"
                        break;
                        case "ROJAS":
                            bandera = "assets/images/icons/ban_red.jpg"
                        break;
                        case "AMARILLAS":                            
                            bandera = "assets/images/icons/ban_ama.jpg"
                        break;
                    }
                    
                    var trMarca1 = '<tr>'+
                            '<td>'+response[j].par1+'</td>'+
                            '<td>'+response[j].h1+'</td>'+
                            '<td>'+response[j].dist1+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca2 = '<tr>'+
                            '<td>'+response[j].par2+'</td>'+
                            '<td>'+response[j].h2+'</td>'+
                            '<td>'+response[j].dist2+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca3 = '<tr>'+
                            '<td>'+response[j].par3+'</td>'+
                            '<td>'+response[j].h3+'</td>'+
                            '<td>'+response[j].dist3+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca4 = '<tr>'+
                            '<td>'+response[j].par4+'</td>'+
                            '<td>'+response[j].h4+'</td>'+
                            '<td>'+response[j].dist4+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca5 = '<tr>'+
                            '<td>'+response[j].par5+'</td>'+
                            '<td>'+response[j].h5+'</td>'+
                            '<td>'+response[j].dist5+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca6 = '<tr>'+
                            '<td>'+response[j].par6+'</td>'+
                            '<td>'+response[j].h6+'</td>'+
                            '<td>'+response[j].dist6+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca7 = '<tr>'+
                            '<td>'+response[j].par7+'</td>'+
                            '<td>'+response[j].h7+'</td>'+
                            '<td>'+response[j].dist7+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca8 = '<tr>'+
                            '<td>'+response[j].par8+'</td>'+
                            '<td>'+response[j].h8+'</td>'+
                            '<td>'+response[j].dist8+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca9 = '<tr>'+
                            '<td>'+response[j].par9+'</td>'+
                            '<td>'+response[j].h9+'</td>'+
                            '<td>'+response[j].dist9+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca10 = '<tr>'+
                            '<td>'+response[j].par10+'</td>'+
                            '<td>'+response[j].h10+'</td>'+
                            '<td>'+response[j].dist10+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca11 = '<tr>'+
                            '<td>'+response[j].par11+'</td>'+
                            '<td>'+response[j].h11+'</td>'+
                            '<td>'+response[j].dist11+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca12 = '<tr>'+
                            '<td>'+response[j].par12+'</td>'+
                            '<td>'+response[j].h12+'</td>'+
                            '<td>'+response[j].dist12+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca13 = '<tr>'+
                            '<td>'+response[j].par13+'</td>'+
                            '<td>'+response[j].h13+'</td>'+
                            '<td>'+response[j].dist13+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca14 = '<tr>'+
                            '<td>'+response[j].par14+'</td>'+
                            '<td>'+response[j].h14+'</td>'+
                            '<td>'+response[j].dist14+'</td>'+                            
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca15 = '<tr>'+
                            '<td>'+response[j].par15+'</td>'+
                            '<td>'+response[j].h15+'</td>'+
                            '<td>'+response[j].dist15+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca16 = '<tr>'+
                            '<td>'+response[j].par16+'</td>'+
                            '<td>'+response[j].h16+'</td>'+
                            '<td>'+response[j].dist16+'</td>'+                            
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca17 = '<tr>'+
                            '<td>'+response[j].par17+'</td>'+
                            '<td>'+response[j].h17+'</td>'+
                            '<td>'+response[j].dist17+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    var trMarca18 = '<tr>'+
                            '<td>'+response[j].par18+'</td>'+
                            '<td>'+response[j].h18+'</td>'+
                            '<td>'+response[j].dist18+'</td>'+
                            '<td>'+response[j].patronCampo+'</td>'+
                            '<td>'+response[j].patronCurva+'</td>'+
                            '<td><i><img src="'+bandera+'" alt=""></i></td>'+
                        '</tr>';
                    $("#hoyoMarca1 tbody").append(trMarca1)
                    $("#hoyoMarca2 tbody").append(trMarca2)
                    $("#hoyoMarca3 tbody").append(trMarca3)
                    $("#hoyoMarca4 tbody").append(trMarca4)
                    $("#hoyoMarca5 tbody").append(trMarca5)
                    $("#hoyoMarca6 tbody").append(trMarca6)
                    $("#hoyoMarca7 tbody").append(trMarca7)
                    $("#hoyoMarca8 tbody").append(trMarca8)
                    $("#hoyoMarca9 tbody").append(trMarca9)
                    $("#hoyoMarca10 tbody").append(trMarca10)
                    $("#hoyoMarca11 tbody").append(trMarca11)
                    $("#hoyoMarca12 tbody").append(trMarca12)
                    $("#hoyoMarca13 tbody").append(trMarca13)
                    $("#hoyoMarca14 tbody").append(trMarca14)
                    $("#hoyoMarca15 tbody").append(trMarca15)
                    $("#hoyoMarca16 tbody").append(trMarca16)
                    $("#hoyoMarca17 tbody").append(trMarca17)
                    $("#hoyoMarca18 tbody").append(trMarca18)


        }
     }
    });
    
    var fileextension=".jpg";
    var fileextensionP=".png";
    for(var i = 1; i<19;i++){
        $(".alts-imgRecorridoHoyos").append('<ul><li class="imgRecHoyo'+i+'"></li></ul>');
        $(".alts-videoRecorridoHoyos").append('<ul><li class="videoRecHoyo'+i+'"></li></ul>');
    }
    for(var j=1; j<19;j++){
        var filename = this.href;
        if(j!=1){
            $(".imgRecHoyo"+j).append('<a href="" title="" id="imgRecHoyo-'+j+'" style="display:none">'+
                                '<h1>Hoyo 1</h1>'+
                                '<img src="assets/images/oyo1.jpg" alt="">'+
                                  '<div class="clear"></div>'+
                            '</a>');   
            $(".videoRecHoyo"+j).append('<a href="" title="" id="videoRecHoyo-'+j+'" style="display:none">'+
                                '<h1>Hoyo 1</h1>'+
                                '<img src="assets/images/oyo1.jpg" alt="">'+
                                  '<div class="clear"></div>'+
                            '</a>');   
        }else {
            $(".imgRecHoyo"+j).append('<a href="" title="" id="imgRecHoyo'+j+'">'+
                                '<h1>Hoyo 1</h1>'+
                                '<img src="assets/images/oyo1.jpg" alt="">'+
                                  '<div class="clear"></div>'+
                            '</a>');    
            $(".videoRecHoyo"+j).append('<a href="" title="" id="videoRecHoyo'+j+'">'+
                                '<h1>Hoyo 1</h1>'+
                                '<img src="assets/images/oyo1.jpg" alt="">'+
                                  '<div class="clear"></div>'+
                            '</a>');    
        }

        
        
        //Este ajax Es el que va a buscar las imagenes necesarias para mostrar el recorrido
        /*$.ajax({
            //This will retrieve the contents of the folder if the folder is configured as ‘browsable’
            url: urlImg + 'club/'+codClub+'/cancha'+codCancha+'/hoyo'+j+'/g/',
            success: function (data) {
                //Lsit all png file names in the page
                $(data).find("a:contains(" + fileextension + ")").each(function () {
                    var filename = this.href;
                        $(".imgRecHoyo"+j).append('<a href="" title="">'+
                                                '<h1>Hoyo 1</h1>'+
                                                '<img src="'+filename+'" alt="">'+
                                                  '<div class="clear"></div>'+
                                            '</a>');
                });
                $(data).find("a:contains(" + fileextensionP + ")").each(function () {
                    var filename = this.href;
                        $(".imgRecHoyo"+j).append('<a href="" title="">'+
                                                '<h1>Hoyo 1</h1>'+
                                                '<img src="'+filename+'" alt="">'+
                                                  '<div class="clear"></div>'+
                                            '</a>');
                });
            }
            });*/
    }
    

    $(".alts-cmbHoyos").change(function(){
        $('div[id^="hoyo"]').css("display", "none");
        $('table[id^="hoyoMarca"]').css("display", "none");
        $('img[id^="alts-imgHoyo"]').css("display", "none")
        $('img[id^="alts-imgCancha"]').css("display", "none")
        $('img[id^="imgRecHoyo-"]').css("display", "none");
        $('img[id^="videoRecHoyo-"]').css("display", "none");
        $('#hoyo'+$(this).val()).css("display", "inherit");
        $('#hoyoMarca'+$(this).val()).css("display", "table");
        $('#alts-imgHoyo'+$(this).val()).css("display", "table");
        $('#alts-imgCancha'+$(this).val()).css("display", "table");
        $('#imgRecHoyo-'+$(this).val()).css("display", "inherit");
        $('#videoRecHoyo-'+$(this).val()).css("display", "inherit");
    })

}