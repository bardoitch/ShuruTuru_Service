
let guides

$(document).ready(function () {

  $.ajax({
    url: "/guides",
    data: JSON.stringify(),
    success: result => {
      guides = result},
    error: function (err) {
      console.log("err", err);
    }
    }).then(()=>{

    console.log(guides)

   
  $("form[name='user_form']").validate({
    // Specify validation rules
    rules: {
      "ID":{
        required: true,
      },
      "StartingDate": {
        required: true,
      },
      "Duration":{
        required: true
      },
      "Cost":{
        required: true,
        number: true
      },
    },
  });

  $("form[name='edit_form']").validate({
    // Specify validation rules
    
    rules: {
      "ID":{
        required: true,
      },
      "StartingDate": {
        required: true,
      },
      "Duration":{
        required: true
      },
      "Cost":{
        required: true,
        number: true
      },
    },
  });

  $('#guide-group').append('<label class="select" for="tours">Select Guide:</label>')
  $('#guide-group').append('<select name="options" id="guide_options"></select>')

  for(var index in guides){
    $('#guide_options').append('<option id='+guides[index]._id+' value='+guides[index]._id+'>'+guides[index].name+'</option> ')
  }


  // process the form
  $('#user_form').submit(function (event) {

    if(!$("#user_form").valid()) return;
      // process the form
      $.ajax({
          type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url: '/tours', // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              "name": $("#ID").val(),
              "start_date": $("#StartingDate").val(),
              "duration": parseInt($('#Duration').val()),
              "cost": parseInt($('#Cost').val()),
              "guide": $('#guide_options').val()
          }),
          processData: false,            
          encode: true,
          success: function( data, textStatus, jQxhr ){
            alert("Tour added successfully")
            location.href = "/list";
          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
              if( errorThrown == 'Bad Request')
                alert('Tour is already exist')
          }            
      })
      //Clear input
      $("#ID").val("")
      $("#StartingDate").val("")
      $("#Duration").val("")
      $("#Cost").val("")
      $("#guideName").val("")
      $("#guideEmail").val("")
      $("#guidePhone").val("")   
        
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
  });

})
});