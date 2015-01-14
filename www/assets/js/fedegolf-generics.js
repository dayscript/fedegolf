/**
* @author Manuel Ramirez
* @version 0.1
* @since 07/01/2015
* @see Archivo complementario con las funciones integradas a los servicios expuestos para mejor orden del desarrollo
*/

$(function(){
    $(".alts-btnLogin").on("click",function(){
      logIn();
    })
});
/**
* Metodo para cargar las zonas de la aplicación
*/
function getZonas(){
    $.ajax({
     url: url + services["zonaRanking"],
     type: 'POST',
     data: "{}",
     headers: {"key":"f3D3g01f"},
     contentType: "application/json",
     dataType: 'json',
     success: function (data) {
        response = $.parseJSON(data.d);
        console.log(response);
        for (var i = 0; i < response.length ; i++) {
            $(".alts-cmbZonas").append('<option value="'+response[i].codZonaRanking+'">'+response[i].nombre+'</option>')
        };
     }
    });
}

function logIn(){
    //contabilidadgolf@federacioncolombianadegolf.com
    $.ajax({
         url: url + services["login"],
         type: 'POST',
         data: "{email:'"+$('.alts-inputMail').val()+"', pass:'"+$('.alts-inputPass').val()+"'}",
         headers: {"key":key},
         contentType: "application/json",
         dataType: 'json',
         success: function (data) {
          console.info(data)
          response = $.parseJSON(data.d);
          console.log(response);
          if(response.length>0){
              localStorage.setItem("session", "true");
              localStorage.setItem("apellido", response[0].apellido);
              localStorage.setItem("cod_club", response[0].cod_club);
              localStorage.setItem("cod_perfil_web", response[0].cod_perfil_web);
              localStorage.setItem("nombre", response[0].nombre);
              localStorage.setItem("cod_profesional",response[0].cod_profesional);
              $(".list_torneos").html("");
              $(".list_torneos").html("");
              $.ajax({
                   url: url + services["getTorneosAficionados"],
                   type: 'POST',
                   data: "{}",
                   headers: {"key":key},
                   contentType: "application/json",
                   dataType: 'json',
                   success: function (data) {
                    response = $.parseJSON(data.d);
                    console.log(response);
                    for(i=0;i<response.length;i++){
                        $(".list_torneos").append('<article>'+
                              '<a href="#torneo" data-transition="slide" class="altsToneo-link" id="altTor-'+response[i].cod_torneo_web+'">'+
                               '<div class="small-12 medium-12 large-12 columns">'+
                                 '<h2><span>'+response[i].nombre_torneo+'</span></h2>'+
                                 '<h2>Desde: '+response[i].fechaInicio+' Hasta: '+response[i].fechaFin+'</h2>'+
                                 '<h2>Club: '+response[i].nombre+'</h2>'+
                               '</div>'+
                                 '<div class="clear"></div>'+
                              '</a>'+
                            '</article>');
                    }

                    $(".altsToneo-link").on("click",function(){
                       cargarDetailTorneo($(this).attr('id'));
                    })

                   }
              });
          }else {
              localStorage.setItem("error_login","1");
              parent.history.back();
          }
          
          //var d = eval(response[0].fecha_nacimiento.replace('"',''));//Para fechas porque el servicio devuelve "new Date(5854400000)"
          //console.info(d);
         }
    });
}

function cargarDetailTorneo(id){
  var arrayId = id.split("-");
  $(".altsTorneoDetail-detail").html("");
  $.ajax({
           url: url + services["getDetailTorneoAficionados"],
           type: 'POST',
           data: "{codTorneo : '"+arrayId[1]+"'}",
           headers: {"key":key},
           contentType: "application/json",
           dataType: 'json',
           success: function (data) {
            response = $.parseJSON(data.d);
            console.log(response);

            $(".altsTorneoDetail-nombreTorneo").html(response[0].nombre_torneo);
            $(".altsTorneoDetail-club").html("Club: " + response[0].nombre);
            $(".altsTorneoDetail-fechaIni").html("Fecha: del " + response[0].fechaInicio + " al " + response[0].fechaFin);
            $(".altsTorneoDetail-fechaInscripcion").html("Fecha límite Inscripción: " + response[0].fechaLimite);
            $(".altsTorneoDetail-fechaCancelacion").html("Fecha límite cancelación: " + response[0].fechaCancelacion);
            $(".altsTorneoDetail-fechaPago").html("Fecha límite Pago: " + response[0].fechaPago);

            $(".altsTorneoDetail-director").html("Director: " + response[0].nombre_director);
            $(".altsTorneoDetail-coodirector").html("Coodirector: " + response[0].nombre_coodirector);
            $(".altsTorneoDetail-juez1").html("Juez uno: " + response[0].juez_uno);
            $(".altsTorneoDetail-juez2").html("Juez dos: " + response[0].juez_dos);
            $(".altsTorneoDetail-juez3").html("Juez tres: " + response[0].juez_tres);

            $(".altsTorneoDetail-resolucion").html("RESOLUCIÓN " + response[0].nombre_resolucion);

            $(".altsTorneo-btnInscribir").attr("data-codtorneo", response[0].cod_torneo_web);

            for(i=0; i<response.length;i++){
                  var arrayTarifa = response[i].tarifa.toString().split(".");
                  var tarifa;
                  if(arrayTarifa.length>=2){
                    tarifa = arrayTarifa[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    tarifa = tarifa+','+arrayTarifa[1];
                  }else {
                    tarifa = response[i].tarifa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    tarifa = tarifa+',00'
                  }
                  var modalidad;
                  if(response[i].es_masculino==true)
                    modalidad = "Mascilino";
                  else 
                    modalidad = "Femenino";

                  var nacionalidad
                  if(response[i].es_nacional==true)
                    nacionalidad = "Nacional";
                  else 
                    nacionalidad = "Internacional";

                  var perfil
                  if(response[i].es_profesional==true)
                    perfil = "Profesional";
                  else 
                    perfil = "Aficionado";

                  $(".altsTorneoDetail-detail").append('<section class="info_clubes fadeIn">'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Categoria</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>'+response[i].nombreCategoria+'</p>'+
                                '</div>'+
                              '</article>'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Tarifa</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>$'+tarifa+'</p>'+
                                '</div>'+
                              '</article>'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Modalidad</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>'+modalidad+'</p>'+
                                '</div>'+
                              '</article>'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Nacionalidad</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>'+nacionalidad+'</p>'+
                                '</div>'+
                              '</article>'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Perfil</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>'+perfil+'</p>'+
                                '</div>'+
                              '</article>'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Edad</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>Desde '+response[i].edad_minima+' años</p>'+
                                '</div>'+
                              '</article>'+
                              '<article class="small-12 medium-12 large-12 columns">'+
                                '<div class="small-4 medium-4 large-4 columns">'+
                                  '<p><strong>Indice</strong></p>'+
                                '</div>'+
                                '<div class="small-8 medium-8 large-8 columns">'+
                                  '<p>Desde '+response[i].indice_maximo+'</p>'+
                                '</div>'+
                              '</article>'+
                                '<div class="clear"></div>'+
                          '</section>');
            }

           }
      });
}
