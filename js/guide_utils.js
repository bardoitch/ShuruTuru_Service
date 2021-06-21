
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
      "guidePhone":{

        required: true,
      },
      "guideEmail": {
        required: true,
      },
      "guideName":{
        required: true
      },
    },
  });


  $("form[name='edit_form']").validate({
    // Specify validation rules
    
    rules: {
        "guidePhone":{
            required: true,
          },
          "guideEmail": {
            required: true,
          },
          "guideName":{
            required: true
          },
    },
  });

  // process the form
  $('#user_form').submit(function (event) {

    if($("#user_form").valid()){

    let exist = false
    for(var index in guides){
        if(guides[index].name == $("#guideName").val() && guides[index].phone == $("#guidePhone").val() && guides[index].email == $("#guideEmail").val() ){
            alert('Guide is already exist')
            exist = true
            break
        
        }
    }

    let valid_phone = true
    if(!$("#guidePhone").val().match('[0-9]{10}')){
      alert('invalid Phone')
      valid_phone = false

    }

    if( exist == false && valid_phone == true){ 
      // process the form
      $.ajax({
          type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url: '/guides', // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              "name": $("#guideName").val(),
              "email": $("#guideEmail").val(),
              "phone": $('#guidePhone').val(),
          }),
          processData: false,            
          encode: true,
          success: function( data, textStatus, jQxhr ){
            alert(" Guide added successfully")
            location.href = "/list";
          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
              if( errorThrown == 'Bad Request')
                alert('Bad Request')
          }            
      })

    
      //Clear input
      $("#guideName").val("")
      $("#guideEmail").val("")
      $("#guidePhone").val("")   
        
    }

  }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });


})

    
});