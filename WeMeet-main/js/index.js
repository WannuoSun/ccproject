const today = new Date();

var apigClient = apigClientFactory.newClient({
    region: 'us-east-1', // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
    apiKey: 'WFY7aanS24uJZxz05XHo4o1wN7zSszFaOGeg7Ok5'
});



function userLogin(){
    var user_login_id = document.getElementById('user_login_id');
    console.log(user_login_id)
    var user_login_password=document.getElementById('user_login_password');
    console.log(user_login_password)
    if (!user_login_id.value) {
        alert('Please Enter ID!');
    } 
    else if (!user_login_password.value){
        alert('Please Enter Password');
    }
    else {
        user_login_id_value = user_login_id.value;
        user_login_id.value = "";
        user_login_password_value = user_login_password.value;
        user_login_password.value = "";
        doUserLogin(user_login_id_value,user_login_password_value);
    }
};

function doUserLogin(user_id,user_password){
    var params = {'uID' : user_id,
                  'uPSWD' : user_password};
    console.log(params)
    var body = {};
    var additionalParams = {};

    
    apigClient.loginstatusGet(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}

//要改 晚点改
function editProfile(){
    var edit_input_id = document.getElementById('edit_user_id');
    console.log(edit_input_id)
    var edit_input_name=document.getElementById('edit_user_name');
    console.log(edit_input_name)
    if (!edit_input_id.value) {
        alert('Please Enter ID!');
    } else {
        edit_input_id_value = edit_input_id.value;
        edit_input_id.value = "";
        edit_input_name_value = edit_input_name.value;
        edit_input_name.value = "";
        // alert(search_input_value);
        doEditProfile(edit_input_id_value,edit_input_name_value);
    }
};

function doEditProfile(edit_id,edit_name){
    var params = {'uID' : edit_id,
                  'uFN' :  edit_name};
    console.log(params)
    var body = {};
    var additionalParams = {};

    
    apigClient.editprofileGet(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
            

        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}

function isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
  }


function createMeeting(){
    var create_duration=document.getElementById('create_meeting_duration')
    console.log(create_duration)
    var create_host = document.getElementById('create_meeting_host');
    console.log(create_host)
    var create_location=document.getElementById('create_meeting_location')
    console.log(create_location)
    var create_description = document.getElementById('create_meeting_description');
    console.log(create_description)
    var create_participants=document.getElementById('create_meeting_participants');
    console.log(create_participants)

    if (!create_duration.value) {
        alert('Please Enter Duration!');
    } 
    else if (!isInt(create_duration.value)){
        console.log(create_duration.value);
        alert('Duration must be an integer number!');
    }
    else if (!create_host.value){
        alert('Please Enter Host ID');
    }
    else if (!create_location.value){
        alert('Please Enter Host Location');
    }
    else if (!create_description.value){
        alert('Please Enter Description');
    }
    else if (!create_participants.value){
        alert('Please Enter Meeting Participants');
    }
    
    else {
        create_duration_value = create_duration.value;
        create_duration.value = "";
        create_host_value = create_host.value;
        create_host_value.value = "";
        create_location_value = create_location.value;
        create_location.value = "";
        create_description_value = create_description.value;
        create_description_value.value = "";
        create_participants_value = create_participants.value;
        create_participants.value = "";

        doCreateMeeting(create_duration_value,create_host_value,create_location_value,create_description_value,create_participants_value);
    }
};

function doCreateMeeting(c_duration,c_host,c_location,c_description,c_participants){
    var params={};
    var bodystr = {
            "users":c_participants,
            "duration":parseInt(c_duration),
            "host":c_host,
            "location":c_location,
            "description":c_description
    };
    body=JSON.stringify(bodystr)
    console.log(body)
    var additionalParams = {};

    
    apigClient.createmeetingPost(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}

function onload_test(){
    console.log("test onloading");
}

function findUserMeetings(){
    var user_current_id =  ""; //static variable maybe.
    doFindUserMeetings(user_current_id);
    
};

function doFindUserMeetings(cur_id){
    var params = {'uID' : "Moni"};
    console.log(params)
    var body = {};
    var additionalParams = {};

    var res_html = "";

    
    apigClient.findusermeetingsGet(params, body, additionalParams)
        .then(function(result) {
            // success callback
            // console.log("Result : ", result);
            var data = result["data"];
            var idx = 1;

            while(data["Meeting"+idx]!=undefined){
                console.log(data["Meeting"+idx]);

                var info = data["Meeting"+idx];
                var meet_date =  new Date();
                meet_date.setDate(today.getDate() + info["current_set_time"][0]);
                meet_date = meet_date.toISOString().split("T")[0] + " " + info["current_set_time"][1] + ":00";

                console.log(meet_date);

                res_html += 
                '<div class="nearby-user">'
                    +'<div class="row">'
                      +'<div class="col-md-2 col-sm-2">'
                          +'<h4>Meeting '+idx+'</h4>'
                      +'</div>'
                      +'<div class="col-md-7 col-sm-7">'
                        +'<h5 class="h5-black">Host: <p class="text-muted p-inline text-blue">'+info["host"]+'</p></h5>'
                        +'<h5 class="h5-black">Participants: <p class="text-muted p-inline text-blue">'+info["participants"]+'</p></h5>' 
                        +'<h5 class="h5-black">Current Set Time: <p class="text-muted p-inline text-important">'+meet_date+'</p></h5>'
                        +'<h5 class="h5-black">Vote Status: <p class="text-muted p-inline text-important">'+info["vote_status"]+'</p></h5>'
                        +'<h5 class="h5-black">Location: <p class="text-muted p-inline text-blue">'+info["location"]+'</p></h5>'
                        +'<h5 class="h5-black">Description: <p class="text-muted p-inline text-blue">'+info["description"]+'</p></h5>'
                        
                      +'</div>'
                      +'<div class="col-md-3 col-sm-3">'
                        +'<a href="meeting-timeslot.html?meeting-idx='+idx+'&host='+info["host"]+'" class="btn btn-box">Choose your available timeslots</a>'
                      +'</div>'
                    +'</div>'
                  +'</div>';

                idx++;
            }
            var div = document.getElementById("meeting-info");
            div.innerHTML = res_html;
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });

}

//sample

function doRecommendTimeSlot(){

    // var pa = window.location.split('?')[1];
    // console.log(pa);

    var urlquery = window.location.search;
    var query = urlquery.split("&")
    var mID = query[0].split("=")[1]
    var host = query[1].split("=")[1]
    console.log(mID, host)

    document.getElementById("meeting-title").innerHTML="For meeting "+mID
    document.getElementById("meeting-title-host").innerHTML="Host: "+host

    var params = {'mID' : mID};
    console.log(params)
    var body = {};
    var additionalParams = {};

    var res_html = '<form class="form">';

    apigClient.getrecommendGet(params, body, additionalParams)
    .then(function(result) {
        // success callback
        // console.log("Result : ", result);
        data = result["data"];
        console.log(data)
        
        timeslots = data.slice(1, -1).split(", ");
        for(var i=0; i<timeslots.length; i++){
            day = timeslots[i].split(":")[0].slice(1, -1);
            day = parseInt(day);
            time = timeslots[i].split(":")[1].slice(2, -1).split(",");
            
            if(time != ''){
                for(var t=0; t<time.length; t++){
                    var meet_date =  new Date();
                    meet_date.setDate(today.getDate() + day);
                    meet_date = meet_date.toISOString().split("T")[0] + " " + time[t] + ":00 (next "+day+" day)";
                    
                    var label = day + ":" + time[t]
                    res_html += 
                        '<div class="inputGroup">'
                        +'<input class="checkbox-time" id="option'+label+'" value="'+label+'" type="checkbox"/>'
                        +'<label for="option'+label+'">'+meet_date+'</label>'
                        +'</div>'
                    // console.log(meet_date);
                }
            }

        }
        res_html += '</form>'

        var div = document.getElementById("timeslot-content");
        div.innerHTML = res_html;

   
    }).catch(function(result) {
        // error callback
        console.log(result);
    });
}

function voteMeeting(){
    console.log("vote meeting!");
    var urlquery = window.location.search;
    var query = urlquery.split("&");
    var uID = "Moni"
    var mID = query[0].split("=")[1];
    var day = "";
    var time = "";

    var checkedTime = document.querySelectorAll('.checkbox-time:checked');
    for (var i = 0; i < checkedTime.length; i++) {
        day += checkedTime[i].value.split(":")[0]+",";
        time += checkedTime[i].value.split(":")[1]+",";
    }
    day = day.slice(0, -1);
    time = time.slice(0, -1);

    console.log(uID)
    console.log(mID)
    console.log(day)
    console.log(time)
    // doVoteMeeting(uID, mID, day, time);
}

function doVoteMeeting(a,b,c,d){
    var params={};
    var bodystr = {
            "user":a,
            "meetID":b,
            "day":c,
            "time":d
           
    };
    body=JSON.stringify(bodystr)
    console.log(body)
    var additionalParams = {};

    apigClient.votemeetingPost(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}
