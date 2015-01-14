/**
* @author Manuel Ramirez
* @version 0.1
* @since 07/01/2015
* @see Archivo complementario con las funciones integradas a los servicios expuestos para mejor orden del desarrollo
*/
/**
* @author Manuel Ramirez
* @version 0.1
* @since 07/01/2015
* @see Archivo complementario con las funciones integradas a los servicios expuestos para mejor orden del desarrollo
*/


function eventsAficionados(){
	$("#btn-buscarAficionado").on("click", function(){
	        getInfoJugadores();
	    })

	$(".altsTorneo-btnInscribir").on("click",function(){
		var codPerfilWeb = localStorage.getItem("cod_perfil_web");
		$.ajax({
			url: url + services["preInscribirJugador"],
			type: 'POST',
			data: "{codTorneoWeb:'"+$(this).attr("data-codtorneo")+"', codPerfilWeb:'"+codPerfilWeb+"', codSubCategoriaTorneoWeb:'', tarifa:''}",
			headers: {"key":"f3D3g01f"},
			contentType: "application/json",
			dataType: 'json',
			success: function (data) {
				console.info(data)
				response = $.parseJSON(data.d);
				console.log(response);
				if(response==true){
					localStorage.setItem("error_inscripcion","0");
					parent.history.back();
				}else {
					localStorage.setItem("error_inscripcion","1");
					parent.history.back();
				}
				//var d = eval(response[0].fecha_nacimiento.replace('"',''));//Para fechas porque el servicio devuelve "new Date(5854400000)"
				//console.info(d);
			}
		});
	});
	/*$("#alts-frmAficionados").load("frmAficionados.html", function(){
		
	});*/
	getCategoriasAficionados();
	
}

function getCategoriasAficionados(){
		$("#alts-categoriasRanking").html("");
		$("#alts-tableRankingAficionado tbody").html("");
		$("#alts-RankAf2").html("");
         	$.ajax({
	           url: url + services["getCategoriasAficionados"],
	           type: 'POST',
	           data: "{}",
	           headers:  {"key":key},
	           contentType: "application/json",
	           dataType: 'json',
	           success: function (data) {
	              response = $.parseJSON(data.d);
	              console.log(response);
	              for(i=0 ; i< response.length; i++){
	              		$("#alts-categoriasRanking").append('<article>'+
		                   '<a href="#rankingAficionados" data-transition="slide" class="categoriaLinkAficionados" id="Rankcat-'+response[i].codCategoria+'"><div class="small-10 medium-10 large-10 columns">'+
		                     '<p>'+response[i].nombreCategoria+'</p>'+
		                   '</div>'+
		                   '<div class="small-2 medium-2 large-2 columns">'+
		                      '<i></i>'+
		                   '</div></a>'+
		                     '<div class="clear"></div>'+
		                '</article>')
		                $("#alts-RankAf2").append('<article>'+
		                   '<a href="#rankingAficionados2" data-transition="slide" class="categoriaLinkAficionados2" id="Rankcat2-'+response[i].codCategoria+'"><div class="small-10 medium-10 large-10 columns">'+
		                     '<p>'+response[i].nombreCategoria+'</p>'+
		                   '</div>'+
		                   '<div class="small-2 medium-2 large-2 columns">'+
		                      '<i></i>'+
		                   '</div></a>'+
		                     '<div class="clear"></div>'+
		                '</article>')
	              }
	              $(".categoriaLinkAficionados2").on("click",function(){
	              		var arrayRankCat = $(this).attr("id").split("-");
	              		$.ajax({
					           url: url + services["getRankingByCategory"],
					           type: 'POST',
					           data: "{codCategoria : '"+arrayRankCat[1]+"'}",
					           headers:  {"key":key},
					           contentType: "application/json",
					           dataType: 'json',
					           success: function (data) {
					              response = $.parseJSON(data.d);
					              console.log(response);
					              for(i=0; i< response.length; i++){
					              	$("#alts-tableRankingAficionado2 tbody").append('<tr>'+
							                      '<td><a href="#aficionadoRank2" data-transition="slide" class="altsRk2-linkAficionado" id="rank2-'+response[i].codJugador+'">'+response[i].codJugador+'</a></td>'+
							                      '<td><a href="#aficionadoRank2" data-transition="slide" class="altsRk2-linkAficionado" id="rank2-'+response[i].codJugador+'">'+response[i].nombres+'</a></td>'+
							                      '<td><a href="#aficionadoRank2" data-transition="slide" class="altsRk2-linkAficionado" id="rank2-'+response[i].codJugador+'">'+response[i].apellidos+'</a></td>'+
							                      '<td><a href="#aficionadoRank2" data-transition="slide" class="altsRk2-linkAficionado" id="rank2-'+response[i].codJugador+'">'+response[i].nombreClub+'</a></td>'+
							                    '</tr>');
					              }
					              $(".altsRk2-linkAficionado").on("click",function(){
					              		var arrayIdRank = $(this).attr("id").split("-")
					              		 var codJugador = arrayIdRank[1];
							             $.ajax({
								           url: url + services["getJugadores"],
								           type: 'POST',
								           data: "{nombres: '', apellidos:'', codClub:'', codJugador:'"+codJugador+"', limit:1, offset:0}",
								           headers:  {"key":key},
								           contentType: "application/json",
								           dataType: 'json',
								           success: function (data) {
								              response = $.parseJSON(data.d);
								              console.log(response);
								              imageUrl = urlImg+'club/'+response[0].codClub+'/logo.jpg';
								              $("#altsRk-nombreGolfista2").html(response[0].nombres + " " + response[0].apellidos);
								              $("#altsRk-ciudadGolfista2").html(response[0].nombreCiudad);
								              $("#altsRk-codigoGolfista2").html(response[0].codJugador);
								              $("#altsRk-indiceAnteriorGolfista2").html(response[0].indiceAnterior);
								              $("#altsRk-indiceGolfista2").html(response[0].indice);
								              $("#altsRk-categoriaGolfista2").html(response[0].nombreCategoria);
								              $("#altsRk-imgClubGolfista2").attr("src",imageUrl);
								              /*for(i=0; i< response.length; i++){
								              	$("#alts-tableAficionado tbody").append('<tr>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].codJugador+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombres+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].apellidos+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombreClub+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].edad+'</a></td>'+
										                    '</tr>');
								              }*/
								           }
								          }); 	
										$.ajax({
								           url: url + services["getScoreXJugador"],
								           type: 'POST',
								           data: "{codJugador:'"+codJugador+"'}",
								           headers:  {"key":key},
								           contentType: "application/json",
								           dataType: 'json',
								           success: function (data) {
								              response = $.parseJSON(data.d);
								              $("#altsRk-fechaHandicap2").html(response[0].fechaJuego);
								              $("#altsRk-clubHandicap2").html(response[0].nombreClub);
								              $("#altsRk-canchaHandicap2").html(response[0].nombreCancha);
								              $("#altsRk-marcaHandicap2").html(response[0].nombreMarca);
								              $("#altsRk-scoreAjustado2").html(response[0].scoreAjustado);
								              $("#altsRk-patronCampoHandicap2").html(response[0].patronCampo);
								              $("#altsRk-patronCurvaHandicap2").html(response[0].patronCurva);
								              $("#altsRk-patronCurvaHandicap2").html(response[0].patronCurva);
								              $("#altsRk-indiceHandicap2").html(response[0].indice);
								              $("#altsRk-diferencialHandicap2").html(response[0].diferencial);
								              /*for(i=0; i< response.length; i++){
								              	$("#alts-tableAficionado tbody").append('<tr>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].codJugador+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombres+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].apellidos+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombreClub+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].edad+'</a></td>'+
										                    '</tr>');
								              }*/
								           }
								          }); 
						          	})
					           }
				          	}); 		
	              })
	              $(".categoriaLinkAficionados").on("click",function(){
	              		var arrayRankCat = $(this).attr("id").split("-");
	              		$.ajax({
					           url: url + services["getRankingByCategory"],
					           type: 'POST',
					           data: "{codCategoria : '"+arrayRankCat[1]+"'}",
					           headers:  {"key":key},
					           contentType: "application/json",
					           dataType: 'json',
					           success: function (data) {
					              response = $.parseJSON(data.d);
					              console.log(response);
					              for(i=0; i< response.length; i++){
					              	$("#alts-tableRankingAficionado tbody").append('<tr>'+
							                      '<td><a href="#aficionadoRank" data-transition="slide" class="altsRk-linkAficionado" id="rank-'+response[i].codJugador+'">'+response[i].codJugador+'</a></td>'+
							                      '<td><a href="#aficionadoRank" data-transition="slide" class="altsRk-linkAficionado" id="rank-'+response[i].codJugador+'">'+response[i].nombres+'</a></td>'+
							                      '<td><a href="#aficionadoRank" data-transition="slide" class="altsRk-linkAficionado" id="rank-'+response[i].codJugador+'">'+response[i].apellidos+'</a></td>'+
							                      '<td><a href="#aficionadoRank" data-transition="slide" class="altsRk-linkAficionado" id="rank-'+response[i].codJugador+'">'+response[i].nombreClub+'</a></td>'+
							                    '</tr>');
					              }
					              $(".altsRk-linkAficionado").on("click",function(){
					              		var arrayIdRank = $(this).attr("id").split("-")
					              		 var codJugador = arrayIdRank[1];
							             $.ajax({
								           url: url + services["getJugadores"],
								           type: 'POST',
								           data: "{nombres: '', apellidos:'', codClub:'', codJugador:'"+codJugador+"', limit:1, offset:0}",
								           headers:  {"key":key},
								           contentType: "application/json",
								           dataType: 'json',
								           success: function (data) {
								              response = $.parseJSON(data.d);
								              console.log(response);
								              imageUrl = urlImg+'club/'+response[0].codClub+'/logo.jpg';
								              $("#altsRk-nombreGolfista").html(response[0].nombres + " " + response[0].apellidos);
								              $("#altsRk-ciudadGolfista").html(response[0].nombreCiudad);
								              $("#altsRk-codigoGolfista").html(response[0].codJugador);
								              $("#altsRk-indiceAnteriorGolfista").html(response[0].indiceAnterior);
								              $("#altsRk-indiceGolfista").html(response[0].indice);
								              $("#altsRk-categoriaGolfista").html(response[0].nombreCategoria);
								              $("#altsRk-imgClubGolfista").attr("src",imageUrl);
								              /*for(i=0; i< response.length; i++){
								              	$("#alts-tableAficionado tbody").append('<tr>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].codJugador+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombres+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].apellidos+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombreClub+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].edad+'</a></td>'+
										                    '</tr>');
								              }*/
								           }
								          }); 	
										$.ajax({
								           url: url + services["getScoreXJugador"],
								           type: 'POST',
								           data: "{codJugador:'"+codJugador+"'}",
								           headers:  {"key":key},
								           contentType: "application/json",
								           dataType: 'json',
								           success: function (data) {
								              response = $.parseJSON(data.d);
								              $("#altsRk-fechaHandicap").html(response[0].fechaJuego);
								              $("#altsRk-clubHandicap").html(response[0].nombreClub);
								              $("#altsRk-canchaHandicap").html(response[0].nombreCancha);
								              $("#altsRk-marcaHandicap").html(response[0].nombreMarca);
								              $("#altsRk-scoreAjustado").html(response[0].scoreAjustado);
								              $("#altsRk-patronCampoHandicap").html(response[0].patronCampo);
								              $("#altsRk-patronCurvaHandicap").html(response[0].patronCurva);
								              $("#altsRk-patronCurvaHandicap").html(response[0].patronCurva);
								              $("#altsRk-indiceHandicap").html(response[0].indice);
								              $("#altsRk-diferencialHandicap").html(response[0].diferencial);
								              /*for(i=0; i< response.length; i++){
								              	$("#alts-tableAficionado tbody").append('<tr>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].codJugador+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombres+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].apellidos+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombreClub+'</a></td>'+
										                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].edad+'</a></td>'+
										                    '</tr>');
								              }*/
								           }
								          }); 
						          	})
					           }
				          	}); 		
	              })
					
	              
	           }
          	}); 	
}


function getInfoJugadores(){
		console.log("entre");
		$("#alts-tableAficionado tbody").html("");
		if($(".alts-inputNombre").val().length==0 && $(".alts-inputApellido").val().length==0 && $(".alts-inputCodigo").val().length==0 && ($("#alts-clubAficionados").val()==-1 || $("#alts-clubAficionados").val()==0)) {
			window.history.back();
		}else {
			if($("#alts-clubAficionados").val()==-1 || $("#alts-clubAficionados").val()==0){
				codClub="";
			}else {
				codClub=$("#alts-clubAficionados").val();
			}
			$.ajax({
	           url: url + services["getJugadores"],
	           type: 'POST',
	           data: "{nombres: '"+$(".alts-inputNombre").val()+"', apellidos:'"+$(".alts-inputApellido").val()+"', codClub:'"+codClub+"', codJugador:'"+$(".alts-inputCodigo").val()+"', limit:2147483647, offset:0}",
	           headers:  {"key":key},
	           contentType: "application/json",
	           dataType: 'json',
	           success: function (data) {
	              response = $.parseJSON(data.d);
	              for(i=0; i< response.length; i++){
	              	$("#alts-tableAficionado tbody").append('<tr>'+
			                      '<td><a href="#aficionado" data-transition="slide" class="alts-linkAficionado" id="'+response[i].codJugador+'">'+response[i].codJugador+'</a></td>'+
			                      '<td><a href="#aficionado" data-transition="slide" class="alts-linkAficionado" id="'+response[i].codJugador+'">'+response[i].nombres+'</a></td>'+
			                      '<td><a href="#aficionado" data-transition="slide" class="alts-linkAficionado" id="'+response[i].codJugador+'">'+response[i].apellidos+'</a></td>'+
			                      '<td><a href="#aficionado" data-transition="slide" class="alts-linkAficionado" id="'+response[i].codJugador+'">'+response[i].nombreClub+'</a></td>'+
			                      '<td><a href="#aficionado" data-transition="slide" class="alts-linkAficionado" id="'+response[i].codJugador+'">'+response[i].edad+'</a></td>'+
			                    '</tr>');
	              }
	              $(".alts-linkAficionado").on("click",function(){
			             $.ajax({
				           url: url + services["getJugadores"],
				           type: 'POST',
				           data: "{nombres: '', apellidos:'', codClub:'', codJugador:'"+$(this).attr("id")+"', limit:1, offset:0}",
				           headers:  {"key":key},
				           contentType: "application/json",
				           dataType: 'json',
				           success: function (data) {
				              response = $.parseJSON(data.d);
				              console.log(response);
				              imageUrl = urlImg+'club/'+response[0].codClub+'/logo.jpg';
				              $("#alts-nombreGolfista").html(response[0].nombres + " " + response[0].apellidos);
				              $("#alts-ciudadGolfista").html(response[0].nombreCiudad);
				              $("#alts-codigoGolfista").html(response[0].codJugador);
				              $("#alts-indiceAnteriorGolfista").html(response[0].indiceAnterior);
				              $("#alts-indiceGolfista").html(response[0].indice);
				              $("#alts-categoriaGolfista").html(response[0].nombreCategoria);
				              $("#alts-imgClubGolfista").attr("src",imageUrl);
				              /*for(i=0; i< response.length; i++){
				              	$("#alts-tableAficionado tbody").append('<tr>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].codJugador+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombres+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].apellidos+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombreClub+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].edad+'</a></td>'+
						                    '</tr>');
				              }*/
				           }
				          }); 	
						$.ajax({
				           url: url + services["getScoreXJugador"],
				           type: 'POST',
				           data: "{codJugador:'"+$(this).attr("id")+"'}",
				           headers:  {"key":key},
				           contentType: "application/json",
				           dataType: 'json',
				           success: function (data) {
				              response = $.parseJSON(data.d);
				              $("#alts-fechaHandicap").html(response[0].fechaJuego);
				              $("#alts-clubHandicap").html(response[0].nombreClub);
				              $("#alts-canchaHandicap").html(response[0].nombreCancha);
				              $("#alts-marcaHandicap").html(response[0].nombreMarca);
				              $("#alts-scoreAjustado").html(response[0].scoreAjustado);
				              $("#alts-patronCampoHandicap").html(response[0].patronCampo);
				              $("#alts-patronCurvaHandicap").html(response[0].patronCurva);
				              $("#alts-patronCurvaHandicap").html(response[0].patronCurva);
				              $("#alts-indiceHandicap").html(response[0].indice);
				              $("#alts-diferencialHandicap").html(response[0].diferencial);
				              /*for(i=0; i< response.length; i++){
				              	$("#alts-tableAficionado tbody").append('<tr>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].codJugador+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombres+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].apellidos+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].nombreClub+'</a></td>'+
						                      '<td><a href="#aficionado" data-transition="slide" class="alt-linkAficionado" id="'response[i].codJugador'">'+response[i].edad+'</a></td>'+
						                    '</tr>');
				              }*/
				           }
				          }); 
		          	})
					
					
	           }
	          });
			
		}

		
}
