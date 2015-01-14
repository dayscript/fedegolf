function eventosProfesionales(){
	$("#altsProfesion-btnBuscar").on("click",function(){
			getInfoJugadoresProfesionales();
	});
}

function getInfoJugadoresProfesionales(){
		$("#alts-tableProfesionales tbody").html("");
		if($("#altsProfesion-inputNombre").val().length==0 && $("#altsProfesion-inputApellidos").val().length==0 && $("#altsProfesion-codigo").val().length==0 && ($("#altsProfesion-inputClub").val()==-1 || $("#altsProfesion-inputClub").val()==0)){
			window.history.back();
		}else {
			if($("#altsProfesion-inputClub").val()==-1 || $("#altsProfesion-inputClub").val()==0){
				codClub="";
			}else {
				codClub=$("#altsProfesion-inputClub").val();
			}
			$.ajax({
	           url: url + services["getProfesionales"],
	           type: 'POST',
	           data: "{nombres: '"+$("#altsProfesion-inputNombre").val()+"', apellidos:'"+$("#altsProfesion-inputApellidos").val()+"', codClub:'"+codClub+"', codJugador:'"+$("#altsProfesion-codigo").val()+"', limit:2147483647, offset:0}",
	           headers:  {"key":key},
	           contentType: "application/json",
	           dataType: 'json',
	           success: function (data) {
	              response = $.parseJSON(data.d);
	              console.log(response);
	              
	              for(i=0; i< response.length; i++){
	              	$("#alts-tableProfesionales tbody").append('<tr>'+
			                      '<td><a href="#profesionales" data-transition="slide" class="alts-linkProfesionales" id="altsProfesionalId-'+response[i].codProfesional+'">'+response[i].codProfesional+'</a></td>'+
			                      '<td><a href="#profesionales" data-transition="slide" class="alts-linkProfesionales" id="altsProfesionalId-'+response[i].codProfesional+'">'+response[i].nombres+'</a></td>'+
			                      '<td><a href="#profesionales" data-transition="slide" class="alts-linkProfesionales" id="altsProfesionalId-'+response[i].codProfesional+'">'+response[i].apellidos+'</a></td>'+
			                      '<td><a href="#profesionales" data-transition="slide" class="alts-linkProfesionales" id="altsProfesionalId-'+response[i].codProfesional+'">'+response[i].nombreClub+'</a></td>'+
			                      '<td><a href="#profesionales" data-transition="slide" class="alts-linkProfesionales" id="altsProfesionalId-'+response[i].codProfesional+'">'+response[i].edad+'</a></td>'+
			                    '</tr>');
	              }
	              $(".alts-linkProfesionales").on("click",function(){
	              		var profesionalesArray = $(this).attr("id").split('-');
	              		console.log(profesionalesArray);
			             $.ajax({
				           url: url + services["getProfesionales"],
				           type: 'POST',
				           data: "{nombres: '', apellidos:'', codClub:'', codJugador:'"+profesionalesArray[1]+"', limit:1, offset:0}",
				           headers:  {"key":key},
				           contentType: "application/json",
				           dataType: 'json',
				           success: function (data) {
				              response = $.parseJSON(data.d);
				              console.log(response);
				              imageUrl = urlImg+'club/'+response[0].codClub+'/logo.jpg';
				              $("#altsProfesional-nombreGolfista").html(response[0].nombres + " " + response[0].apellidos);
				              $("#altsProfesional-ciudadGolfista").html(response[0].nombreCiudad);
				              $("#altsProfesional-codigoGolfista").html(response[0].codProfesional);
				              $("#altsProfesional-indiceAnteriorGolfista").html("No Aplica");
				              $("#altsProfesional-indiceGolfista").html("No Aplica");
				              $("#altsProfesional-categoriaGolfista").html("Profesional");
				              $("#altsProfesional-imgClubGolfista").attr("src",imageUrl);
				              
				           }
				          }); 	
						
		          	})
					
					
	           }
	          });
			
		}

		
}
