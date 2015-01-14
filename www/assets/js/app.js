// Organización: ALT+S 
// Web: www.alts.com.co
// Autor: William Villalba
// Email: williamvillalba13@gmail.com}
// Ajustes: Manuel Ramirez
// Email: manuelramirezr@gmail.com

var url="http://54.149.89.5:49187/WebService.asmx/"
var urlImg = "http://www.fedegolf.net/img/";
//Listado de variables para servicios
var services = [];
services["clubes"]                  = "getClub";
services["zonaRanking"]             = "getZonaRanking";
services["clubByCodClub"]           = "getClubByCodClub";
services["clubByZonaRanking"]       = "getClubXCodZona";
services["deptoByCodDepto"]         = "getDepartamentosByCodDepto";
services["canchasByCodClub"]        = "getCanchaByCodClub";
services["marcasByCodCancha"]       = "getMarcasByCodCancha";
services["canchasWMarcasXClub"]     = "getCanchaByCodClubWithMarcas";
services["infoCanchaXCanchaYClub"]  = "getInfoCanchaClub"
services["infoMarcaXClubYCancha"]   = "getInfoMarcaClubCancha";
services["login"]                       = "postLogin";
services["getJugadores"]                = "getIndiceXJugador";
services["getProfesionales"]            = "getIndiceXProfesional";
services["getScoreXJugador"]            = "getScoreByJugador";
services["getCategoriasAficionados"]    = "getCategoria";
services["getRankingByCategory"]        = "getRankingByCategory";
services["getTorneosAficionados"]       = "getTorneoWebByFechaInscripcion";
services["getDetailTorneoAficionados"]  = "getDetailTorneoWebByCodTorneo";
services["preInscribirJugador"]         = "preInscribirJugador";
var key = "f3D3g01f";

$(document).bind("mobileinit", function() {
  // Código de inicio para jQM
  
  $.mobile.ajaxEnabled = false;
  $.mobile.defaultPageTransition = "slideup";
  $.mobile.defaultDialogTransition = "flip";
  $.mobile.loadingMessage = "Por favor espere...";
  $.mobile.pageLoadErrorMessage = "No se ha podido cargar la página";
  
  // Eventos de gestos
  
  $("zona").bind("tap", function() {
    
  });
  
  $("zona").bind("taphold", function() {
    
  });
  
  $("zona").bind("swipeleft", function() {
    
  });
  
  $("zona").bind("swiperight", function() {
    
  });
  
  // Eventos de mouse virtuales
  
  $("zona").bind("vclick", function() {
    
  });
  
  // Eventos de orientación
  
  $(document).bind("orientationchange", function() {
    
  });
  
  // Eventos de scroll
  
  $(document).bind("scrollstart", function() {
    
  });
  
  $(document).bind("scrollstop", function() {
    
  });
  
  // Eventos de página
  
  $("pagina1").bind("pageinit", function() {
    
  });
  
  // Eventos de página externa
  $(document).bind("pageloadfailed", function() {
    alert("Falló la carga de la página");
  });
  
  $("pagina1").bind("pagechange", function() {
      
  });
  
  $("pagina1").bind("pageshow", function() {
    
  });
  
  $("pagina1").bind("pagehide", function() {
    
  });
  
  
  // Eventos layout
  
  $(document).bind("updatelayout", function() {
    
  });
  
  $(document).bind("animacionComplete", function() {
    
  });
  
  
  
});




$(window).load(function(){  
  $('#preload').delay(1800).fadeOut(500);
});

$(document).ready(function() {
  var owl = $(".bg_deg .carrusel_int1"),
      i = 0,
      textholder,
      booleanValue = false;
 
  //CARRUSEL INTERNAS
  owl.owlCarousel({
    autoplay:false,
    autoHeight : true,
    loop:false,     
    nav:!0,
    //onDragged: callback,
    //onTranslate: callback,
    responsive:{
        0:{
            items:1
        },
        380:{
            items:1
        },
        1000:{
            items:1
        }
    }
  })
  owl.on('translated.owl.carousel', function(event) {
      if(localStorage.getItem("error_login")=="1"){
        owl.trigger('prev.owl.carousel', [100]);
      }
      var x   = $(event.target);
      var lis = x.find('.owl-stage').children();
      console.log(x, $($(lis[1]).find("li")[0]).attr("id"));
  })

  arranque();
});


$(function(){
  //LOGIN
  $(function(){
     $('.marco_login .btn_azul').on('click',function(){
       if($(this).next().is(':visible')){
         $(this).next().slideUp(100);         
         $(this).parent().parent().removeClass('bg_active');         
       }
       if($(this).next().is(':hidden')){
         $('.marco_login .form_login').slideUp('100');
         $('.marco_login').removeClass('bg_active');
         $(this).next().slideDown(100);
         $(this).parent().parent().addClass('bg_active');         
      }
     });
  });
  
  //PERFIL HABDICAP
  $(function(){
     $('.list_hand li .datos_hand').on('click',function(){
       if($(this).next().is(':visible')){
         $(this).next().slideUp(100);         
         $(this).parent().parent().removeClass('bg_active');         
       }
       if($(this).next().is(':hidden')){
         $('.list_hand li .info_had').slideUp('100');
         $('.list_hand li').removeClass('bg_active');
         $(this).next().slideDown(100);
         $(this).parent().parent().addClass('bg_active');         
      }
     });
  });

  //ANIMACIONES
  wow = new WOW(
      {
        animateClass: 'animated',
        offset: 1
      }
  );  
  wow.init();



});
function arranque(){
  /**
  * Funciones de arranque para el modulo de clubes
  */
  
  $("#clubes_detalle-cancha").load("detalleCancha.html");

  $("#clubes_detalle-club").load("detalleClub.html");

  $(".list_torneos").load("errorListTorneos.html");

  $(".alts-ComoCalcular").load("comoCalcular.html");

  $(".alts-queesHandicap").load("queEsHandicap.html");

  $(".perfilRanking").load("perfilRanking.html");
  $(".perfilRanking2").load("perfilRanking2.html");

  eventsAficionados();
  eventsInputsClubes();
  eventosProfesionales();
  getClubes();
  getZonas();
  



}

 $(document).on("pageshow", "#menu", function( event ) {
    if(localStorage.getItem("error_login")=="1"){
      localStorage.setItem("error_login","0");
      $.mobile.loading('show',
                       { text: ("El usuario o la contraseña son incorrectos" || 'ERROR'),
                         textonly: false, textVisible: true });
      setTimeout(function() {
          $.mobile.loading('hide');
          
      }, 3000);
    }
      
 })

 $(document).on("pageshow","#filtro_aficionado",function(event){
    console.log("llegue a funcion");
    if(localStorage.getItem("error_inscripcion")=="0"){
      localStorage.setItem("error_inscripcion","2");
      $(".ui-loader-verbose").css("color","#FFF");
      $.mobile.loading('show',
                       { text: ("Se ha preinscrito en el torneo" || 'ERROR'),
                         textonly: false, textVisible: true });
      setTimeout(function() {
          $.mobile.loading('hide');
          $(".ui-loader-verbose").css("color","red");
          
      }, 3000);

    }else {
      if(localStorage.getItem("error_inscripcion")=="1"){
        localStorage.setItem("error_inscripcion","2");
        $.mobile.loading('show',
                       { text: ("No se ha podido preinscribir en el torneo por favor intente de nuevo" || 'ERROR'),
                         textonly: false, textVisible: true });
        setTimeout(function() {
            $.mobile.loading('hide');
            
        }, 3000);
      }
    }
 })
