let data;
let guides;

function show_data(date){
  $('#data').html('')

  /*Build card for every tour */
  for( const key in data){
    build_card(data[key])
  }

}
/* For evrey tour build card with his details */
function build_card(tour){

  let index = '<div id='+tour._id+'_card'+' class=card><div/>'

  $('#data').append(index)
  $('#'+tour._id+'_card').append('<h3><u>Tour Name:</u> '+ tour.name+' </h3>')
  $('#'+tour._id+'_card').append($('<Button/>', {id: tour._id, text: "Edit "+tour.name,click: edit_tour,  class: "edit_tour"}));
  $('#'+tour._id+'_card').append($('<Button/>', {id: tour._id,click: delete_tour , text: "Delete "+tour.name , class: "delete_tour"}));
  $('#'+tour._id+'_card').append('<h3><u>Start Date:</u> '+ convert_date(tour.start_date)+' </h3>')
  $('#'+tour._id+'_card').append('<h3><u>Duration:</u> '+ tour.duration+' days </h3>')
  $('#'+tour._id+'_card').append('<h3><u>Cost:</u> ₪'+ tour.cost+' </h3>')


  if(tour.guide != undefined){
  $('#'+tour._id+'_card').append($('<Button/>', {id:tour._id,click: show_guide , text: "Show Guide " , class: "show_guide"+tour._id}));
  $('#'+tour._id+'_card').append(`<div id = ${tour._id}_guide isOpen = ${false}></div>`)
  }


  $('#'+tour._id+'_card').append($('<Button/>', {id: tour._id,click: show_tour_path , text: "Show Tour Path " , class: "show_tour_path"+tour._id}));
  $('#'+tour._id+'_card').append(`<div id = ${tour._id}_path isOpen = ${false}></div>`)
  
}


function show_guide(e){
  
  let id = e.target.id // tour id
  let btn = document.getElementById(id+"_guide");

  /*Show guide*/
  if ( btn.getAttribute('isopen') == 'false' ){

    let tindex = 0 
    for( const key in data){
      if(data[key]._id == id){
        tindex = key
        break
      }
    }

    let gindex = 0 
    for( const key in guides){
      if(guides[key]._id == data[tindex].guide){
        gindex = key
        break
      }
    }

    $('#'+id+'_guide').attr('isopen','true')
    $('.show_guide'+id).remove()
    $('#'+id+'_guide').append($('<Button/>', {id:id,click: show_guide , text: "Hide Guide " , class: "show_guide"+id}));
    $('#'+id+'_guide').append('<h3><u>guide:</u></h3>')
    $('#'+id+'_guide').append('<h5>Name: '+guides[gindex].name +' ,Email: '+guides[gindex].email +', Phone: '+guides[gindex].phone +'</h5>')
    $('#'+id+'_guide').append($('<Button/>', {id:id,click: change_guide , text: "Change Guide " , class: "change_guide"+id}));

  }

    /*Hide guide */
    else {
      $('.show_guide'+id).remove()
      $('#'+id+'_guide').html('')
      $('#'+id+'_guide').append($('<Button/>', {id:id,click: show_guide , text: "Show Guide " , class: "show_guide"+id}));
      $('#'+id+'_guide').attr('isopen','false')
    }

}


/*Option to change guide gor every tour */
function change_guide(e){
  let id = e.target.id
  $('.'+'change_guide'+id).remove()
  $('#'+id+'_guide').append('<label class="select" for="tours">Select Guide:</label>')
  $('#'+id+'_guide').append('<select name="options" id="guide_options'+id+'" ></select>')
  
  for(var index in guides){
    $('#guide_options'+id).append(' <option id='+guides[index]._id+' value='+guides[index]._id+'>'+guides[index].name+'</option> ')
  }

  $('#'+id+'_guide').append($('<Button/>', {id:id,click: submit_guide_change , text: "submit " , class: "change_guide"+id}));

}

/*Submit the change */
function submit_guide_change(e){
  t_id = e.target.id
  g_id = $('#guide_options'+t_id).val()

    $.ajax({
      type: 'PUT',
      url: "/tours/"+t_id,
      contentType: 'application/json',
      data: JSON.stringify({
        "guide":g_id
          }),
          success: result => {
            location.href = '/list';
            },
            error: function (err) {
              console.log("error", err);
              }
});      

}
/*If ther is a path for this tour  */
function show_tour_path(e){

  let id = e.target.id // tour id
  let btn = document.getElementById(id+"_path");

  /*Show path*/
  if ( btn.getAttribute('isopen') == 'false' ){

    let tindex = 0 
    for( const key in data){
      if(data[key]._id == id){
        tindex = key
        break
      }
    }

    $('#'+id+'_path').attr('isopen','true')
    $('.show_tour_path'+id).remove()
    $('#'+id+'_path').append($('<Button/>', {id: id,click: show_tour_path , text: "Hide Tour Path " , class: "show_tour_path"+id}));
    

    $('#'+id+'_path').append($('<Button/>', {id: id,click: add_site , text: "Add Site " , class: "add_site"+id}));
    
  if(data[tindex].path.length != 0){
    $('#'+id+'_path').append('<h3><u>Path:</u></h3>')

    for( let i = 0 ; i < data[tindex].path.length ; i++){
    pid = data[tindex].path[i]._id
    $('#'+id+'_path').append($('<div/>', {id:pid}));
    $('#'+pid).append('<h5>Path Name: '+data[tindex].path[i].name+' , Path Country: ' +data[tindex].path[i].country+' </h5>')
    $('#'+pid).append($('<Button/>', {id:pid,click: delete_site, text: "Delete This Path ",class:data[tindex]._id}));

  }
  }
}
    /*Hide path */
    else {
      $('.show_tour_pat'+id).remove()
      $('#'+id+'_path').html('')
      $('#'+id+'_path').append($('<Button/>', {id: id,click: show_tour_path , text: "Show Tour Path " , class: "show_tour_path"+id}));
      $('#'+id+'_path').attr('isopen','false')
    }

}

function add_site(e){
  var id = e.target.id
  
$(`.${'add_site'+id}`).hide();

$(`#${id}_path`).append($(`<form id=${id}new_site > </form>`))
$(`#${id}new_site`).append('<label  for="fname">New Site Name:</label>');
$(`#${id}new_site`).append(`<input type="text" id=${id}new_name required><br>`);

$(`#${id}new_site`).append('<label for="fname">New Site Country:</label>');
$(`#${id}new_site`).append(`<input type="text" id=${id}new_country required><br>`);

$(`#${id}_path`).append($('<Button/>', {id: id+"new_site_submit", text: "Submit" ,click: new_site_submit}));

}


function new_site_submit(e){

  var id = e.target.id.slice(0,-15);


  let name = $(`#${id}new_name`).val()
  let country = $(`#${id}new_country`).val()

    
  if ( name == undefined || name == ""){
    alert('Invalid Site Name')
      return
    }
  else if ( country == undefined || country == ""){
    alert('Invalid Site Country')
    return
  }

    for ( var key in data)
    {

      if(data[key]._id == id){

        if(data[key].path.length != 0 ){
          for ( var i in key.path){
            if (path[i].name == name ){
              alert("Site Already Exist!")
              return
            }
          }

          data[key].path.push({"name" : name, "country" : country})
          $.ajax({
            type: "PUT",
            url: "/tours/:"+id+"/path",
            contentType: 'application/json',
            data: JSON.stringify({
              "tour_name": data[key].name,
              "start_date": data[key].start_date,
              "duration": data[key].duration,
              "cost": data[key].cost,
              "guide" : data[key].guide,
              "path" : data[key].path
            }),
            processData: false,            
            encode: true,
            success: result => {
              location.href = "/list";
            },
            error: function (err) {
              console.log("err", err);
            }
          });
  
          break; 


        }

        else {

          $.ajax({
            type: "PUT",
            url: "/tours/"+id+"/path",
            contentType: 'application/json',
            data: JSON.stringify({
              "name": data[key].name,
              "start_date": data[key].start_date,
              "duration": data[key].duration,
              "cost": data[key].cost,
              "guide" : data[key].guide,
              "path" : [{"name" : name, "country" : country}]
            }),
            processData: false,            
            encode: true,
            success: result => {
              location.href = "/list";
            },
            error: function (err) {
              console.log("err", err);
            }
          }); 
    
    
          }
        }

      }
      
  }
/*Delete site in tour*/
  function delete_site(element){

    let pid = element.target.id
    let id = element.target.className

    $.ajax({
    type: "DELETE",
    url: "tours/"+id+"/"+pid,
    contentType: 'application/json',
    data: JSON.stringify({
      "pid": pid,
      "id": id
    }),
    success: result => {
      location.href = '/list'
    },
    error: function (err) {
      console.log("err", err);
    }
    });
  }

function edit_tour(element)
{
  var old_id = element.target.id
    /* get details */
    for( var key in data){
      if(data[key]._id == old_id){
          build_edit_page(data[key])
        }
    }

}

/*Make date pretty*/
function convert_date(date){

  var old_date = new Date(date)

  var month = old_date.getUTCMonth() + 1; //months from 1-12
  var day = old_date.getUTCDate();
  var year = old_date.getUTCFullYear();

  if(day < 10) day = '0'+day
  if(month < 10) month = '0'+month
  date_in_formt = year + "-" + month + "-" + day;

  return date_in_formt
}


/* Edit tour page */
function build_edit_page(tour){

  old_date = convert_date(tour.start_date)

  var old_duration = tour.duration;
  var old_cost = tour.cost;


    $('#main').html('');
    $('#main').append("<form id='content'> </form>");
    $('#content').append("<Button onclick:location,href = '\list'> Back </Button>");

    $('#content').append("<br>");

    $('#content').append("<label for='tour_name'>Tour name:</label>")

    /* ID */
    $('#content').append(`<input type="text" value = ${tour.name} name="name" id="name" required>`);
    
    $('#content').append("<br>");

    /* Date */
    $('#content').append("<label for='tour_date'>Start Date:</label>");
    if( old_date != undefined){
         $('#content').append(`<input type="date" value = ${old_date} name="date" id="date" required>`);
    }
    
    else
       $('#content').append(`<input type="date" value = '' name="date" id="date" required>`);

    $('#content').append("<br>")

     /*Duration */
    $('#content').append("<label for='duration'>Duration:</label>");  
    if( old_duration != undefined){
        $('#content').append(`<input type="number" value = ${tour.duration} name="duration" id="duration" min="1" required>`);
    }

    else
       $('#content').append(`<input type="number" value = "" name="duration" id="duration" min="1" required>`);

    $('#content').append("<br>")
    /* Cost */
    $('#content').append("<label for='cost'>Cost:</label>");  
    if( old_cost != undefined){
        $('#content').append(`<input type="number" value = ${tour.cost} name="cost" id="cost" min="1" required>`);
    }

    else
       $('#content').append(`<input type="number" value = "" name="cost" id="cost" min="1" required>`);

    $('#content').append("<br>");

   /* Submit  Button */
    $('#content').append(`<Input type="submit" id = ${tour._id} ) onclick = submit_edit(id) value="Submit"></Button> `);
    
    
}

/* Submit Edit Tour Page*/
function submit_edit(id)
{
  var new_id = $('#name').val()
  var new_date = $('#date').val()
  var new_duration = parseInt($('#duration').val())
  var new_cost = parseInt($('#cost').val())
  
  if (new_id!= undefined && new_date != undefined && new_duration !=undefined && new_duration>0 && new_cost != undefined && new_cost > 0  ){
    $.ajax({
      type: 'PUT',
      url: "/tours/"+id,
      contentType: 'application/json',
      data: JSON.stringify({
        "name" : new_id,
        "start_date": new_date,
        "duration": new_duration,
        "cost": new_cost,
          }),
          success: result => {
            location.href = '/list';
            },
            error: function (err) {
              console.log("error", err);
              }
});      
}

   else{alert("invalid Inpute in form");
}

}


function delete_tour(element){
  var id = element.target.id
  
  if(id){
  $.ajax({
    type: 'DELETE',
    url: "/tours/"+id,
    success: result => {
      alert("Tour Deleted")
      location.href = '/list';

      },
      error: function (err) {
        console.log("err", err);
      }
        });
  }
  
}



$(document).ready(function () {

let order_by = "Tour name"
let reverse = false


$.ajax({
url: "/tours",
data: JSON.stringify({
  "choice": order_by,
  "sortOrder": reverse
}),
success: result => {
  data = result
  show_data(result);
},
error: function (err) {
  console.log("err", err);
}
});

$.ajax({
  url: "/guides",
  data: JSON.stringify(),
  success: result => {
    guides = result},
  error: function (err) {
    console.log("err", err);
  }
  });

}

);

function sortBy(type){
  data.sort((a, b)=>{
    if(a[type]> b[type])
      return 1;
    else if(a[type]< b[type])
      return -1;
    else 
      return 0;
    });  
  
}

/*Sort tours by select option, use generic functin that called sortBy */
function sort(e){
  let sortType = $('#'+e).val();
  console.log('type:'+sortType)
  if(sortType === "Tour Name"){ sortBy('name') }
  else if(sortType === "Cost"){ sortBy('cost') }
  else if(sortType === "Start Date"){ sortBy('start_date') }
  else if(sortType === "Duration"){ sortBy('duration') }

  if ($('#reverse').is(':checked')){reverse_data() }
  else { show_data() }
  

}

/*OnChange function - reverse the tours order */
function reverse_data(){
  data.reverse()
  show_data()
}