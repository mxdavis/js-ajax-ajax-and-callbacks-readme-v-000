// $.get( "html/sentence.html", function("HEY") {
//   debugger;
//   $( ".result" ).html( data );
//   alert( "Load was performed." );
// });
$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "html/sentence.html",
    cache: false,
    success: function(data){
      alert("success!")
      // debugger;
       // $(".result").text();

    }
  });
});
